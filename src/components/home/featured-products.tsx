'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/product-grid';
import { getFeaturedProducts, getNewArrivals, getBestSellers } from '@/data/products';

const tabs = [
  { id: 'popular', label: 'Popular', getData: getFeaturedProducts },
  { id: 'new', label: 'New Arrivals', getData: getNewArrivals },
  { id: 'best', label: 'Best Sellers', getData: getBestSellers },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('popular');
  const activeTabData = tabs.find((t) => t.id === activeTab);
  const products = activeTabData ? activeTabData.getData() : [];

  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#212529] mb-2">
              Popular This Week
            </h2>
            <p className="text-[#6C757D]">
              Discover what everyone is loving right now
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'bg-[#1B5E3B] text-white'
                    : 'bg-white text-[#343A40] hover:bg-[#E8F5E9]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={products.slice(0, 8)} />

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
