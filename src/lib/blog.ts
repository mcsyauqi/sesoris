import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  dateFormatted: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string[];
}

/**
 * Returns the best SEO title for a blog post (≤ 70 chars including " | Sesoris" suffix).
 * Priority: post.seoTitle → smart-truncated post.title
 *
 * Smart truncation rules:
 * - Cut at last word boundary before MAX_TITLE_LEN
 * - Strip trailing connector/preposition words (for, to, of, with, and, in, on, the, a, an, by, at)
 *   so output never ends mid-thought (e.g. "Efficient Layout for" -> "Efficient Layout")
 * - Strip trailing punctuation
 */
export function getBlogSeoTitle(post: BlogPost): string {
  // " | Sesoris" is appended by layout template, costs 10 chars
  const MAX_TITLE_LEN = 60;
  if (post.seoTitle) return post.seoTitle;
  if (post.title.length <= MAX_TITLE_LEN) return post.title;

  let truncated = post.title.substring(0, MAX_TITLE_LEN).replace(/\s\S*$/, '');

  const STOP_TAILS = new Set([
    'for', 'to', 'of', 'with', 'and', 'in', 'on', 'the',
    'a', 'an', 'by', 'at', 'or', 'but', 'as', 'into', 'from',
  ]);
  // strip up to 3 trailing connector words
  for (let i = 0; i < 3; i++) {
    const lastWord = truncated.split(/\s+/).pop()?.toLowerCase().replace(/[^a-z]/g, '') ?? '';
    if (STOP_TAILS.has(lastWord)) {
      truncated = truncated.replace(/\s+\S+$/, '');
    } else {
      break;
    }
  }
  // strip trailing punctuation
  truncated = truncated.replace(/[\s,;:\-–, ]+$/, '');
  return truncated;
}

const blogDir = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    return JSON.parse(raw) as BlogPost;
  });
  // Only show articles with date <= today (scheduled publishing)
  const today = new Date().toISOString().split('T')[0];
  const published = posts.filter((p) => p.date <= today);
  // Sort by date descending (newest first)
  published.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return published;
}

export function getAllPostsIncludingScheduled(): BlogPost[] {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    return JSON.parse(raw) as BlogPost;
  });
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as BlogPost;
}

export function findClosestSlug(slug: string): string | null {
  const allSlugs = getAllSlugs();
  const words = slug.split('-').filter((w) => w.length > 2);
  let best: string | null = null;
  let bestScore = 0;
  let bestLen = Infinity;
  for (const s of allSlugs) {
    const score = words.filter((w) => s.includes(w)).length;
    if (score > bestScore || (score === bestScore && s.length < bestLen)) {
      bestScore = score;
      best = s;
      bestLen = s.length;
    }
  }
  return bestScore >= 2 ? best : null;
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(blogDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

/**
 * Deterministic 32-bit hash of a string (FNV-1a). Used to seed link rotation
 * so each source post surfaces a DIFFERENT slice of the archive, spreading
 * internal-link equity instead of concentrating it on the newest few posts.
 */
function slugSeed(slug: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Returns `count` related posts for a given post, distributing internal links
 * across the WHOLE archive rather than always picking the newest few.
 *
 * Fix (cycle: GSC "Discovered - currently not indexed", 2026-06-04):
 * The previous logic ( category.slice(0,3) + newest top-up ) left 89% of
 * published posts (353/396) with ZERO inbound internal links, while a handful
 * of newest posts received 130+. Google deferred indexing the orphaned posts
 * ("Discovered - currently not indexed"). This rotation gives every post a
 * unique, slug-seeded window so inbound links are spread evenly. The result
 * is deterministic (stable across builds) and relevance-first (same-category
 * posts are still preferred for the lead slots).
 */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const all = getAllPosts();
  const pool = all.filter((p) => p.slug !== post.slug);
  if (pool.length <= count) return pool;

  const seed = slugSeed(post.slug);
  const pick = (list: BlogPost[], n: number, taken: Set<string>): BlogPost[] => {
    const avail = list.filter((p) => !taken.has(p.slug));
    if (avail.length === 0) return [];
    const out: BlogPost[] = [];
    // Rotate the starting offset by the seed, then walk with a small stride so
    // the window differs per source post and per category.
    const start = seed % avail.length;
    const stride = (seed % 7) + 1; // 1..7
    for (let i = 0; out.length < n && i < avail.length; i++) {
      const idx = (start + i * stride) % avail.length;
      const cand = avail[idx];
      if (!taken.has(cand.slug)) {
        out.push(cand);
        taken.add(cand.slug);
      }
    }
    // Safety top-up if stride collisions left us short
    if (out.length < n) {
      for (const cand of avail) {
        if (out.length >= n) break;
        if (!taken.has(cand.slug)) { out.push(cand); taken.add(cand.slug); }
      }
    }
    return out;
  };

  const taken = new Set<string>([post.slug]);
  const sameCat = pool.filter((p) => p.category === post.category);
  // Lead slots: same-category, rotated by seed (relevance preserved)
  const result = pick(sameCat, count, taken);
  // Top-up from the full archive, rotated, if same-category was too small
  if (result.length < count) {
    result.push(...pick(pool, count - result.length, taken));
  }
  return result.slice(0, count);
}

/**
 * Returns `count` "explore more" deep links for a post, drawn from the full
 * archive on a seed OFFSET from the related-posts window so the two blocks do
 * not overlap. Lightweight text links that further multiply inbound internal
 * links to deep/older posts (helps GSC indexing of orphaned URLs).
 */
export function getArchiveDeepLinks(post: BlogPost, count = 8): BlogPost[] {
  const all = getAllPosts();
  const pool = all.filter((p) => p.slug !== post.slug);
  if (pool.length <= count) return pool;
  // Offset the seed so this block targets a different slice than related posts.
  const seed = (slugSeed(post.slug) ^ 0x9e3779b9) >>> 0;
  const start = seed % pool.length;
  const stride = (seed % 11) + 3; // 3..13
  const out: BlogPost[] = [];
  const taken = new Set<string>();
  for (let i = 0; out.length < count && i < pool.length * 2; i++) {
    const idx = (start + i * stride) % pool.length;
    const cand = pool[idx];
    if (!taken.has(cand.slug)) { out.push(cand); taken.add(cand.slug); }
  }
  return out;
}
