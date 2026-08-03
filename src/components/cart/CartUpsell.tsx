'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Tag, ArrowRight } from 'lucide-react';
import type { Bundle, Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { useCartStore } from '@/stores/cart-store';

interface CartUpsellProps {
  cartProductIds: string[];
  allBundles: Bundle[];
  allProducts: Product[];
}

export function CartUpsell({ cartProductIds, allBundles, allProducts }: CartUpsellProps) {
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);
  const addToCart = useCartStore((s) => s.addItem);

  // Find bundles where at least 1 item is in cart but not all
  const upsellBundles = allBundles
    .map((bundle) => {
      const inCart = bundle.productIds.filter((id) => cartProductIds.includes(id));
      const missing = bundle.productIds.filter((id) => !cartProductIds.includes(id));
      return { bundle, inCart, missing };
    })
    .filter(({ inCart, missing }) => inCart.length > 0 && missing.length > 0)
    .sort((a, b) => b.inCart.length - a.inCart.length) // most matching first
    .slice(0, 1); // show only best match

  if (upsellBundles.length === 0) return null;

  const { bundle, missing } = upsellBundles[0];
  const missingProducts = missing
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const addMissingCost = missingProducts.reduce((sum, p) => sum + p.price, 0);
  const isAdded = addedBundleId === bundle.id;

  const handleAddMissing = () => {
    missingProducts.forEach((p) => addToCart(p));
    setAddedBundleId(bundle.id);
    setTimeout(() => setAddedBundleId(null), 2500);
  };

  return (
    <div style={{
      border: '2px solid #FFF3CD',
      borderRadius: '16px',
      padding: '20px',
      background: 'linear-gradient(135deg, #FFFBF0 0%, #FFFFFF 100%)',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Tag style={{ width: '16px', height: '16px', color: '#FF6B35' }} />
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#FF6B35' }}>
          Complete {bundle.name} and save {bundle.discountPercent}%!
        </span>
      </div>

      <p style={{ fontSize: '13px', color: '#5F6873', marginBottom: '12px', lineHeight: '1.5' }}>
        You already have items from this bundle. Add the missing products to unlock the full bundle discount.
      </p>

      {/* Missing products */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {missingProducts.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              border: '1px solid #E9ECEF',
              borderRadius: '10px',
              padding: '8px 12px',
            }}
          >
            <div style={{ width: '36px', height: '36px', position: 'relative', flexShrink: 0 }}>
              <Image
                src={product.images[0].url}
                alt={getProductImageAlt(product)}
                fill
                sizes="36px"
                style={{ objectFit: 'cover', borderRadius: '6px' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#212529' }}>{product.name}</div>
              <div style={{ fontSize: '12px', color: '#1B5E3B' }}>{formatPrice(product.price)}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '13px', color: '#5F6873' }}>
          Add {missingProducts.length} more item{missingProducts.length > 1 ? 's' : ''} for{' '}
          <strong style={{ color: '#212529' }}>{formatPrice(addMissingCost)}</strong>
          {' '}and save <strong style={{ color: '#1E7E34' }}>{formatPrice(bundle.originalPrice - bundle.bundlePrice)}</strong> total
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link
            href={`/bundles/${bundle.slug}`}
            style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View bundle <ArrowRight style={{ width: '12px', height: '12px' }} />
          </Link>
          <button
            onClick={handleAddMissing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isAdded ? '#1E7E34' : '#1B5E3B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isAdded ? (
              <><Check style={{ width: '14px', height: '14px' }} /> Added!</>
            ) : (
              <><ShoppingCart style={{ width: '14px', height: '14px' }} /> Add Missing Items</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
