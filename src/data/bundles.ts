import type { Bundle } from '@/types';

// ponytail: the old bundles referenced fictional products; rebuild from real CJ items if bundles earn their keep.
export const bundles: Bundle[] = [];

export function getBundleBySlug(slug: string): Bundle | null {
  return bundles.find((b) => b.slug === slug) ?? null;
}

export function getBundlesForProduct(productId: string): Bundle[] {
  return bundles.filter((b) => b.productIds.includes(productId));
}
