import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, ShoppingCart, Percent } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
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
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
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
          {saleProducts.map((product) => {
            const discount = calculateDiscount(product.price, product.compareAtPrice!);
            return (
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
                  <Image src={product.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(product)} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#DC3545',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    -{discount}%
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
                    <Heart style={{ width: '18px', height: '18px', color: '#6C757D' }} />
                  </button>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '4px' }}>
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
                    <span style={{ fontSize: '13px', color: '#6C757D' }}>{product.rating} ({product.reviewCount})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#DC3545' }}>
                        {formatPrice(product.price)}
                      </span>
                      <span style={{ fontSize: '13px', color: '#6C757D', textDecoration: 'line-through', marginLeft: '8px' }}>
                        {formatPrice(product.compareAtPrice!)}
                      </span>
                    </div>
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
            );
          })}
        </div>

        {saleProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#6C757D' }}>No products on sale right now. Stay tuned for upcoming deals!</p>
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
            Sale items at Sesoris include home organizers, kitchen storage solutions, desk accessories, personal care products, and more. Discounts range from 10% to 50% off, making it the perfect time to stock up on household essentials or try products you have been eyeing.
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
