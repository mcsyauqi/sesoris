#!/usr/bin/env node
// Guards the scheduled-publishing invariants that keep posts from being hidden
// by a timezone/date mismatch. See docs/scheduled-publishing.md.
// Run: node scripts/check-scheduled-publishing.mjs   (exit 1 on any violation)
import fs from 'fs';
import path from 'path';
import assert from 'assert';

const blogDir = path.join(process.cwd(), 'content', 'blog');
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
