import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, ShoppingCart, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function BestSellersPage() {
  const bestSellers = products.filter(p => p.isFeatured);

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
            <span style={{ color: '#212529', fontWeight: 500 }}>Terlaris</span>
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
            Paling Populer
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Produk Terlaris
          </h1>
          <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Produk favorit pelanggan kami dengan rating dan ulasan terbaik
          </p>
        </div>

        <div className="product-grid-4" style={{ display: 'grid', gap: '24px' }}>
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                position: 'relative',
              }}
            >
              <div style={{ aspectRatio: '1', position: 'relative', background: '#F8F9FA' }}>
                <Image src={product.images[0]?.url || '/placeholder.jpg'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#FFC107',
                  color: '#212529',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  #{index + 1} Terlaris
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
                  <span style={{ fontSize: '13px', color: '#6C757D' }}>{product.rating} ({product.reviewCount} ulasan)</span>
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

        {bestSellers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#6C757D' }}>Belum ada produk terlaris saat ini.</p>
          </div>
        )}
      </div>
    </>
  );
}
