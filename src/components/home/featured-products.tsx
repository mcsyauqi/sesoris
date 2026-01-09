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
    <section style={{ padding: '80px 0', background: '#F8F9FA' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              color: '#212529',
              marginBottom: '8px'
            }}>
              Popular This Week
            </h2>
            <p style={{ color: '#6C757D' }}>
              Discover what everyone is loving right now
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === tab.id ? '#1B5E3B' : 'white',
                  color: activeTab === tab.id ? 'white' : '#343A40'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={products.slice(0, 8)} />

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All Products
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
