// Re-verify only the 12 fixed articles after deploy
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('./content/blog');
const LIVE_BASE = 'https://www.sesoris.com/blog/';
const SLUGS = [
  'rahasia-rumah-minimalis-selalu-rapi',
  'organization-and-cleaning-complete-tutorial-guide-transform-home-2026',
  'sustainable-living-tips',
  'cleaning-organization-expert-tips-transform-home-storage-systems-2026',
  'ideas-for-shoe-storage-in-entryway',
  'organization-and-cleaning-services-vs-diy-complete-guide-home-solutions-2026',
  'organization-small-closet-ideas-smart-solutions-transform-tiny-wardrobe-2026',
  'tutorial-membuat-taman-mini-indoor-panduan-lengkap-2026',
  'cara-merapikan-lemari-baju',
  'toples-kue-lebaran',
  'tutorial-membuat-home-office-ergonomis-produktif',
  'rak-piring-stainless-steel-anti-karat-dan-tahan-lama',
];

function buildChecks(htmlText, jsonData) {
  const html = htmlText || '';
  const content = Array.isArray(jsonData.content) ? jsonData.content.join('\n') : (jsonData.content || '');
  const title = jsonData.title || '';
  const checks = {};
  checks.c1_http_ok = 1;
  checks.c2_title_render = html.includes(title.slice(0, 30)) ? 1 : 0;
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  checks.c3_h2_count = h2Count >= 5 ? 1 : 0;
  const h3Count = (html.match(/<h3[\s>]/gi) || []).length;
  checks.c4_h3_count = h3Count >= 3 ? 1 : 0;
  checks.c5_toc = /Daftar Isi|Table of Contents|Tabel Isi|tableOfContents/i.test(html) ? 1 : 0;
  const faqHits = (html.match(/FAQ|Frequently Asked|Pertanyaan/gi) || []).length;
  const qSchemaHits = (html.match(/"@type":\\?"Question\\?"/g) || []).length;
  checks.c6_faq = (faqHits >= 1 && qSchemaHits >= 3) ? 1 : 0;
  checks.c7_faq_schema = /FAQPage/.test(html) ? 1 : 0;
  const plainText = content.replace(/[#*_`\[\]\(\)!>:|-]/g, ' ').replace(/\s+/g, ' ');
  const wordCount = plainText.split(' ').filter(w => w.length > 1).length;
  checks.c8_word_count = wordCount >= 1500 ? 1 : 0;
  checks.c9_hero_image = /\/images\/blog\/.*\.(webp|jpg|jpeg|png)/i.test(html) ? 1 : 0;
  const imgHits = (html.match(/\/images\/blog\/[^"'\s]+\.(webp|jpg|jpeg|png)/gi) || []).length;
  checks.c10_inline_images = imgHits >= 2 ? 1 : 0;
  const intLinks = (html.match(/href="\/(blog|shop|kategori|product)\//gi) || []).length;
  checks.c11_internal_links = intLinks >= 2 ? 1 : 0;
  const extLinks = (html.match(/href="https?:\/\/(?!www\.sesoris\.com|sesoris\.com)/gi) || []).length;
  checks.c12_ext_links = extLinks >= 1 ? 1 : 0;
  const stripped13 = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const usdMatches = (stripped13.match(/\$\s?\d/g) || []).length;
  checks.c13_idr_only = usdMatches === 0 ? 1 : 0;
  checks.c14_tim_sesoris = /Tim Sesoris/.test(html) ? 1 : 0;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]+)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;
  const visible = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const emDashHits = (visible.match(/, /g) || []).length;
  checks.c15_no_em_dash = emDashHits === 0 ? 1 : 0;
  const score = Object.values(checks).reduce((a, b) => a + b, 0);
  return { checks, score, h2Count, h3Count, wordCount, imgHits, intLinks, extLinks, usdMatches, emDashHits };
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

for (const slug of SLUGS) {
  const file = path.join(BLOG_DIR, slug + '.json');
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const url = LIVE_BASE + slug;
  const res = await fetch(url, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } });
  const html = await res.text();
  const rpt = buildChecks(html, j);
  const fails = Object.entries(rpt.checks).filter(([k, v]) => v === 0).map(([k]) => k);
  console.log(`[${rpt.score}/15] ${slug}`);
  console.log(`   h2=${rpt.h2Count} h3=${rpt.h3Count} words=${rpt.wordCount} imgs=${rpt.imgHits} ext=${rpt.extLinks} usd=${rpt.usdMatches} em=${rpt.emDashHits}`);
  if (fails.length > 0) console.log(`   FAILS: ${fails.join(', ')}`);
  await sleep(1500);
}
