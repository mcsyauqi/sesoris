'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
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
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <Image
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered && 'scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.quantity === 0 && <Badge variant="soldout">Sold Out</Badge>}
          </div>

          {/* Quick Actions */}
          <div
            className={cn(
              'absolute top-3 right-3 flex flex-col gap-2 transition-all duration-200',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            )}
          >
            <button
              onClick={handleToggleWishlist}
              className={cn(
                'p-2 rounded-full bg-white shadow-md transition-colors',
                isWishlisted
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-[#343A40] hover:bg-gray-50'
              )}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn('w-4 h-4', isWishlisted && 'fill-current')}
              />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div
            className={cn(
              'absolute bottom-3 left-3 right-3 transition-all duration-200',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
          >
            <Button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              fullWidth
              size="sm"
              className="shadow-lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-[#212529] group-hover:text-[#1B5E3B] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <Rating
          value={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1B5E3B]">
            {formatPrice(product.price)}
          </span>
          {isOnSale && (
            <span className="text-sm text-[#6C757D] line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
