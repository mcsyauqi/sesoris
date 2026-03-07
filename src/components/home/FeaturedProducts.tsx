'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts, getNewArrivals, products } from '@/data/products';

const tabs = [
  { id: 'popular', label: 'Populer', getData: getFeaturedProducts },
  { id: 'new', label: 'Terbaru', getData: getNewArrivals },
  { id: 'best', label: 'Terlaris', getData: () => products.slice(0, 6) },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('popular');
  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const productList = currentTab.getData();

  return (
    <section className="section-padding" style={{ background: '#F8F9FA' }}>
      <div className="container">
        <div className="featured-header">
          <div>
            <h2 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400,
              color: '#212529',
              marginBottom: '8px'
            }}>
              Populer Minggu Ini
            </h2>
            <p style={{ color: '#6C757D', fontSize: '15px' }}>Temukan produk favorit semua orang</p>
          </div>

          <div className="tab-pills">
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
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-products" style={{ marginBottom: '40px' }}>
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
            Lihat Semua Produk
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
