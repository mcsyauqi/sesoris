import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import ProductPageClient from './ProductPageClient';
import { toUsdPrice } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Sesoris`,
      description: product.description,
      images: [{ url: product.images[0].url, width: 600, height: 600, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Sesoris`,
      description: product.description,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0]?.url,
    sku: `SES-${product.id.toString().padStart(4, '0')}`,
    brand: { '@type': 'Brand', name: 'Sesoris' },
    offers: {
      '@type': 'Offer',
      price: toUsdPrice(product.price),
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://www.sesoris.com/product/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Sesoris' },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'ID',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'ID',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
  };

  // NOTE: No AggregateRating/Review structured data is emitted on purpose.
  // The review entries in src/data/products.ts are seeded placeholder data,
  // not real customer reviews. Publishing rating markup based on them risks
  // a Google product-review-spam penalty. When a real review system exists,
  // rating markup may be reintroduced from genuine, verifiable reviews only.
  //
  // Re-audited 2026-07-31 (Trello FB94dFWR asked for this markup to be added back).
  // The data does not support it, so it stays out. Measured against src/data/products.ts:
  //   - 23 products in the catalog, 11 review objects in total
  //   - those 23 products claim 413 reviews between them
  //   - 16 of 23 products have ZERO stored review objects
  //   - 17 of 23 have a reviewCount that does not match their stored reviews
  //   - e.g. `minimalist-wallet` claims rating 4.5 / reviewCount 42 with 0 stored reviews
  // The 11 review objects that do exist are seed data (Unsplash stock avatars, ids r1..r11),
  // and ProductReviewSection's submit handler only calls setSubmitted(true) - there is no
  // persistence, no API, no backend. There is no review system, only a review UI.
  //
  // Do not re-add aggregateRating until genuine, verifiable reviews exist, and then emit it
  // only for products that actually have them, computed from the data rather than hand-written.

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.sesoris.com/shop' },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://www.sesoris.com/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageClient product={product} />
    </>
  );
}
