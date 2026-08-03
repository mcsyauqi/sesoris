import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Sesoris New Arrivals | Home Organizers 2026',
  description: 'Browse the latest Sesoris collection: home organizers, kitchen storage, and practical home living accessories for 2026.',
  alternates: selfReferencingAlternates('/new-arrivals'),
  openGraph: {
    title: 'Sesoris New Arrivals | Home Organizers 2026 | Sesoris',
    description: 'Browse the latest Sesoris collection: home organizers, kitchen storage, and practical home living accessories for 2026.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function NewArrivalsPage() {
  const newProducts = products.filter(p => p.isNew);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>New Arrivals</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            background: '#E8F5E9',
            color: '#1B5E3B',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px',
          }}>
            Latest Collection
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            New Arrivals
          </h1>
          <p style={{ color: '#5F6873', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Discover our latest collection with modern designs and premium quality
          </p>
        </div>

        <div className="product-grid-4" style={{ display: 'grid', gap: '24px' }}>
          {newProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ aspectRatio: '1', position: 'relative', background: '#F8F9FA' }}>
                <Image src={product.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(product)} fill style={{ objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#1B5E3B',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  New
                </span>
                <button
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Heart style={{ width: '18px', height: '18px', color: '#5F6873' }} />
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '13px', color: '#5F6873', marginBottom: '4px' }}>
                  {product.category.name}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '8px', display: 'block' }}
                >
                  {product.name}
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <Star style={{ width: '14px', height: '14px', fill: '#FFC107', color: '#FFC107' }} />
                  <span style={{ fontSize: '13px', color: '#5F6873' }}>{product.rating} ({product.reviewCount})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B5E3B' }}>
                    {formatPrice(product.price)}
                  </span>
                  <button
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#1B5E3B',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShoppingCart style={{ width: '16px', height: '16px', color: 'white' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {newProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#5F6873' }}>No new products available at the moment.</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
            Fresh Arrivals at Sesoris
          </h2>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            We regularly update our collection with the latest home organization products, storage solutions, and lifestyle accessories. Our new arrivals feature innovative designs selected to meet the evolving needs of modern Indonesian homes.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            Whether you are looking for space-saving furniture, smart kitchen organizers, or stylish desk accessories, our newest products bring fresh solutions to everyday challenges. Each new arrival is carefully vetted for quality, durability, and design before joining the Sesoris collection.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '24px' }}>
            Be the first to discover the latest home living products. New items are added weekly, so bookmark this page and check back regularly to find the freshest additions to our catalog.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/best-sellers" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Best Sellers
            </Link>
            <Link href="/on-sale" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              On Sale
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
