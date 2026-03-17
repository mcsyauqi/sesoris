import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
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
