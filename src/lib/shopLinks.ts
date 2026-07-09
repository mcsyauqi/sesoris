import { categories, getProductsByCategory } from '@/data/products';
import type { BlogPost } from '@/lib/blog';
import type { Product } from '@/types';

// Rough keyword signal per category, used to pick the most relevant
// "shop this" block for a blog post. Not exact NLP — just enough to avoid
// linking every post to the same category (fixes 0 internal links from
// blog -> money pages, see [[sesoris-seo-audit-2026-07-05]] root cause #3).
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'home-living': ['rak dinding', 'floating shelf', 'organizer rumah', 'dekorasi', 'wall shelf', 'living room', 'ruang tamu', 'storage bin', 'keranjang', 'rak display', 'bedroom', 'kamar tidur', 'home organization', 'declutter', 'closet'],
  'kitchen-dining': ['dapur', 'kitchen', 'rak piring', 'dish rack', 'food storage', 'food container', 'pantry', 'talenan', 'cutting board', 'bumbu', 'spice', 'meja makan', 'dining', 'glass container'],
  'tools-gadgets': ['multi-tool', 'gadget dapur', 'alat praktis', 'diy', 'perbaikan rumah', 'cable management', 'obeng', 'screwdriver'],
  'gift-sets': ['hadiah', 'gift', 'kado', 'wedding gift', 'housewarming', 'corporate gift', 'gift set', 'parcel'],
  'personal-care': ['self-care', 'self care', 'skincare', 'aromatherapy', 'aromaterapi', 'diffuser', 'wellness', 'kamar mandi organizer', 'facial roller', 'gua sha'],
  'tech-accessories': ['earbuds', 'wireless charging', 'charging station', 'organizer kabel', 'smart home', 'power bank', 'headphone'],
  'bags-pouches': ['tas', 'pouch', 'toiletry bag', 'tote bag', 'packing cube', 'koper', 'mesh pouch'],
  'office-desk': ['meja kerja', 'desk organizer', 'workspace', 'home office', 'lampu meja', 'desk lamp', 'wfh'],
  'outdoor-travel': ['travel organizer', 'outdoor', 'liburan', 'perjalanan', 'hiking', 'camping', 'day trip', 'travel gear'],
};

/** Deterministic hash so posts that match no keyword still get a rotated (not fixed) category, spreading link equity. */
function slugSeed(slug: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function getShopLinksForPost(post: BlogPost, productCount = 2): { categorySlug: string; categoryName: string; products: Product[] } {
  const haystack = `${post.title} ${post.excerpt} ${post.content.join(' ')}`.toLowerCase();

  let bestSlug = '';
  let bestScore = 0;
  for (const slug of Object.keys(CATEGORY_KEYWORDS)) {
    const score = CATEGORY_KEYWORDS[slug].reduce((acc, kw) => acc + (haystack.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestSlug = slug;
    }
  }

  if (!bestSlug) {
    const slugs = Object.keys(CATEGORY_KEYWORDS);
    bestSlug = slugs[slugSeed(post.slug) % slugs.length];
  }

  const category = categories.find((c) => c.slug === bestSlug);
  const products = getProductsByCategory(bestSlug).slice(0, productCount);

  return { categorySlug: bestSlug, categoryName: category?.name ?? bestSlug, products };
}
