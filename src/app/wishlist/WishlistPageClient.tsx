'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';

export default function WishlistPageClient() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
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
              <span style={{ color: '#212529', fontWeight: 500 }}>Wishlist</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#F8F9FA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <Heart style={{ width: '32px', height: '32px', color: '#6C757D' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
            Your wishlist is empty
          </h1>
          <p style={{ color: '#6C757D', marginBottom: '24px' }}>
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </>
    );
  }

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
            <span style={{ color: '#212529', fontWeight: 500 }}>Wishlist ({items.length} items)</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529' }}>
            My Wishlist
          </h1>
          <button
            onClick={clearWishlist}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#6C757D',
              background: 'none',
              border: '1px solid #E9ECEF',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            <Trash2 style={{ width: '14px', height: '14px' }} />
            Clear All
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ aspectRatio: '1', position: 'relative', background: '#F8F9FA' }}>
                <Image src={item.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(item)} fill style={{ objectFit: 'cover' }} />
                <button
                  onClick={() => removeItem(item.id)}
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
                  <Heart style={{ width: '18px', height: '18px', fill: '#DC3545', color: '#DC3545' }} />
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <Link
                  href={`/product/${item.slug}`}
                  style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '8px', display: 'block' }}
                >
                  {item.name}
                </Link>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#1B5E3B', marginBottom: '12px' }}>
                  {formatPrice(item.price)}
                </div>
                <button
                  onClick={() => addItem(item)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    background: '#1B5E3B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  <ShoppingCart style={{ width: '16px', height: '16px' }} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
