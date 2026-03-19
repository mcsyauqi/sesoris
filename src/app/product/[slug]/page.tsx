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
  return <ProductPageClient product={product} />;
}
