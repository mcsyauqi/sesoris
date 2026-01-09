'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Grid, List } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category.slug)) return false;
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      if (p.price < range.min || p.price >= range.max) return false;
    }
    return true;
  });

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Shop</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>
          All Products
        </h1>
        <p style={{ color: '#6C757D', marginBottom: '32px' }}>
          Showing {filteredProducts.length} products
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }}>
          {/* Sidebar */}
          <aside>
            {/* Categories */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px' }}>Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {categories.map((cat) => (
                  <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }}
                    />
                    <span style={{ fontSize: '14px', color: '#343A40' }}>{cat.name}</span>
                    <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: 'auto' }}>({cat.productCount})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px' }}>Price Range</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {priceRanges.map((range, i) => (
                  <label key={range.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === i}
                      onChange={() => setSelectedPrice(selectedPrice === i ? null : i)}
                      style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }}
                    />
                    <span style={{ fontSize: '14px', color: '#343A40' }}>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px' }}>Availability</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }} />
                  <span style={{ fontSize: '14px', color: '#343A40' }}>In Stock</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }} />
                  <span style={{ fontSize: '14px', color: '#343A40' }}>On Sale</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E9ECEF',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <div style={{ display: 'flex', border: '1px solid #E9ECEF', borderRadius: '8px', overflow: 'hidden' }}>
                <button style={{ padding: '8px', background: '#1B5E3B', color: 'white', border: 'none' }}>
                  <Grid style={{ width: '18px', height: '18px' }} />
                </button>
                <button style={{ padding: '8px', background: 'white', border: 'none' }}>
                  <List style={{ width: '18px', height: '18px', color: '#6C757D' }} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px'
            }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
