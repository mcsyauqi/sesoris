import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBundleBySlug, bundles } from '@/data/bundles';
import { products } from '@/data/products';
import BundlePageClient from './BundlePageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return {};
  return {
    title: `${bundle.name}, Save ${bundle.discountPercent}% | Sesoris`,
    description: bundle.description,
    alternates: { canonical: `/bundles/${bundle.slug}` },
    openGraph: {
      title: `${bundle.name} | Sesoris Bundle Deal`,
      description: bundle.description,
      images: [{ url: bundle.image, width: 1200, height: 630 }],
    },
  };
}

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();

  const bundleProducts = bundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return <BundlePageClient bundle={bundle} bundleProducts={bundleProducts} allProducts={products} />;
}
