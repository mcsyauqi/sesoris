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
