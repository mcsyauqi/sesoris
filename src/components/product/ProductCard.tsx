'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Check } from 'lucide-react';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { shortDimensions } from '@/lib/product-dims';
import type { Product } from '@/types';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(product.id);
  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = onSale ? calculateDiscount(product.compareAtPrice!, product.price) : 0;
  const dims = shortDimensions(product);
  const href = `/product/${product.slug}`;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <div className="pcard">
      <div className="pcard-media">
        <Link href={href} tabIndex={-1} aria-hidden>
          <Image
            src={product.images[0]?.url || ''}
            alt={getProductImageAlt(product)}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {(onSale || !product.inStock) && (
          <div className="pcard-badges">
            {onSale && <span className="badge is-sale">-{discount}%</span>}
            {!product.inStock && <span className="badge">Out of stock</span>}
          </div>
        )}

        <button
          className="pcard-wish"
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
        >
          <Heart />
        </button>

        {product.inStock && (
          <button
            className={`pcard-add${added ? ' is-added' : ''}`}
            onClick={() => { addToCart(product); setAdded(true); }}
            aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            {added ? <Check /> : <Plus />}
          </button>
        )}
      </div>

      <div className="pcard-body">
        <Link href={href} className="pcard-name">{product.name}</Link>
        {dims && <div className="pcard-dim">{dims}</div>}
        <div className="pcard-price">
          {formatPrice(product.price)}
          {onSale && <s>{formatPrice(product.compareAtPrice!)}</s>}
        </div>
      </div>
    </div>
  );
}
