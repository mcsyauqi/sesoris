#!/usr/bin/env node
// Guards the scheduled-publishing invariants that keep posts from being hidden
// by a timezone/date mismatch. See docs/scheduled-publishing.md.
// Run: node scripts/check-scheduled-publishing.mjs   (exit 1 on any violation)
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { execFileSync } from 'child_process';

const blogDir = path.join(process.cwd(), 'content', 'blog');
const IMG_RE = /!\[[^\]]*\]\(\/images\//;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// The exact gate getAllPosts() uses, in UTC.
const gateToday = () => new Date().toISOString().split('T')[0];
const isPublished = (date, today) => date <= today; // string compare, ISO-safe

// 1. Every post date is strict YYYY-MM-DD (what makes the string gate correct).
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
const bad = [];
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf-8')).date;
  if (!DATE_RE.test(d)) bad.push(`${f}: ${JSON.stringify(d)}`);
}
assert.strictEqual(bad.length, 0, `Non-YYYY-MM-DD dates break the gate:\n${bad.join('\n')}`);

// 2. Gate boundary behaves chronologically: yesterday/today shown, tomorrow hidden.
const today = gateToday();
const day = (delta) => {
  const d = new Date(`${today}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().split('T')[0];
};
assert.ok(isPublished(day(-1), today), 'yesterday must be published');
assert.ok(isPublished(today, today), 'today must be published');
assert.ok(!isPublished(day(1), today), 'tomorrow must stay hidden');
// Lexicographic edge: a longer/time-suffixed string must NOT sneak past today.
assert.ok(!isPublished(`${today}T00:00:00`, today), 'time-suffixed date would be mis-gated');

console.log(`OK — ${files.length} posts, all YYYY-MM-DD, UTC gate boundary correct (today=${today}).`);

// ---------------------------------------------------------------------------
// 3. Redirect safety: no redirect may ever catch a live article.
//    History: broad `/blog/:path(.*token.*)` matchers killed live articles
//    three times (2026-06). Redirects must be exact-path only, and no exact
//    source may collide with a live slug (which would 301 a real article).
// ---------------------------------------------------------------------------
const liveSlugs = new Set(files.map((f) => f.replace(/\.json$/, '')));
const nextConfig = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf-8');

// 3a. Ban broad regex matchers in redirect sources (`:path(` with wildcards).
const broadMatchers = [...nextConfig.matchAll(/source:\s*['"`]([^'"`]*:path\([^'"`]*)['"`]/g)]
  .map((m) => m[1]);
assert.strictEqual(
  broadMatchers.length,
  0,
  `Broad redirect matchers are banned (they have killed live articles before):\n${broadMatchers.join('\n')}`
);

// 3b. Every exact /blog/<slug> redirect source must NOT be a live article slug.
const redirectSources = new Set(
  [...nextConfig.matchAll(/source:\s*['"`]\/blog\/([a-z0-9-]+)['"`]/g)].map((m) => m[1])
);
const legacyPath = path.join(process.cwd(), 'data', 'legacy-blog-redirects.json');
if (fs.existsSync(legacyPath)) {
  for (const slug of JSON.parse(fs.readFileSync(legacyPath, 'utf-8'))) {
    redirectSources.add(slug);
  }
}
const collisions = [...redirectSources].filter((slug) => liveSlugs.has(slug));
assert.strictEqual(
  collisions.length,
  0,
  `Redirect source collides with a LIVE article (would 301 real content):\n${collisions.join('\n')}`
);

console.log(
  `OK — ${redirectSources.size} exact /blog redirect sources, 0 broad matchers, 0 collisions with ${liveSlugs.size} live slugs.`
);

// ---------------------------------------------------------------------------
// 4. HERO / BODY-IMAGE GATE (cycle #64).
//    scripts/generate-image.ts called a model id that Google retired
//    (imagen-4.0-generate-001:predict -> HTTP 404). Every failure was swallowed,
//    so the generator fell back to /images/blog/default-hero.webp and stripped
//    every PLACEHOLDER_IMAGE line. 63 articles shipped with one shared hero and
//    no body images while this workflow kept reporting success.
//    Only files this run actually touched are checked: the historic articles are
//    repaired separately and must not block a green pipeline forever.
// ---------------------------------------------------------------------------
const DEFAULT_HERO = '/images/blog/default-hero.webp';
let touchedArticles = [];
try {
  touchedArticles = execFileSync('git', ['status', '--porcelain', '--', 'content/blog'], { encoding: 'utf-8' })
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('D '))
    .map((line) => line.replace(/^[A-Z?!]{1,2}\s+/, '').replace(/^"|"$/g, ''))
    .filter((f) => f.endsWith('.json'));
} catch {
  console.log('Image gate: git status unavailable, nothing to compare against.');
}

const heroViolations = [];
const bodyViolations = [];
for (const rel of touchedArticles) {
  const abs = path.join(process.cwd(), rel);
  if (!fs.existsSync(abs)) continue;
  const post = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  if (!post.image || post.image === DEFAULT_HERO) {
    heroViolations.push(rel + ': image=' + JSON.stringify(post.image));
  }
  const bodyImages = (post.content || []).filter((line) => IMG_RE.test(line)).length;
  if (bodyImages === 0) bodyViolations.push(rel);
}
assert.strictEqual(
  heroViolations.length,
  0,
  'Article(s) still point at the shared placeholder hero, which means image generation failed. ' +
    'Fix the image pipeline instead of publishing these:\n' + heroViolations.join('\n')
);
assert.strictEqual(
  bodyViolations.length,
  0,
  'Article(s) have zero body images (every PLACEHOLDER_IMAGE was dropped, so image generation failed):\n' +
    bodyViolations.join('\n')
);
console.log(
  `OK — image gate: ${touchedArticles.length} touched article file(s), 0 placeholder heroes, 0 image-less bodies.`
);

// ---------------------------------------------------------------------------
// 5. CORPUS RATCHET (cycle #66).
//    The cycle-#64 gate above only inspects files the CURRENT run touched, so it
//    stops a bad article from being born but says nothing about the ones already
//    in the tree. 39 pre-gate articles still point at default-hero.webp, and one
//    of them (organization-ideas-closet) reached its scheduled publish date on
//    2026-09-17 and went live with the shared placeholder while every workflow
//    stayed green. A gate that only looks at today cannot see a defect that was
//    committed a week ago and detonates on a timer.
//
//    data/image-debt.json is the grandfather list. It may SHRINK, never grow:
//    any article NOT on it that shows a defect fails the run. That blocks a
//    regression on day one without holding the daily pipeline hostage to 39
//    historic repairs. Prune a slug from the ledger in the same commit that
//    repairs it.
//
//    Defect 1 — placeholder hero: image === /images/blog/default-hero.webp.
//    Defect 2 — brand-named caption: the renderer prints markdown alt text as a
//    visible <figcaption>, and every image here is an AI illustration of a
//    generic home setting, so "Pyrex glass containers on a countertop" is a
//    reader-facing claim that the picture shows a real product it does not show.
//    scripts/generate-blog-post.ts scrubs these at the source; this is a backstop.
// ---------------------------------------------------------------------------
const debtPath = path.join(process.cwd(), 'data', 'image-debt.json');
const debt = fs.existsSync(debtPath)
  ? JSON.parse(fs.readFileSync(debtPath, 'utf-8'))
  : { placeholder_hero: [], brand_captions: [] };
const heroDebt = new Set(debt.placeholder_hero || []);
const brandDebt = new Set(debt.brand_captions || []);

const CAPTION_BRAND_RE =
  /\b(Glasslock|Pyrex|Corelle|Rubbermaid|Tupperware|Sterilite|Snapware|IKEA|PAX|IVAR|ALGOT|BOAXEL|KALLAX|BILLY|TROFAST|SKUBB|ClosetMaid|Elfa|Simplehuman|mDesign|OXO|Ziploc|Wayfair|Le Creuset|Anchor Hocking|Amazon Basics|Container Store|Lock\s*&\s*Lock)\b/i;

const newHeroDebt = [];
const newBrandDebt = [];
const repairedHero = [];
const repairedBrand = [];

for (const f of files) {
  const post = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf-8'));
  const slug = post.slug || f.replace(/\.json$/, '');

  const hasPlaceholderHero = post.image === DEFAULT_HERO;
  if (hasPlaceholderHero && !heroDebt.has(slug)) newHeroDebt.push(slug);
  if (!hasPlaceholderHero && heroDebt.has(slug)) repairedHero.push(slug);

  const alts = [];
  for (const line of post.content || []) {
    for (const m of line.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) alts.push(m[1]);
  }
  const hasBrandCaption = alts.some((a) => CAPTION_BRAND_RE.test(a));
  if (hasBrandCaption && !brandDebt.has(slug)) newBrandDebt.push(slug);
  if (!hasBrandCaption && brandDebt.has(slug)) repairedBrand.push(slug);
}

assert.strictEqual(
  newHeroDebt.length,
  0,
  'RATCHET: article(s) point at the shared placeholder hero and are NOT in data/image-debt.json. ' +
    'Give them a real hero instead of adding them to the ledger:\n' + newHeroDebt.join('\n')
);
assert.strictEqual(
  newBrandDebt.length,
  0,
  'RATCHET: image caption(s) name a real brand on an AI-generated illustration, and the article is ' +
    'NOT in data/image-debt.json. The caption is printed as a visible <figcaption>, so it claims the ' +
    'picture shows a product it does not show. Describe the material/form instead:\n' + newBrandDebt.join('\n')
);

if (repairedHero.length || repairedBrand.length) {
  console.log(
    `NOTE — image debt repaid but still listed in data/image-debt.json ` +
      `(${repairedHero.length} hero, ${repairedBrand.length} caption). Prune them so the ratchet tightens:\n` +
      [...repairedHero, ...repairedBrand].join('\n')
  );
}
console.log(
  `OK — corpus ratchet: ${files.length} articles, 0 new placeholder heroes, 0 new brand-named captions ` +
    `(${heroDebt.size} hero + ${brandDebt.size} caption grandfathered).`
);
