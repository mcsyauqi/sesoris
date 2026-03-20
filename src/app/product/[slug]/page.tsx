import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import ProductPageClient from './ProductPageClient';

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
      price: product.price,
      priceCurrency: 'IDR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://www.sesoris.com/product/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Sesoris' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
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

  // Add aggregateRating only if there are reviews
  if (product.rating > 0 && product.reviewCount > 0) {
    productSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

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
