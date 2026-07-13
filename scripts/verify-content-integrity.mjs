// Content integrity gate for sesoris blog JSON.
// Catches the 2026-06-26 generator defect: verbatim paragraph repeats inside one
// article, and boilerplate bodies shared across articles. Also checks that no
// redirect source collides with a live slug.
//
// Usage: node scripts/verify-content-integrity.mjs
// Exit 1 on any failure.

import { readdirSync, readFileSync } from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "sesoris", "content", "blog");
const SELF_DUP_MAX = 0.15; // >=15% of body being verbatim self-repeat is the defect
const CROSS_DUP_MAX = 0.4; // 4-gram Jaccard between two live articles

const posts = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ file: f, ...JSON.parse(readFileSync(path.join(BLOG_DIR, f), "utf-8")) }));

const live = posts.filter((p) => !p.retired);
const retired = posts.filter((p) => p.retired);
const failures = [];

// --- 1. no verbatim paragraph repeated inside a single article ---
const bodyBlocks = (p) =>
  (p.content || []).filter(
    (b) => typeof b === "string" && !/^#{1,3}\s/.test(b) && !/^!\[/.test(b) && b.length > 80
  );

for (const p of live) {
  const blocks = bodyBlocks(p);
  if (!blocks.length) continue;
  const totalChars = blocks.reduce((s, b) => s + b.length, 0);
  const uniqChars = [...new Set(blocks)].reduce((s, b) => s + b.length, 0);
  const ratio = (totalChars - uniqChars) / totalChars;
  if (ratio >= SELF_DUP_MAX) {
    failures.push(
      `self-duplicate body: ${p.slug} (${Math.round(ratio * 100)}% of body is a verbatim repeat)`
    );
  }
}

// --- 2. no two live articles sharing a near-identical body ---
const shingles = (p) => {
  const words = (p.content || [])
    .filter((b) => typeof b === "string")
    .join(" ")
    .toLowerCase()
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 4 <= words.length; i++) s.add(words.slice(i, i + 4).join(" "));
  return s;
};
const jaccard = (a, b) => {
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  let hits = 0;
  for (const x of small) if (large.has(x)) hits++;
  return hits / (a.size + b.size - hits);
};
const sig = live.map((p) => ({ slug: p.slug, sh: shingles(p) }));
for (let i = 0; i < sig.length; i++) {
  for (let j = i + 1; j < sig.length; j++) {
    const score = jaccard(sig[i].sh, sig[j].sh);
    if (score >= CROSS_DUP_MAX) {
      failures.push(
        `cross-duplicate body (${score.toFixed(2)}): ${sig[i].slug} <-> ${sig[j].slug}`
      );
    }
  }
}

// --- 3. a retired slug must not collide with a live slug, and must point somewhere real ---
const liveSlugs = new Set(live.map((p) => p.slug));
for (const p of retired) {
  if (liveSlugs.has(p.slug)) failures.push(`redirect source collides with live slug: ${p.slug}`);
  if (!p.redirectTo) failures.push(`retired without redirectTo: ${p.slug}`);
  else if (!liveSlugs.has(p.redirectTo))
    failures.push(`redirect target is not a live article: ${p.slug} -> ${p.redirectTo}`);
}

console.log(`live: ${live.length}  retired: ${retired.length}`);
if (failures.length) {
  console.error(`\nFAIL (${failures.length}):`);
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log("OK: no self-duplicate bodies, no cross-duplicate bodies, redirects resolve.");
