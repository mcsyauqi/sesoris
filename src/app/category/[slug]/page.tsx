'use client';

import { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductGrid } from '@/components/product/product-grid';
import { getCategoryBySlug, getProductsByCategory } from '@/data/products';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Shop', href: '/shop' },
              { label: category.name },
            ]}
          />
        </div>
      </div>

      {/* Category Header */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <Image
          src={category.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200'}
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/80 max-w-md">{category.description}</p>
            )}
            <p className="text-white/60 mt-2">{products.length} products</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container py-12">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <p className="text-[#6C757D]">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
