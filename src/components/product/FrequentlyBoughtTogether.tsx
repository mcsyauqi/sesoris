'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Plus, Tag, Check } from 'lucide-react';
import type { Bundle, Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

interface FrequentlyBoughtTogetherProps {
  currentProductId: string;
  allProducts: Product[];
  bundles: Bundle[];
}

export function FrequentlyBoughtTogether({ currentProductId, allProducts, bundles }: FrequentlyBoughtTogetherProps) {
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);
  const addToCart = useCartStore((s) => s.addItem);

  // Find bundles that contain this product
  const relevantBundles = bundles.filter((b) => b.productIds.includes(currentProductId));
  if (relevantBundles.length === 0) return null;

  const handleAddBundle = (bundle: Bundle) => {
    const products = bundle.productIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    products.forEach((p) => addToCart(p));
    setAddedBundleId(bundle.id);
    setTimeout(() => setAddedBundleId(null), 2500);
  };

  return (
    <div style={{ marginTop: '48px' }}>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: '#212529',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Tag style={{ width: '22px', height: '22px', color: '#1B5E3B' }} />
        Frequently Bought Together
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {relevantBundles.map((bundle) => {
          const bundleProducts = bundle.productIds
            .map((id) => allProducts.find((p) => p.id === id))
            .filter(Boolean) as Product[];
          const isAdded = addedBundleId === bundle.id;

          return (
            <div
              key={bundle.id}
              style={{
                border: '2px solid #E8F5E9',
                borderRadius: '16px',
                padding: '24px',
                background: 'linear-gradient(135deg, #F1F8F4 0%, #FFFFFF 100%)',
              }}
            >
              {/* Bundle badge + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                {bundle.badge && (
                  <span style={{
                    background: '#1B5E3B',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}>
                    {bundle.badge}
                  </span>
                )}
                <Link
                  href={`/bundles/${bundle.slug}`}
                  style={{ fontSize: '16px', fontWeight: 700, color: '#1B5E3B', textDecoration: 'none' }}
                >
                  {bundle.name}
                </Link>
              </div>

              {/* Products row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {bundleProducts.map((product, index) => (
                  <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {index > 0 && (
                      <Plus style={{ width: '16px', height: '16px', color: '#6C757D', flexShrink: 0 }} />
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'white',
                      border: product.id === currentProductId ? '2px solid #1B5E3B' : '1px solid #E9ECEF',
                      borderRadius: '10px',
                      padding: '8px 12px',
                    }}>
                      <div style={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0 }}>
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover', borderRadius: '6px' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#212529', maxWidth: '120px', lineHeight: '1.3' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#1B5E3B', fontWeight: 600 }}>
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#212529' }}>
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                    <span style={{ fontSize: '14px', color: '#ADB5BD', textDecoration: 'line-through' }}>
                      {formatPrice(bundle.originalPrice)}
                    </span>
                    <span style={{
                      background: '#FF6B35',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '20px',
                    }}>
                      -{bundle.discountPercent}%
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#28A745', fontWeight: 600, marginTop: '2px' }}>
                    You save {formatPrice(bundle.originalPrice - bundle.bundlePrice)}!
                  </div>
                </div>

                <button
                  onClick={() => handleAddBundle(bundle)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: isAdded ? '#28A745' : '#1B5E3B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isAdded ? (
                    <>
                      <Check style={{ width: '16px', height: '16px' }} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart style={{ width: '16px', height: '16px' }} />
                      Add Bundle to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
