#!/usr/bin/env node
// Batch generator: top 30 articles with missing images via gemini-web-pp-cli
// Usage: node scripts/gen-blog-images-batch.mjs <batch-start> <batch-end>
// Each call generates 1 image, throttle 12s between calls, rotate accounts

import { execSync, spawnSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync } from 'fs';
import { join, basename } from 'path';

const ROOT = 'D:/Projects/Sesoris/sesoris';
const BLOG_DIR = join(ROOT, 'content/blog');
const IMG_DIR = join(ROOT, 'public/images/blog');
const TMP_DIR = join(ROOT, 'public/images/blog-gen-tmp');
const THROTTLE_MS = 12000; // 12 seconds between gens

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });

// Slug -> product-photography prompt seed
const PROMPT_SEEDS = {
  'label-organizer': 'organized pantry with neat label tags on clear glass jars and storage containers, white removable labels with handwritten product names',
  'under-bed-storage': 'flat under-bed storage drawer with wheels containing folded clothes and linens, slid partly out from underneath a wooden bed frame',
  'vacuum-storage-bag': 'transparent vacuum compression bag holding compressed blankets and clothes, vacuum sealed flat, with hand pump on side',
  'rak-sepeda-rumah': 'minimalist wall-mounted bicycle rack holding a modern road bike vertically, garage interior with concrete floor and tools',
  'rak-tanaman-minimalis': 'minimalist wooden plant stand with multiple tiers holding small potted indoor plants, monstera and snake plant, bright living room',
  'tempat-penyimpanan-mainan': 'colorful kids playroom with labeled fabric storage bins on white shelves containing organized toys, building blocks and stuffed animals',
  'organizer-perlengkapan-bayi': 'soft pastel nursery organizer with diaper caddy, cotton bibs, baby clothes folded, wooden changing table',
  'rak-mainan-anak': 'child-friendly wooden toy storage shelf with multiple cubbies holding organized toys, books and plush toys, bright playroom',
  'organizer-pisau-dapur': 'wooden in-drawer knife organizer with chef knife and paring knives slotted vertically, kitchen drawer with bamboo cutting board',
  'rak-microwave': 'space-saving metal microwave rack stand holding microwave on top shelf, lower shelf with kitchen items, modern minimalist kitchen',
  'organizer-kulkas': 'organized refrigerator interior with clear plastic bins holding fruits, vegetables, jars labeled, modern stainless fridge',
  'rak-panci-dapur': 'hanging pot rack from ceiling with copper pots and stainless cookware suspended, professional kitchen aesthetic',
  'rak-monitor-meja-kerja': 'wooden monitor stand riser on white desk with laptop underneath, ergonomic workspace with plant and notebook',
  'tempat-tidur-dengan-storage': 'modern platform bed with built-in drawers underneath in light wood, bedroom with white linens and minimalist decor',
  'lemari-pakaian-minimalis': 'open minimalist wardrobe interior with folded clothes on shelves and hanging shirts, light wood frame with bright bedroom background',
  'rak-buku-minimalis': 'minimalist white floating bookshelf on wall holding organized books and small decor items, modern living room',
  'rak-mesin-cuci': 'stainless steel washing machine rack with detergent bottles on top shelf and laundry basket below, organized laundry room',
  'keranjang-laundry': 'woven seagrass laundry basket with handle holding folded clean towels, modern bathroom interior background',
  'organizer-kamar-mandi': 'bathroom counter organizer with bamboo tray holding toothbrush holder, soap dispenser and skincare products, white marble counter',
  'rak-kamar-mandi': 'corner shower caddy chrome shelving holding shampoo, body wash and bar soap, tiled bathroom wall',
  'storage-box-baju': 'stackable fabric storage boxes with lids containing folded clothing, label window on front, organized closet shelf',
  'diy-storage-box': 'handmade cardboard storage box covered with decorative fabric, holding organized small items, craft room aesthetic',
  'rak-dapur-besi': 'industrial black iron metal kitchen shelf rack with cookware, jars and spices, modern farmhouse kitchen',
  'storage-box-lipat': 'collapsible fabric storage box folded flat next to assembled open box with handles, neutral beige fabric',
  'tempat-penyimpanan-obat': 'home medicine cabinet organizer with clear divided trays holding pill bottles and first aid items, neatly labeled',
  'rak-dinding-dapur': 'open wooden wall-mounted kitchen shelf holding mason jars with dry goods, mugs and cookbooks, white subway tile background',
  'storage-box-mini': 'small clear acrylic storage boxes with lids holding organized stationery items on a desk, top-down view',
  'rak-penyimpanan-gudang': 'heavy-duty industrial warehouse storage shelving with plastic bins and labeled boxes, garage workshop interior',
  'keranjang-penyimpanan': 'set of aesthetic woven rattan storage baskets with linen liners on white shelves, scandinavian living room',
  'tempat-penyimpanan-sepatu': 'minimalist wooden shoe storage rack with multiple tiers holding sneakers and sandals, entryway with rug',
};

const VARIANT_ANGLES = {
  '2': 'eye-level product shot, lifestyle context, soft natural daylight from left window',
  '3': 'top-down 45-degree angle, organized aesthetic, warm afternoon light',
};

function buildPrompt(slug, suffix) {
  const seed = PROMPT_SEEDS[slug];
  const angle = VARIANT_ANGLES[suffix] || VARIANT_ANGLES['2'];
  return `Generate image: Professional product photography of ${seed}. ${angle}, 4:3 aspect ratio, sharp focus, realistic photo, no text overlay, no watermark, magazine-quality, clean composition.`;
}

