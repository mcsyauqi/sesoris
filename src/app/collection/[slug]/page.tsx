'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductGrid } from '@/components/product/product-grid';
import { getFeaturedProducts, getNewArrivals, getBestSellers, getOnSaleProducts } from '@/data/products';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const collectionData: Record<string, { title: string; description: string; getData: () => ReturnType<typeof getFeaturedProducts> }> = {
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Check out our latest products, fresh additions to our catalog.',
    getData: getNewArrivals,
  },
  'best-sellers': {
    title: 'Best Sellers',
    description: 'Our most popular products loved by customers.',
    getData: getBestSellers,
  },
  'sale': {
    title: 'On Sale',
    description: 'Great deals on selected items. Limited time offers!',
    getData: getOnSaleProducts,
  },
  'popular': {
    title: 'Popular This Week',
    description: 'Trending products our customers love.',
    getData: getFeaturedProducts,
  },
};

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = use(params);
  const collection = collectionData[slug];

  if (!collection) {
    notFound();
  }

  const products = collection.getData();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Collections', href: '/collections' },
              { label: collection.title },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <section className="py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#212529] mb-3">
            {collection.title}
          </h1>
          <p className="text-lg text-[#6C757D] max-w-2xl">
            {collection.description}
          </p>
          <p className="text-sm text-[#6C757D] mt-2">
            {products.length} products
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="pb-16">
        <div className="container">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6C757D]">No products found in this collection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
