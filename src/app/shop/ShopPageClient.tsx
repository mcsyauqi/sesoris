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
      <div className="filter-group" role="group" aria-label="Category">
        <div className="filter-title" aria-hidden>Category</div>
        {categories.map((cat) => (
          <label key={cat.id} className="filter-option">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => toggleKategori(cat.slug)}
            />
            {cat.name}
            <small>{cat.productCount}</small>
          </label>
        ))}
      </div>

      <div className="filter-group" role="group" aria-label="Price">
        <div className="filter-title" aria-hidden>Price</div>
        <label className="filter-option">
          <input type="radio" name="price" checked={selectedPrice === null} onChange={() => setSelectedPrice(null)} />
          Any price
        </label>
        {priceRanges.map((range, i) => (
          <label key={range.label} className="filter-option">
            <input type="radio" name="price" checked={selectedPrice === i} onChange={() => setSelectedPrice(i)} />
            {range.label}
          </label>
        ))}
      </div>

      <div className="filter-group" role="group" aria-label="Availability">
        <div className="filter-title" aria-hidden>Availability</div>
        <label className="filter-option">
          <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} />
          In stock
        </label>
        <label className="filter-option">
          <input type="checkbox" checked={onSaleOnly} onChange={() => setOnSaleOnly((v) => !v)} />
          On sale
        </label>
      </div>
    </>
  );

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Shop</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: '40px 72px' }}>
        <div className="shop-toolbar">
          <div>
            <h1 className="section-title">All Sesoris Products</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '15px', marginTop: '6px' }}>
              {search ? <>{filteredProducts.length} results for &quot;{search}&quot; · <Link href="/shop" className="text-link" style={{ fontSize: 'inherit' }}>Clear search</Link></> : <>{filteredProducts.length} products, shipped from our US warehouse</>}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="filter-btn" onClick={() => setFilterOpen(true)} aria-expanded={filterOpen} aria-controls="shop-filters">
              <SlidersHorizontal aria-hidden />
              Filter
            </button>
            <label htmlFor="shop-sort" className="sr-only">Sort products by</label>
            <select id="shop-sort" className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          <aside className="shop-sidebar" aria-label="Filters">
            <FilterContent />
          </aside>

          <div>
            {sortedProducts.length > 0 ? (
              <div className="grid-products">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 2} />
                ))}
              </div>
            ) : (
              <div style={{ padding: '48px 24px', textAlign: 'center', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ fontWeight: 600, fontSize: '17px' }}>No products match these filters.</p>
                <p style={{ color: 'var(--ink-muted)', marginTop: '6px' }}>Try another price range or category, or <Link href="/shop" className="text-link" style={{ fontSize: 'inherit' }}>see all products</Link>.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Descriptions, SEO section */}
      <div style={{ background: 'var(--surface-2)', padding: '56px 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 1.3rem + 0.8vw, 2rem)', marginBottom: '8px' }}>
            Shop by Category
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: '15px', marginBottom: '32px', maxWidth: '640px' }}>
            Browse our curated collection of home organizers, kitchen essentials, handy tools, and lifestyle picks designed to make any home tidier and more comfortable.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 650, color: 'var(--ink)', marginBottom: '8px' }}>
                Home &amp; Decor
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                Stackable storage bins and corner shower caddies that put unused corners and shelves to work.
              </p>
              <Link href="/category/home-living" style={{ fontSize: '14px', color: 'var(--brand)', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Home &amp; Decor →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 650, color: 'var(--ink)', marginBottom: '8px' }}>
                Kitchen &amp; Dining
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                Pull-out cabinet organizers, an over-the-door pantry rack, and a bamboo bread box that make deep cabinets and pantry doors easy to use.
              </p>
              <Link href="/category/kitchen-dining" style={{ fontSize: '14px', color: 'var(--brand)', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Kitchen &amp; Dining →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 650, color: 'var(--ink)', marginBottom: '8px' }}>
                Bags &amp; Pouches
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                Travel makeup bags and an aluminum makeup train case with a mirror, sized to keep cosmetics and small essentials sorted at home or on the road.
              </p>
              <Link href="/category/bags-pouches" style={{ fontSize: '14px', color: 'var(--brand)', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Bags &amp; Pouches →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 650, color: 'var(--ink)', marginBottom: '8px' }}>
                Travel &amp; Outdoor
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                Packing cubes that split a suitcase into clear sections, so clothes stay folded and easy to find.
              </p>
              <Link href="/category/outdoor-travel" style={{ fontSize: '14px', color: 'var(--brand)', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Travel &amp; Outdoor →
              </Link>
            </div>
          </div>
          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>About Sesoris Shop:</strong> Sesoris curates quality organizer and lifestyle products to help any home feel tidier, brighter, and more comfortable. If you are comparing shelves for the kitchen, bedroom, or living room, browse our full catalog by category above.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`mobile-menu-overlay ${filterOpen ? 'active' : ''}`}
        onClick={() => setFilterOpen(false)}
      />
      <div id="shop-filters" className={`mobile-menu ${filterOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Filters">
        <div className="drawer-head">
          <div style={{ fontWeight: 650, fontSize: '17px' }}>Filter</div>
          <button className="icon-btn" onClick={() => setFilterOpen(false)} aria-label="Close filters">
            <X />
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          <FilterContent />
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '28px' }} onClick={() => setFilterOpen(false)}>
            Show {filteredProducts.length} products
          </button>
        </div>
      </div>
    </>
  );
}
