'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { toast } from '@/components/ui/toast';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = isOnSale
    ? calculateDiscount(product.compareAtPrice!, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!', {
      label: 'View Cart',
      onClick: openCart,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast.success(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!'
    );
  };

  return (
    <div
      style={{ position: 'relative' }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{
          position: 'relative',
          aspectRatio: '1',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#F1F3F5'
        }}>
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <Image
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              opacity: imageLoaded ? 1 : 0
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.quantity === 0 && <Badge variant="soldout">Sold Out</Badge>}
          </div>

          {/* Quick Actions */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'all 0.2s ease',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(8px)'
          }}>
            <button
              onClick={handleToggleWishlist}
              style={{
                padding: '8px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                border: 'none',
                cursor: 'pointer',
                color: isWishlisted ? '#DC3545' : '#343A40'
              }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                style={{
                  width: '16px',
                  height: '16px',
                  fill: isWishlisted ? 'currentColor' : 'none'
                }}
              />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            transition: 'all 0.2s ease',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)'
          }}>
            <Button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              fullWidth
              size="sm"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              <ShoppingCart style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div style={{ marginTop: '12px' }}>
        <Link href={`/product/${product.slug}`}>
          <h3 style={{
            fontWeight: 500,
            color: '#212529',
            marginBottom: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.name}
          </h3>
        </Link>

        <Rating
          value={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontWeight: 600, color: '#1B5E3B' }}>
            {formatPrice(product.price)}
          </span>
          {isOnSale && (
            <span style={{ fontSize: '14px', color: '#6C757D', textDecoration: 'line-through' }}>
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
