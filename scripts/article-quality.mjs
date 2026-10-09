#!/usr/bin/env node
// Article quality gate (2026-10-09, cycle #73-#75 recheck).
//
// Why: an audit of the cycle #73-#75 articles found 24 of 24 Sesoris posts
// below the /artikel-seo standard. The generator ones shipped with 5 FAQ
// questions and no table; the hand-written comparison guides shipped at about
// 1,600 words with 2 images and an FAQ the renderer could not turn into
// FAQPage schema. Nothing measured the article before it went live, so the
// prompt's wishes were the only safeguard. This module measures the stored
// JSON the same way the blog renderer reads it, so a pass here means the
// published page carries the same counts.
//
// Standard: 2,000+ body words, 4+ distinct content images, 7+ FAQ questions
// that the renderer turns into FAQPage schema, 1+ real table (header,
// separator, at least 2 data rows), 10+ internal links.
//
// CLI:
//   node scripts/article-quality.mjs                  # future-dated + new (uncommitted) posts
//   node scripts/article-quality.mjs content/blog/x.json [...]
//   node scripts/article-quality.mjs --future --new --warn --json
// Exit 1 when any checked article fails, unless --warn is passed.

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

export const GATE = { words: 2000, images: 4, faq: 7, tables: 1, internalLinks: 10 };

// Mirrors flattenContentBlocks() in src/app/blog/[slug]/page.tsx.
export function flattenContentBlocks(content) {
  const out = [];
  for (const entry of content) {
    if (typeof entry !== 'string') continue;
    if (entry.includes('\n\n') || (entry.startsWith('## ') && entry.includes('\n'))) {
      for (const p of entry.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)) out.push(p);
    } else {
      out.push(entry);
    }
  }
  return out.flatMap((block) => {
    const lines = block.split('\n').map((l) => l.trim());
    return lines.length > 1 && lines.every((l) => l.startsWith('|') && l.endsWith('|')) ? lines : [block];
  });
}

// Mirrors plainText() in the renderer.
export function plainText(md) {
  return md
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/(^|\s)\*(\S[^*]*?)\*/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

// Mirrors the FAQ extraction that builds the FAQPage JSON-LD in the renderer.
export function extractFaq(content) {
  const flat = flattenContentBlocks(content);
  const items = [];
  let inFaqSection = false;
  for (let i = 0; i < flat.length; i++) {
    const line = flat[i];
    if (line.startsWith('## ')) {
      inFaqSection = /\bfaq\b|frequently asked questions|common questions/i.test(plainText(line));
      continue;
    }
    const isGenerated = line.startsWith('**Q:') || line.startsWith('**Q :');
    const isLegacy = inFaqSection && line.startsWith('### ') && line.trim().endsWith('?');
    if (!isGenerated && !isLegacy) continue;
    const question = isGenerated
      ? plainText(line.replace(/^\*\*Q\s*:\s*/, '').replace(/\*\*$/, ''))
      : plainText(line.replace(/^###\s+/, ''));
    const answer = i + 1 < flat.length ? plainText(flat[i + 1]) : '';
    if (question && answer && !answer.startsWith('##') && !answer.startsWith('**Q')) {
      items.push({ question, answer });
    }
  }
  return items;
}

function countTables(flat) {
  let tables = 0;
  let i = 0;
  while (i < flat.length) {
    if (!flat[i].trim().startsWith('|')) {
      i++;
      continue;
    }
    const rows = [];
    while (i < flat.length && flat[i].trim().startsWith('|')) rows.push(flat[i++].trim());
    const sepIdx = rows.findIndex((r) => /^\|\s*:?-{3,}/.test(r));
    const dataRows = sepIdx >= 0 ? rows.length - sepIdx - 1 : 0;
    if (sepIdx === 1 && dataRows >= 2) tables++;
  }
  return tables;
}

export function measureArticle(post) {
  const content = Array.isArray(post.content) ? post.content : [];
  const flat = flattenContentBlocks(content);
  const imageUrls = new Set();
  for (const line of flat) {
    for (const m of line.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
      if (!m[1].includes('PLACEHOLDER_IMAGE')) imageUrls.add(m[1]);
    }
  }
  const prose = flat
    .filter((l) => !l.startsWith('![') && !/^:::/.test(l) && !/^\|\s*:?-{3,}/.test(l))
    .map((l) => plainText(l.replace(/^#+\s+/, '').replace(/^[•\-]\s+/, '').replace(/\|/g, ' ')))
    .join(' ');
  const words = prose.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const internalLinks = flat
    .join('\n')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .match(/\]\((?:\/(?!images\/)|https:\/\/(?:www\.)?sesoris\.com)[^)]*\)/g) || [];
  return {
    words,
    images: imageUrls.size,
    faq: extractFaq(content).length,
    tables: countTables(flat),
    internalLinks: internalLinks.length,
    h2: flat.filter((l) => l.startsWith('## ')).length,
  };
}

export function checkArticle(post, gate = GATE) {
  const m = measureArticle(post);
  const failures = [];
  if (m.words < gate.words) failures.push(`words ${m.words} < ${gate.words}`);
  if (m.images < gate.images) failures.push(`images ${m.images} < ${gate.images}`);
  if (m.faq < gate.faq) failures.push(`faq ${m.faq} < ${gate.faq}`);
  if (m.tables < gate.tables) failures.push(`tables ${m.tables} < ${gate.tables}`);
  if (m.internalLinks < gate.internalLinks) failures.push(`internal links ${m.internalLinks} < ${gate.internalLinks}`);
  return { metrics: m, failures, pass: failures.length === 0 };
}

function selectFiles(args) {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const explicit = args.filter((a) => !a.startsWith('--'));
  if (explicit.length) return explicit.map((f) => path.resolve(f));
  const wantFuture = args.includes('--future') || !args.some((a) => a === '--new');
  const wantNew = args.includes('--new') || !args.some((a) => a === '--future');
  const picked = new Set();
  if (wantFuture) {
    const today = new Date().toISOString().split('T')[0];
    for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.json'))) {
      const post = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf-8'));
      if (!post.retired && String(post.date) > today) picked.add(path.join(blogDir, f));
    }
  }
  if (wantNew) {
    try {
      const out = execFileSync('git', ['status', '--porcelain', '--', 'content/blog'], { encoding: 'utf-8' });
      for (const line of out.split('\n')) {
        const m = line.match(/^(\?\?|A[ M]?)\s+(.+\.json)$/);
        if (m) picked.add(path.resolve(m[2].trim()));
      }
    } catch {
      /* not a git checkout: future-dated selection still applies */
    }
  }
  return [...picked].sort();
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const args = process.argv.slice(2);
  const files = selectFiles(args);
  const results = files.map((file) => {
    const post = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return { file: path.relative(process.cwd(), file), date: post.date, ...checkArticle(post) };
  });
  if (args.includes('--json')) {
    console.log(JSON.stringify(results, null, 1));
  } else {
    for (const r of results) {
      const m = r.metrics;
      console.log(
        `${r.pass ? 'PASS' : 'FAIL'} ${r.date} ${r.file}  words=${m.words} images=${m.images} faq=${m.faq} tables=${m.tables} links=${m.internalLinks}` +
          (r.pass ? '' : `  -> ${r.failures.join(', ')}`),
      );
    }
  }
  const failed = results.filter((r) => !r.pass);
  console.log(`article quality gate: ${results.length - failed.length}/${results.length} pass`);
  if (failed.length && !args.includes('--warn')) process.exit(1);
}
