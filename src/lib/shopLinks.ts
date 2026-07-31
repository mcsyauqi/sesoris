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

export function getShopLinksForPost(
  post: BlogPost,
  productCount = 2,
  secondaryCount = 2,
): {
  categorySlug: string;
  categoryName: string;
  products: Product[];
  secondaryCategories: { slug: string; name: string }[];
} {
  const haystack = `${post.title} ${post.excerpt} ${post.content.join(' ')}`.toLowerCase();

  const allSlugs = Object.keys(CATEGORY_KEYWORDS);
  const scored = allSlugs.map((slug) => ({
    slug,
    score: CATEGORY_KEYWORDS[slug].reduce((acc, kw) => acc + (haystack.includes(kw) ? 1 : 0), 0),
  }));

  let bestSlug = '';
  let bestScore = 0;
  for (const entry of scored) {
    if (entry.score > bestScore) {
      bestScore = entry.score;
      bestSlug = entry.slug;
    }
  }

  if (!bestSlug) {
    bestSlug = allSlugs[slugSeed(post.slug) % allSlugs.length];
  }

  // Every article links to more than one money page.
  //
  // The 2026-07-31 indexation review found inbound internal links, not word
  // count, tracking with whether a URL was indexed at all: 29.0 average
  // inbound links for URLs Google had not indexed versus 57.9 for indexed
  // ones. Linking only the single best-matching category left category pages
  // starved. Secondary links are the next-best scoring categories, falling
  // back to a slug-seeded rotation so posts that match nothing still spread
  // link equity instead of all pointing at the same page.
  const seed = slugSeed(post.slug);
  const secondaryPool = scored
    .filter((entry) => entry.slug !== bestSlug)
    .sort((a, b) => (b.score - a.score) || ((slugSeed(a.slug) + seed) % 97) - ((slugSeed(b.slug) + seed) % 97));

  const secondaryCategories = secondaryPool.slice(0, Math.max(0, secondaryCount)).map((entry) => {
    const cat = categories.find((c) => c.slug === entry.slug);
    return { slug: entry.slug, name: cat?.name ?? entry.slug };
  });

  const category = categories.find((c) => c.slug === bestSlug);
  const products = getProductsByCategory(bestSlug).slice(0, productCount);

  return {
    categorySlug: bestSlug,
    categoryName: category?.name ?? bestSlug,
    products,
    secondaryCategories,
  };
}
