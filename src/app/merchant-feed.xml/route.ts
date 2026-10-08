import { products } from '@/data/products';
import { merchantOverrides } from '@/data/merchant-feed';
import { shippingFor } from '@/lib/checkout';
import { productSku } from '@/lib/product-schema';
import { toUsdPrice } from '@/lib/utils';
import type { Product } from '@/types';

/**
 * Google Merchant Center product feed (RSS 2.0 + g: namespace), one item per
 * product in src/data/products.ts. Register https://www.sesoris.com/merchant-feed.xml
 * in Merchant Center as a scheduled-fetch data source (daily, target country US,
 * language English). Prices are USD because the storefront, checkout and shipping
 * are US-only (see CLAUDE.md "KEPUTUSAN PASAR"); a currency that differs from the
 * landing page is disapproved as a price mismatch.
 *
 * Regenerated at least once a day (ISR) and on every deploy, so price and
 * stock edits in products.ts reach the feed without a manual export.
 */
export const revalidate = 86400;

const BASE_URL = 'https://www.sesoris.com';
const BRAND = 'Sesoris';
const MAX_TITLE = 150;
const MAX_DESCRIPTION = 5000;
const MAX_HIGHLIGHT = 150;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function tag(name: string, value: string | undefined): string {
  return value ? `      <g:${name}>${escapeXml(value)}</g:${name}>` : '';
}

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

function money(amount: number): string {
  return `${amount.toFixed(2)} USD`;
}

function spec(product: Product, label: string): string | undefined {
  return product.specifications?.find((s) => s.label.toLowerCase() === label)?.value;
}

function mainImage(product: Product): string {
  const override = merchantOverrides[product.slug]?.image;
  if (typeof override === 'string') return override;
  if (typeof override === 'number' && product.images[override]) return product.images[override].url;
  return product.images[0].url;
}

function feedItem(product: Product): string {
  const price = toUsdPrice(product.price);
  const title = (merchantOverrides[product.slug]?.title ?? product.name).slice(0, MAX_TITLE);
  const description = (product.fullDescription ?? product.description).slice(0, MAX_DESCRIPTION);
  const main = mainImage(product);
  const additional = product.images
    .map((img) => img.url)
    .filter((url) => url !== main)
    .slice(0, 10);
  const highlights = (product.features ?? []).filter((f) => f.length <= MAX_HIGHLIGHT).slice(0, 10);

  const lines = [
    '    <item>',
    tag('id', productSku(product)),
    tag('title', title),
    tag('description', description),
    tag('link', `${BASE_URL}/product/${product.slug}`),
    tag('image_link', absolute(main)),
    ...additional.map((url) => tag('additional_image_link', absolute(url))),
    tag('availability', product.inStock ? 'in_stock' : 'out_of_stock'),
    tag('price', money(price)),
    tag('brand', BRAND),
    tag('condition', 'new'),
    // No GTIN exists for these products and Sesoris is not the manufacturer, so
    // there is no MPN either. identifier_exists=no is Google's documented value
    // for that case; never invent a GTIN or MPN to fill the field.
    tag('identifier_exists', 'no'),
    tag('product_type', product.category.name),
    tag('color', spec(product, 'color')),
    tag('material', spec(product, 'material')),
    ...highlights.map((h) => tag('product_highlight', h)),
    '      <g:shipping>',
    '        <g:country>US</g:country>',
    '        <g:service>Standard</g:service>',
    `        <g:price>${money(shippingFor(price))}</g:price>`,
    '      </g:shipping>',
    '    </item>',
  ];
  return lines.filter(Boolean).join('\n');
}

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Sesoris Products</title>
    <link>${BASE_URL}</link>
    <description>Home organization and storage products from Sesoris, shipped from a US warehouse.</description>
${products.map(feedItem).join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}
