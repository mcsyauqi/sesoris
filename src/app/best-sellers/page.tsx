import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Sesoris Best Sellers | Top-Rated Home Organizers',
  description: 'Shop Sesoris best sellers, our top picks in storage racks, kitchen organizers, and desk organizers.',
  alternates: selfReferencingAlternates('/best-sellers'),
  openGraph: {
    title: 'Sesoris Best Sellers | Top-Rated Home Organizers | Sesoris',
    description: 'Shop Sesoris best sellers, our top picks in storage racks, kitchen organizers, and desk organizers.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function BestSellersPage() {
  const bestSellers = products.filter(p => p.isFeatured);

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
            <span style={{ color: '#212529', fontWeight: 500 }}>Best Sellers</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFF3CD',
            color: '#856404',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px',
          }}>
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            Most Popular
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Best Sellers
          </h1>
          <p style={{ color: '#5F6873', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Our top picks for an organized home
          </p>
        </div>

        <div className="product-grid-4" style={{ display: 'grid', gap: '24px' }}>
          {bestSellers.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}
        </div>

        {bestSellers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#5F6873' }}>No best-selling products available at the moment.</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
            Why Shop Our Best Sellers?
          </h2>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            These are the pieces we recommend first: practical storage racks, kitchen organizers, and desk organizers chosen for everyday function and durable materials.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            At Sesoris, we curate our best sellers from categories including home organization, kitchen storage, desk accessories, and lifestyle products. Whether you are looking to declutter your home, organize your kitchen, or find the perfect gift, our top-rated products deliver exceptional value.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '24px' }}>
            All best-selling products come with our quality guarantee, free shipping on orders over $50, and a 30-day return policy. Shop with confidence knowing that what others love, you will love too.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Shop All Products
            </Link>
            <Link href="/new-arrivals" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              New Arrivals
            </Link>
            <Link href="/on-sale" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              On Sale
            </Link>
            <Link href="/category/home-living" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Home & Decor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
