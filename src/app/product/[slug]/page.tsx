'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, Heart, Minus, Plus, ShoppingCart, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductBySlug, products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) notFound();

  const wishlisted = isInWishlist(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

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
            <Link href="/shop" style={{ color: '#6C757D' }}>Shop</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px'
        }}>
          {/* Image Gallery */}
          <div>
            <div style={{
              aspectRatio: '1',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: '#F8F9FA'
            }}>
              <Image
                src={product.images[0]?.url || ''}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{
                      width: '18px',
                      height: '18px',
                      fill: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF',
                      color: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#1B5E3B' }}>
                {formatPrice(product.price)}
              </span>
              {onSale && (
                <span style={{ fontSize: '20px', color: '#6C757D', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            <p style={{ color: '#6C757D', lineHeight: 1.7, marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Quantity */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#212529' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #E9ECEF',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus style={{ width: '16px', height: '16px' }} />
                  </button>
                  <span style={{ width: '48px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  background: '#1B5E3B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <ShoppingCart style={{ width: '20px', height: '20px' }} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleItem(product)}
                style={{
                  width: '56px',
                  height: '56px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '10px',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart style={{
                  width: '22px',
                  height: '22px',
                  color: wishlisted ? '#DC3545' : '#6C757D',
                  fill: wishlisted ? '#DC3545' : 'none'
                }} />
              </button>
            </div>

            {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              padding: '20px',
              background: '#F8F9FA',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Free Shipping</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>Orders $50+</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RefreshCw style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Easy Returns</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>30 Days</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>Secure</div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>100% Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
