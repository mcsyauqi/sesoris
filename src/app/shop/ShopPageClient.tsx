'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'Under $15', min: 0, max: 15 },
  { label: '$15 - $30', min: 15, max: 30 },
  { label: '$30 - $50', min: 30, max: 50 },
  { label: 'Over $50', min: 50, max: Infinity },
];

export default function ShopPageClient({ search = '' }: { search?: string }) {
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (terms.length > 0) {
      const haystack = `${p.name} ${p.description} ${p.category.name}`.toLowerCase();
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category.slug)) return false;
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      if (p.price < range.min || p.price >= range.max) return false;
    }
    if (inStockOnly && !p.inStock) return false;
    if (onSaleOnly && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return Number(b.isNew ?? false) - Number(a.isNew ?? false);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false);
    }
  });

  const toggleKategori = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const FilterContent = () => (
    <>
      {/* Categories */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Categories</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categories.map((cat) => (
            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleKategori(cat.slug)}
                style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }}
              />
              <span style={{ fontSize: '14px', color: '#343A40' }}>{cat.name}</span>
              <span style={{ fontSize: '12px', color: '#5F6873', marginLeft: 'auto' }}>({cat.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Price Range</div>
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
        <div style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Availability</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly((v) => !v)}
              style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }}
            />
            <span style={{ fontSize: '14px', color: '#343A40' }}>In Stock</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={() => setOnSaleOnly((v) => !v)}
              style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }}
            />
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
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
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
              All Sesoris Products
            </h1>
            <p style={{ color: '#5F6873', fontSize: '14px' }}>
              {search ? <>Showing {filteredProducts.length} results for &quot;{search}&quot; · <Link href="/shop" style={{ color: '#1B5E3B' }}>Clear search</Link></> : <>Showing {filteredProducts.length} products</>}
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
              aria-label="Sort products by"
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
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 2} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Descriptions, SEO section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0', marginTop: '24px' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 400,
            color: '#212529',
            marginBottom: '8px',
          }}>
            Shop by Category
          </h2>
          <p style={{ color: '#5F6873', fontSize: '15px', marginBottom: '32px', maxWidth: '640px' }}>
            Browse our curated collection of home organizers, kitchen essentials, handy tools, and lifestyle picks designed to make any home tidier and more comfortable.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Home &amp; Decor
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Stackable storage bins and corner shower caddies that put unused corners and shelves to work.
              </p>
              <Link href="/category/home-living" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Home &amp; Decor →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Kitchen &amp; Dining
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Pull-out cabinet organizers, an over-the-door pantry rack, and a bamboo bread box that make deep cabinets and pantry doors easy to use.
              </p>
              <Link href="/category/kitchen-dining" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Kitchen &amp; Dining →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Bags &amp; Pouches
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Travel makeup bags and an aluminum makeup train case with a mirror, sized to keep cosmetics and small essentials sorted at home or on the road.
              </p>
              <Link href="/category/bags-pouches" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Bags &amp; Pouches →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Travel &amp; Outdoor
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Packing cubes that split a suitcase into clear sections, so clothes stay folded and easy to find.
              </p>
              <Link href="/category/outdoor-travel" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Travel &amp; Outdoor →
              </Link>
            </div>
          </div>
          <div style={{ marginTop: '32px', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #E9ECEF' }}>
            <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: '#212529' }}>About Sesoris Shop:</strong> Sesoris curates quality organizer and lifestyle products to help any home feel tidier, brighter, and more comfortable. If you are comparing shelves for the kitchen, bedroom, or living room, browse our full catalog by category above.
            </p>
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
          <div style={{ fontWeight: 600, fontSize: '16px' }}>Filter</div>
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
