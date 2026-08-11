import type { Product } from '@/types';
import { toUsdPrice } from '@/lib/utils';

const SITE_URL = 'https://www.sesoris.com';

/**
 * Product prices are catalog prices rather than dated promotions. Keep the
 * validity window ahead of the build date so generated static JSON-LD does not
 * publish an already-expired offer. The CI gate checks the rendered value.
 */
export function getProductPriceValidUntil(referenceDate = new Date()): string {
  return `${referenceDate.getUTCFullYear() + 1}-12-31`;
}

export function buildProductSchema(product: Product): Record<string, unknown> {
  const price = toUsdPrice(product.price);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0]?.url,
    sku: `SES-${product.id.toString().padStart(4, '0')}`,
    brand: { '@type': 'Brand', name: 'Sesoris' },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      priceValidUntil: getProductPriceValidUntil(),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `${SITE_URL}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Sesoris' },
    },
  };
}
