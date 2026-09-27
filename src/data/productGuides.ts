export interface ProductGuideFaq {
  question: string;
  answer: string;
}

export interface ProductGuide {
  /** Answer-first summary. First sentence must answer "what is this" outright. */
  overview: string;
  /** Who it suits, and just as importantly who it does not. */
  bestFor: string;
  /** Setup, first use, and the mistakes people make on day one. */
  howToUse: string;
  /** Cleaning, maintenance, and what shortens the product's life. */
  care: string;
  /** A real decision the buyer is weighing, with a custom heading. */
  compare: { heading: string; text: string };
  faqs: ProductGuideFaq[];
}

/**
 * Long-form product content, one hand-written entry per catalog product.
 *
 * Three rules govern this file:
 *
 * 1. No review content. The catalog's reviewCount values are seeded
 *    placeholders, and 16 of 23 products have zero stored reviews. Depth here
 *    comes from specifications, use, care, and comparison, never from
 *    fabricated customer opinion, and no aggregateRating or Review structured
 *    data is emitted anywhere on the product page.
 * 2. No shared paragraphs. Every entry is written against the individual
 *    product's own specifications. Repeating a block across 23 products would
 *    be duplicate content and would defeat the point.
 * 3. No unsourced statistics. Any number appearing here comes from the
 *    product's own specification list in src/data/products.ts or from the
 *    published shipping and returns policy, not from an outside claim.
 */
export const productGuides: Record<string, ProductGuide> = {};

export function getProductGuide(slug: string): ProductGuide | undefined {
  return productGuides[slug];
}