function generateOne(slug, suffix, account) {
  const targetName = `${slug}-${suffix}.webp`;
  const targetPath = join(IMG_DIR, targetName);

  if (existsSync(targetPath)) {
    console.log(`[SKIP] ${targetName} already exists`);
    return { skipped: true, slug, suffix };
  }

  // Clear temp dir
  const tmpFiles = readdirSync(TMP_DIR);
  for (const f of tmpFiles) {
    try { execSync(`rm -f "${join(TMP_DIR, f)}"`); } catch {}
  }

  const prompt = buildPrompt(slug, suffix);
  console.log(`[GEN] ${targetName} (account #${account})`);
  console.log(`  prompt: ${prompt.slice(0, 100)}...`);

  const start = Date.now();
  const result = spawnSync('gemini-web-pp-cli', [
    'image', 'generate', prompt,
    '--out', TMP_DIR,
    '--account', String(account),
  ], { encoding: 'utf-8', shell: true, timeout: 120000 });

  const elapsed = Math.round((Date.now() - start) / 1000);

  if (result.status !== 0) {
    console.log(`  [FAIL] exit=${result.status} stderr=${(result.stderr || '').slice(0, 200)}`);
    return { failed: true, slug, suffix, error: result.stderr };
  }

  // Find newly created file
  const generated = readdirSync(TMP_DIR).filter(f => /\.(png|webp|jpg|jpeg)$/i.test(f));
  if (generated.length === 0) {
    console.log(`  [FAIL] no file produced in ${elapsed}s`);
    return { failed: true, slug, suffix, error: 'no file produced' };
  }

  const generated_path = join(TMP_DIR, generated[0]);
  // Convert to .webp via cwebp if not already webp, otherwise just rename
  if (generated[0].endsWith('.webp')) {
    renameSync(generated_path, targetPath);
  } else {
    // Use cwebp if available, fall back to rename
    try {
      execSync(`cwebp -q 82 "${generated_path}" -o "${targetPath}"`, { stdio: 'pipe' });
      execSync(`rm -f "${generated_path}"`);
    } catch {
      // Fall back: rename PNG to .webp extension (Next.js still serves, browsers accept)
      renameSync(generated_path, targetPath);
    }
  }

  const size = execSync(`stat -c %s "${targetPath}" 2>/dev/null || wc -c < "${targetPath}"`, { encoding: 'utf-8' }).trim();
  console.log(`  [OK] ${targetName} ${(parseInt(size)/1024).toFixed(1)}KB in ${elapsed}s`);
  return { ok: true, slug, suffix, size: parseInt(size), elapsed };
}

// Top 30 articles with their missing image suffixes
const QUEUE = [
  ['label-organizer', ['2', '3']],
  ['under-bed-storage', ['2', '3']],
  ['vacuum-storage-bag', ['2', '3']],
  ['rak-sepeda-rumah', ['2', '3']],
  ['rak-tanaman-minimalis', ['2', '3']],
  ['tempat-penyimpanan-mainan', ['2', '3']],
  ['organizer-perlengkapan-bayi', ['2', '3']],
  ['rak-mainan-anak', ['2', '3']],
  ['organizer-pisau-dapur', ['2', '3']],
  ['rak-microwave', ['2', '3']],
  ['organizer-kulkas', ['2', '3']],
  ['rak-panci-dapur', ['2', '3']],
  ['rak-monitor-meja-kerja', ['2', '3']],
  ['tempat-tidur-dengan-storage', ['2', '3']],
  ['lemari-pakaian-minimalis', ['2', '3']],
  ['rak-buku-minimalis', ['2', '3']],
  ['rak-mesin-cuci', ['2', '3']],
  ['keranjang-laundry', ['2', '3']],
  ['organizer-kamar-mandi', ['2', '3']],
  ['rak-kamar-mandi', ['2', '3']],
  ['storage-box-baju', ['2', '3']],
  ['diy-storage-box', ['3']],
  ['rak-dapur-besi', ['2', '3']],
  ['storage-box-lipat', ['2', '3']],
  ['tempat-penyimpanan-obat', ['2', '3']],
  ['rak-dinding-dapur', ['2', '3']],
  ['storage-box-mini', ['2', '3']],
  ['rak-penyimpanan-gudang', ['2', '3']],
  ['keranjang-penyimpanan', ['2', '3']],
  ['tempat-penyimpanan-sepatu', ['3']],
];

// Build flat list
const TASKS = [];
for (const [slug, suffixes] of QUEUE) {
  for (const s of suffixes) TASKS.push({ slug, suffix: s });
}

// Parse range args
const start = parseInt(process.argv[2] || '0');
const end = parseInt(process.argv[3] || String(TASKS.length));
console.log(`[BATCH] Tasks ${start}..${end} of ${TASKS.length} total`);

const results = { ok: 0, failed: 0, skipped: 0, items: [] };
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  for (let i = start; i < end && i < TASKS.length; i++) {
    const t = TASKS[i];
    // Rotate accounts: even idx -> #1, odd -> #2
    const account = (i % 2 === 0) ? 1 : 2;
    const r = generateOne(t.slug, t.suffix, account);
    results.items.push(r);
    if (r.ok) results.ok++;
    else if (r.skipped) results.skipped++;
    else results.failed++;

    if (i + 1 < end && i + 1 < TASKS.length) {
      console.log(`  [WAIT] throttle ${THROTTLE_MS}ms before next gen`);
      await sleep(THROTTLE_MS);
    }
  }
  console.log(`\n[SUMMARY] ok=${results.ok} failed=${results.failed} skipped=${results.skipped}`);
  writeFileSync(join(ROOT, `image-gen-log-${start}-${end}.json`), JSON.stringify(results, null, 2));
})();
