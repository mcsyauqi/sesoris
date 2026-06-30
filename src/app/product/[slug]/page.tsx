import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAverageRating, getProductBySlug, getReviewsByProductId, products } from '@/data/products';
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

  const verifiedReviews = getReviewsByProductId(product.id).filter((review) => review.verified);
  const averageRating = getAverageRating(product.id) || product.rating;

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

  if (verifiedReviews.length > 0) {
    productSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(averageRating.toFixed(1)),
      reviewCount: verifiedReviews.length,
      bestRating: 5,
      worstRating: 1,
    };
    productSchema.review = verifiedReviews.slice(0, 3).map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.name },
      datePublished: review.date,
      name: review.title,
      reviewBody: review.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));
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
