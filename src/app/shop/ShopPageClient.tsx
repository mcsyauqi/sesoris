'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'Di bawah Rp 240.000', min: 0, max: 15 },
  { label: 'Rp 240.000 - Rp 480.000', min: 15, max: 30 },
  { label: 'Rp 480.000 - Rp 800.000', min: 30, max: 50 },
  { label: 'Di atas Rp 800.000', min: 50, max: Infinity },
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

  const toggleKategori = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const FilterContent = () => (
    <>
      {/* Categories */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Kategori</h3>
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
              <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: 'auto' }}>({cat.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rentang Harga */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Rentang Harga</h3>
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

      {/* Ketersediaan */}
      <div>
        <h3 style={{ fontWeight: 600, color: '#212529', marginBottom: '16px', fontSize: '15px' }}>Ketersediaan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }} />
            <span style={{ fontSize: '14px', color: '#343A40' }}>Stok Tersedia</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#1B5E3B' }} />
            <span style={{ fontSize: '14px', color: '#343A40' }}>Sedang Promo</span>
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Belanja</span>
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
              Semua Produk Sesoris
            </h1>
            <p style={{ color: '#6C757D', fontSize: '14px' }}>
              Menampilkan {filteredProducts.length} produk
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
              <option value="featured">Rekomendasi</option>
              <option value="newest">Terbaru</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
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
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 2} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Descriptions, SEO section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0', marginTop: '24px' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 400,
            color: '#212529',
            marginBottom: '8px',
          }}>
            Belanja Berdasarkan Kategori
          </h2>
          <p style={{ color: '#6C757D', fontSize: '15px', marginBottom: '32px', maxWidth: '640px' }}>
            Jelajahi koleksi organizer rumah, perlengkapan dapur, alat praktis, dan produk gaya hidup yang dipilih untuk membuat rumah lebih rapi dan nyaman.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Rumah &amp; Dekorasi
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Transform any room with our Rumah &amp; Dekorasi collection, from floating shelves and wall organizers to decorative baskets and storage solutions. With 124 products, you&apos;ll find the perfect pieces to keep your home tidy and stylish.
              </p>
              <Link href="/category/home-living" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Rumah &amp; Dekorasi →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Dapur &amp; Makan
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Lengkapi dapur dengan rak piring, kontainer penyimpanan, talenan, dan perlengkapan makan pilihan untuk aktivitas masak yang lebih praktis.
              </p>
              <Link href="/category/kitchen-dining" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Belanja Dapur &amp; Makan →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Alat &amp; Gadget
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Discover innovative tools and everyday gadgets that solve real problems. From multi-tools to smart kitchen gadgets, our 67 Alat &amp; Gadget products are built for performance and convenience.
              </p>
              <Link href="/category/tools-gadgets" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Alat &amp; Gadget →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Paket Hadiah
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Find the perfect gift for any occasion. Our curated Paket Hadiah, 93 options, are thoughtfully packaged and ready to give. Ideal for birthdays, holidays, housewarmings, and celebrations.
              </p>
              <Link href="/category/gift-sets" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Paket Hadiah →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Perawatan Diri
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Elevate your self-care routine with our Perawatan Diri collection, aromatherapy diffusers, organizers, skincare tools, and wellness accessories. Choose from 78 quality products.
              </p>
              <Link href="/category/personal-care" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Perawatan Diri →
              </Link>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1B5E3B', marginBottom: '8px' }}>
                Aksesori Teknologi
              </h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6' }}>
                Stay connected and organized with our Aksesori Teknologi, wireless earbuds, charging stations, cable organizers, and smart home gadgets. Browse 54 products for the tech-savvy lifestyle.
              </p>
              <Link href="/category/tech-accessories" style={{ fontSize: '14px', color: '#1B5E3B', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
                Shop Aksesori Teknologi →
              </Link>
            </div>
          </div>
          <div style={{ marginTop: '32px', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #E9ECEF' }}>
            <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: '#212529' }}>Tentang Sesoris Shop:</strong> Sesoris mengkurasi produk organizer dan lifestyle berkualitas untuk membantu rumah terasa lebih rapi, indah, dan nyaman. Setiap produk dipilih berdasarkan fungsi, daya tahan, dan desain. Nikmati gratis ongkir untuk pesanan di atas Rp 800.000.
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
