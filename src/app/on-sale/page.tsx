import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Percent } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Sale',
  description: 'Shop Sesoris sale items. Great deals on quality home organizers, storage solutions, and accessories.',
  alternates: selfReferencingAlternates('/on-sale'),
  openGraph: {
    title: 'Sale | Sesoris',
    description: 'Shop Sesoris sale items. Great deals on quality home organizers, storage solutions, and accessories.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function OnSalePage() {
  const saleProducts = products.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);

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
            <span style={{ color: '#212529', fontWeight: 500 }}>On Sale</span>
          </div>
        </div>
      </div>

      {/* Sale Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #DC3545 0%, #C82333 100%)',
        padding: '40px 16px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <Percent style={{ width: '32px', height: '32px' }} />
            <h1 style={{ fontSize: '36px', fontWeight: 700, margin: 0 }}>
              SPECIAL SALE
            </h1>
          </div>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Up to 50% off on selected products!
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div className="product-grid-4" style={{ display: 'grid', gap: '24px' }}>
          {saleProducts.length === 0 && <p style={{ color: '#5F6873' }}>Nothing is on sale right now. <Link href="/shop" style={{ color: '#1B5E3B' }}>Browse all products</Link>.</p>}
          {saleProducts.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}
        </div>

        {saleProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#5F6873' }}>No products on sale right now. Stay tuned for upcoming deals!</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
            Smart Shopping: Sesoris Sale Guide
          </h2>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            Our sale section features carefully selected discounts on quality home organization products. Every product on sale maintains the same quality standards as our full-price items, you save money without compromising on performance or durability.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            When a Sesoris product goes on sale, it shows up here with its original and reduced price side by side.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '24px' }}>
            All sale purchases come with our standard 30-day return policy and free shipping on orders over $50. Sale items are available while stocks last, so shop early to secure your favorites.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/best-sellers" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Best Sellers
            </Link>
            <Link href="/new-arrivals" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              New Arrivals
            </Link>
            <Link href="/shop" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
