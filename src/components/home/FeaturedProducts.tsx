'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts, getNewArrivals, products } from '@/data/products';

const tabs = [
  { id: 'popular', label: 'Popular', getData: getFeaturedProducts },
  { id: 'new', label: 'New Arrivals', getData: getNewArrivals },
  { id: 'best', label: 'Best Sellers', getData: () => products.slice(0, 6) },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('popular');
  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const productList = currentTab.getData();

  return (
    <section style={{ padding: '80px 0', background: '#F8F9FA' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>
              Popular This Week
            </h2>
            <p style={{ color: '#6C757D' }}>Discover what everyone is loving right now</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  border: 'none',
                  background: activeTab === tab.id ? '#1B5E3B' : 'white',
                  color: activeTab === tab.id ? 'white' : '#343A40',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {productList.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/shop"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            View All Products
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
