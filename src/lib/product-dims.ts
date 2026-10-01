import type { Product } from '@/types';

/** "14 x 21 x 2.5 in. (355.6 x ...), W x D x H" -> "14 × 21 × 2.5 in." (imperial part only). */
export function shortDimensions(product: Product): string | null {
  const spec = product.specifications?.find((s) => /^Dimensions\b/.test(s.label));
  if (!spec) return null;
  const imperial = spec.value.split(' (')[0].split(';')[0].trim();
  return /\bin\.$/.test(imperial) ? imperial.replace(/ x /g, ' × ') : null;
}
