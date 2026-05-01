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
  truncated = truncated.replace(/[\s,;:\-–—]+$/, '');
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
