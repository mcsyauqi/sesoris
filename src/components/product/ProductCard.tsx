'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale ? calculateDiscount(product.compareAtPrice!, product.price) : 0;

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} style={{ display: 'block' }}>
        <div style={{
          position: 'relative',
          aspectRatio: '1',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#F8F9FA',
          marginBottom: '12px'
        }}>
          <Image
            src={product.images[0]?.url || ''}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {onSale && (
              <span style={{
                padding: '4px 10px',
                background: '#DC3545',
                color: 'white',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '4px'
              }}>
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span style={{
                padding: '4px 10px',
                background: '#20C997',
                color: 'white',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '4px'
              }}>
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.preventDefault(); toggleItem(product); }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'white',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(8px)',
              transition: 'all 0.2s'
            }}
          >
            <Heart style={{
              width: '18px',
              height: '18px',
              color: wishlisted ? '#DC3545' : '#343A40',
              fill: wishlisted ? '#DC3545' : 'none'
            }} />
          </button>

          {/* Add to Cart */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.2s'
          }}>
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              style={{
                width: '100%',
                padding: '10px',
                background: '#1B5E3B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShoppingCart style={{ width: '16px', height: '16px' }} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <Link href={`/product/${product.slug}`}>
        <h3 style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#212529',
          marginBottom: '6px',
          lineHeight: 1.4
        }}>
          {product.name}
        </h3>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            style={{
              width: '12px',
              height: '12px',
              fill: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF',
              color: i < Math.floor(product.rating) ? '#FFC107' : '#E9ECEF'
            }}
          />
        ))}
        <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: '4px' }}>
          ({product.reviewCount})
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: '#1B5E3B' }}>
          {formatPrice(product.price)}
        </span>
        {onSale && (
          <span style={{ fontSize: '13px', color: '#6C757D', textDecoration: 'line-through' }}>
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>
    </div>
  );
}
