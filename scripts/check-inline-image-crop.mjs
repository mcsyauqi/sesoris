#!/usr/bin/env node
// Guard: images inside the blog article body must never be cropped.
// Regression 2026-10-19: the markdown renderer forced aspect-ratio 16/9 + object-fit cover on every
// inline image, so square product photos lost their top and bottom. Crop is allowed only for the
// hero (.article-hero) and index cards. Runs as `prebuild`, so a regression fails the deploy build.
import fs from 'node:fs';

const errors = [];
const page = fs.readFileSync('src/app/blog/[slug]/page.tsx', 'utf8');
const css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. The markdown image branch must render <img className="article-inline-img"> with no inline crop style.
const branch = page.slice(page.indexOf("line.startsWith('![')"), page.indexOf("line.startsWith('![')") + 1500);
if (!branch.includes("line.startsWith('![')")) errors.push('markdown image branch not found in blog/[slug]/page.tsx');
const imgTag = (branch.match(/<img[\s\S]*?\/>/) || [''])[0];
if (!/className="article-inline-img"/.test(imgTag)) errors.push('inline <img> lost className="article-inline-img"');
if (/objectFit|aspectRatio|style=\{/.test(imgTag)) errors.push('inline <img> has an inline style (objectFit/aspectRatio); keep sizing in .article-inline-img');

// 2. The .article-inline-img rule must keep the natural ratio.
const rule = (css.match(/\.article-inline-img\s*\{([^}]*)\}/) || [, ''])[1];
if (!rule) errors.push('.article-inline-img rule missing in globals.css');
for (const [re, msg] of [
  [/height:\s*auto/, 'height: auto'],
  [/aspect-ratio:\s*auto/, 'aspect-ratio: auto'],
  [/object-fit:\s*contain/, 'object-fit: contain'],
]) if (rule && !re.test(rule)) errors.push(`.article-inline-img must declare ${msg}`);
if (/object-fit:\s*(cover|none)/.test(rule)) errors.push('.article-inline-img must not use object-fit cover/none');

// 3. No other rule may force a crop onto images inside the article body.
for (const m of css.matchAll(/([^{}]*\[data-article-content\][^{}]*img[^{}]*)\{([^}]*)\}/g)) {
  if (/object-fit:\s*(cover|none)|aspect-ratio:\s*\d/.test(m[2])) errors.push(`rule "${m[1].trim()}" crops article body images`);
}

if (errors.length) {
  for (const e of errors) console.error('::error::' + e);
  console.error('GAGAL: gambar isi artikel bisa terpotong');
  process.exit(1);
}
console.log('LOLOS: gambar isi artikel tidak dipotong (height auto, aspect-ratio auto, object-fit contain)');
