'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'Under Rp 200K', min: 0, max: 200000 },
  { label: 'Rp 200K - Rp 500K', min: 200000, max: 500000 },
  { label: 'Rp 500K - Rp 1M', min: 500000, max: 1000000 },
  { label: 'Over Rp 1M', min: 1000000, max: Infinity },
];

export default function ShopPageClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

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

  const FilterContent = () => (
    <>
      {/* Categories */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Category</h3>
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
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Price Range</h3>
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
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Availability</h3>
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
    </>
  );

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

      <div className="container section-padding">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(24px, 4vw, 28px)',
              fontWeight: 400,
              color: '#212529',
              marginBottom: '4px'
            }}>
              All Products
            </h1>
            <p style={{ color: '#6C757D', fontSize: '14px' }}>
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile filter toggle */}
            <button
              className="show-mobile"
              onClick={() => setFilterOpen(true)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #E9ECEF',
                background: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
              Filter
            </button>

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

            <div className="hide-mobile" style={{ border: '1px solid #E9ECEF', borderRadius: '8px', overflow: 'hidden' }}>
              <button style={{ padding: '8px', background: '#1B5E3B', color: 'white', border: 'none', cursor: 'pointer' }}>
                <Grid style={{ width: '18px', height: '18px' }} />
              </button>
              <button style={{ padding: '8px', background: 'white', border: 'none', cursor: 'pointer' }}>
                <List style={{ width: '18px', height: '18px', color: '#6C757D' }} />
              </button>
            </div>
          </div>
        </div>

        <div className="shop-layout">
          {/* Desktop Sidebar */}
          <aside className="hide-mobile">
            <FilterContent />
          </aside>

          {/* Products */}
          <div>
            <div className="grid-products">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`mobile-menu-overlay ${filterOpen ? 'active' : ''}`}
        onClick={() => setFilterOpen(false)}
      />
      <div className={`mobile-menu ${filterOpen ? 'active' : ''}`}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E9ECEF'
        }}>
          <h3 style={{ fontWeight: 600, fontSize: '16px' }}>Filter</h3>
          <button
            onClick={() => setFilterOpen(false)}
            style={{ padding: '8px', borderRadius: '8px', background: '#F8F9FA', border: 'none', cursor: 'pointer', display: 'flex' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          <FilterContent />
        </div>
      </div>
    </>
  );
}
