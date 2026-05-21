// Literal per-article verify script for Sesoris (361 articles)
// Fetches live URL + grep checks against /artikel-seo 15-criteria checklist
// Outputs JSONL log to data/literal-verify-log.jsonl
// Throttles 2s between fetches

import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('./content/blog');
const LOG_PATH = path.resolve('./data/literal-verify-log.jsonl');
const LIVE_BASE = 'https://www.sesoris.com/blog/';
const TODAY = new Date('2026-05-21');
const THROTTLE_MS = 2000;
const TIMEOUT_MS = 30000;

// 15-criteria checklist for /artikel-seo compliance + Sesoris-specific
// Each criterion = max 1 point. Total 15.
function buildChecks(htmlText, jsonData) {
  const html = htmlText || '';
  const content = Array.isArray(jsonData.content) ? jsonData.content.join('\n') : (jsonData.content || '');
  const title = jsonData.title || '';
  const checks = {};

  // 1. HTTP 200 served
  checks.c1_http_ok = 1; // set externally if 200

  // 2. Title rendered (h1 or og:title contains the title fragment)
  const titlePart = title.slice(0, 30);
  checks.c2_title_render = html.includes(titlePart) ? 1 : 0;

  // 3. H2 count >= 5 (heading hierarchy)
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  checks.c3_h2_count = h2Count >= 5 ? 1 : 0;

  // 4. H3 sub-headings present (>=3)
  const h3Count = (html.match(/<h3[\s>]/gi) || []).length;
  checks.c4_h3_count = h3Count >= 3 ? 1 : 0;

  // 5. TOC / Daftar Isi / Tabel Isi present
  checks.c5_toc = /Daftar Isi|Table of Contents|Tabel Isi|tableOfContents/i.test(html) ? 1 : 0;

  // 6. FAQ section present (>=3 questions)
  const faqHits = (html.match(/FAQ|Frequently Asked|Pertanyaan/gi) || []).length;
  const qSchemaHits = (html.match(/"@type":\\?"Question\\?"/g) || []).length;
  checks.c6_faq = (faqHits >= 1 && qSchemaHits >= 3) ? 1 : 0;

  // 7. FAQ JSON-LD schema present
  checks.c7_faq_schema = /FAQPage/.test(html) ? 1 : 0;

  // 8. Word count target (>=1500 from content)
  const plainText = content.replace(/[#*_`\[\]\(\)!>:|-]/g, ' ').replace(/\s+/g, ' ');
  const wordCount = plainText.split(' ').filter(w => w.length > 1).length;
  checks.c8_word_count = wordCount >= 1500 ? 1 : 0;

  // 9. Hero image rendered (any /images/blog/ in HTML)
  checks.c9_hero_image = /\/images\/blog\/.*\.(webp|jpg|jpeg|png)/i.test(html) ? 1 : 0;

  // 10. Multiple inline images (>=2)
  const imgHits = (html.match(/\/images\/blog\/[^"'\s]+\.(webp|jpg|jpeg|png)/gi) || []).length;
  checks.c10_inline_images = imgHits >= 2 ? 1 : 0;

  // 11. Internal links (>=2 to /blog/ or /shop/ or sesoris.com)
  const intLinks = (html.match(/href="\/(blog|shop|kategori|product)\//gi) || []).length;
  checks.c11_internal_links = intLinks >= 2 ? 1 : 0;

  // 12. External authority link (>=1 outbound non-sesoris)
  const extLinks = (html.match(/href="https?:\/\/(?!www\.sesoris\.com|sesoris\.com)/gi) || []).length;
  checks.c12_ext_links = extLinks >= 1 ? 1 : 0;

  // 13. IDR-only pricing (no USD $ pattern in visible body, excluding script/style/JSON-LD)
  const stripped13 = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const usdMatches = (stripped13.match(/\$\s?\d/g) || []).length;
  checks.c13_idr_only = usdMatches === 0 ? 1 : 0;

  // 14. "Tim Sesoris" byline present
  checks.c14_tim_sesoris = /Tim Sesoris/.test(html) ? 1 : 0;

  // 15. Em-dash absent (no, character in user-facing text)
  // We check the rendered visible HTML between body tags
  const bodyMatch = html.match(/<body[^>]*>([\s\S]+)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;
  // Strip script/style
  const visible = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const emDashHits = (visible.match(/, /g) || []).length;
  checks.c15_no_em_dash = emDashHits === 0 ? 1 : 0;

  const score = Object.values(checks).reduce((a, b) => a + b, 0);
  return { checks, score, h2Count, h3Count, wordCount, imgHits, intLinks, extLinks, usdMatches, emDashHits };
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'SesorisLiteralVerify/1.0' } });
    const text = await res.text();
    return { status: res.status, text };
  } catch (e) {
    return { status: 0, error: String(e.message || e) };
  } finally {
    clearTimeout(timer);
  }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  // Load all blog JSON
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json')).sort();
  console.log('Total JSON files:', files.length);

  // Filter to past-dated (eligible) only
  const eligible = [];
  for (const f of files) {
    try {
      const j = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'));
      const d = new Date(j.date);
      if (d <= TODAY) eligible.push({ file: f, json: j });
    } catch (e) {
      console.error('Parse error:', f, e.message);
    }
  }
  console.log('Eligible past-dated articles:', eligible.length);

  // Determine starting index for resume
  let startIdx = 0;
  let existingLog = [];
  if (fs.existsSync(LOG_PATH)) {
    const lines = fs.readFileSync(LOG_PATH, 'utf-8').split('\n').filter(l => l.trim());
    existingLog = lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    const done = new Set(existingLog.map(x => x.slug));
    const remaining = eligible.filter(e => !done.has(e.json.slug));
    console.log('Already verified:', done.size, 'Remaining:', remaining.length);
    // Reset eligible to remaining
    eligible.splice(0, eligible.length, ...remaining);
  } else {
    // Ensure data dir exists
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  }

  console.log('Starting verification of', eligible.length, 'articles...');
  const startTime = Date.now();
  let processed = 0;
  let lastCheckpoint = 0;

  for (let i = 0; i < eligible.length; i++) {
    const { file, json } = eligible[i];
    const slug = json.slug;
    const url = LIVE_BASE + slug;

    const fetchStart = Date.now();
    const res = await fetchWithTimeout(url, TIMEOUT_MS);
    const fetchMs = Date.now() - fetchStart;

    const entry = {
      idx: existingLog.length + i + 1,
      slug,
      file,
      date: json.date,
      title: json.title,
      url,
      http: res.status,
      fetch_ms: fetchMs,
      verified_at: new Date().toISOString(),
    };

    if (res.status === 200 && res.text) {
      const report = buildChecks(res.text, json);
      entry.score = report.score;
      entry.checks = report.checks;
      entry.h2 = report.h2Count;
      entry.h3 = report.h3Count;
      entry.words = report.wordCount;
      entry.imgs = report.imgHits;
      entry.int_links = report.intLinks;
      entry.ext_links = report.extLinks;
      entry.usd = report.usdMatches;
      entry.em_dash = report.emDashHits;
      entry.html_size = res.text.length;
    } else {
      entry.score = 0;
      entry.error = res.error || `HTTP ${res.status}`;
    }

    fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n');
    processed++;

    // Checkpoint logging every 25 articles to stdout
    if (processed % 25 === 0 || processed === eligible.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const eta = ((eligible.length - processed) * (Date.now() - startTime) / processed / 1000).toFixed(0);
      console.log(`[${processed}/${eligible.length}] elapsed=${elapsed}s eta=${eta}s last_slug=${slug.slice(0,50)} score=${entry.score}`);
      lastCheckpoint = processed;
    }

    // Throttle
    if (i < eligible.length - 1) await sleep(THROTTLE_MS);
  }

  // Final summary
  const allEntries = fs.readFileSync(LOG_PATH, 'utf-8').split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
  console.log('\n=== FINAL SUMMARY ===');
  console.log('Total verified:', allEntries.length);
  const scoreDist = {};
  for (const e of allEntries) {
    const s = e.score ?? 'err';
    scoreDist[s] = (scoreDist[s] || 0) + 1;
  }
  console.log('Score distribution:', JSON.stringify(scoreDist));
  const bad = allEntries.filter(e => (e.score ?? 0) < 10).sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
  console.log('Articles with score <10:', bad.length);
  console.log('Worst 10:');
  for (const e of bad.slice(0, 10)) {
    console.log(`  ${e.score} - ${e.slug.slice(0, 60)} [http=${e.http} h2=${e.h2} faq=${e.checks?.c6_faq} img=${e.imgs} ext=${e.ext_links} usd=${e.usd} em=${e.em_dash}]`);
  }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
