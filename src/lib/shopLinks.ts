import { categories, getProductsByCategory } from '@/data/products';
import type { BlogPost } from '@/lib/blog';
import type { Product } from '@/types';

// Rough keyword signal per category, used to pick the most relevant
// "shop this" block for a blog post. Not exact NLP — just enough to avoid
// linking every post to the same category (fixes 0 internal links from
// blog -> money pages, see [[sesoris-seo-audit-2026-07-05]] root cause #3).
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'home-living': ['floating shelf', 'wall shelf', 'home organizer', 'decor', 'living room', 'storage bin', 'basket', 'display shelf', 'bedroom', 'home organization', 'declutter', 'closet'],
  'kitchen-dining': ['kitchen', 'dish rack', 'food storage', 'food container', 'pantry', 'cutting board', 'spice', 'dining table', 'dining', 'glass container'],
  'tools-gadgets': ['multi-tool', 'kitchen gadget', 'practical tools', 'diy', 'home repair', 'cable management', 'screwdriver'],
  'gift-sets': ['gift', 'gift set', 'wedding gift', 'housewarming', 'corporate gift', 'parcel'],
  'personal-care': ['self-care', 'self care', 'skincare', 'aromatherapy', 'diffuser', 'wellness', 'bathroom organizer', 'facial roller', 'gua sha'],
  'tech-accessories': ['earbuds', 'wireless charging', 'charging station', 'cable organizer', 'smart home', 'power bank', 'headphone'],
  'bags-pouches': ['bag', 'pouch', 'toiletry bag', 'tote bag', 'packing cube', 'suitcase', 'mesh pouch'],
  'office-desk': ['desk', 'desk organizer', 'workspace', 'home office', 'desk lamp', 'wfh'],
  'outdoor-travel': ['travel organizer', 'outdoor', 'vacation', 'trip', 'hiking', 'camping', 'day trip', 'travel gear'],
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
