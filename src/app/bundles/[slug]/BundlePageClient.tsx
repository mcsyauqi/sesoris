'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ShoppingCart, Check, Tag, Package, Truck, Shield, RefreshCw, Plus } from 'lucide-react';
import type { Bundle, Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { getProductImageAlt } from '@/lib/product-image-alt';

interface BundlePageClientProps {
  bundle: Bundle;
  bundleProducts: Product[];
  allProducts: Product[];
}

export default function BundlePageClient({ bundle, bundleProducts }: BundlePageClientProps) {
  const [added, setAdded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(bundle.productIds.map((id) => [id, true]))
  );
  const addToCart = useCartStore((s) => s.addItem);

  const selectedProducts = bundleProducts.filter((p) => selectedItems[p.id]);
  const selectedTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const allSelected = bundle.productIds.every((id) => selectedItems[id]);
  const savings = allSelected ? bundle.originalPrice - bundle.bundlePrice : 0;
  const displayPrice = allSelected ? bundle.bundlePrice : selectedTotal;

  const handleAddToCart = () => {
    selectedProducts.forEach((p) => addToCart(p));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', flexWrap: 'wrap' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <Link href="/bundles" style={{ color: 'var(--ink-muted)' }}>Bundle Deals</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{bundle.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>

          {/* Left: products list */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              {bundle.badge && (
                <span style={{
                  background: 'var(--brand)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {bundle.badge}
                </span>
              )}
              <span style={{
                background: '#FFF3EE',
                color: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '20px',
              }}>
                -{bundle.discountPercent}% Bundle Discount
              </span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
              {bundle.name}
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--ink-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
              {bundle.description}
            </p>

            {/* Products in bundle */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
              What's Included ({bundle.productIds.length} items)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {bundleProducts.map((product, index) => (
                <div key={product.id}>
                  {index > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                      <Plus style={{ width: '20px', height: '20px', color: 'var(--ink-faint)' }} />
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      border: selectedItems[product.id] ? '2px solid var(--brand)' : '2px solid var(--line)',
                      borderRadius: '12px',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s',
                    }}
                    onClick={() => setSelectedItems((prev) => ({ ...prev, [product.id]: !prev[product.id] }))}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: '2px solid',
                      borderColor: selectedItems[product.id] ? 'var(--brand)' : 'var(--line-strong)',
                      background: selectedItems[product.id] ? 'var(--brand)' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      {selectedItems[product.id] && <Check style={{ width: '13px', height: '13px', color: 'white' }} />}
                    </div>

                    {/* Product image */}
                    <div style={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0 }}>
                      <Image
                        src={product.images[0].url}
                        alt={getProductImageAlt(product)}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>

                    {/* Product info */}
                    <div style={{ flex: 1 }}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}
                      >
                        {product.name}
                      </Link>
                      <p style={{ fontSize: '13px', color: 'var(--ink-muted)', margin: 0, lineHeight: '1.4' }}>
                        {product.description.substring(0, 80)}...
                      </p>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>
                        {formatPrice(product.price)}
                      </div>
                      {product.compareAtPrice && (
                        <div style={{ fontSize: '12px', color: 'var(--ink-faint)', textDecoration: 'line-through' }}>
                          {formatPrice(product.compareAtPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle highlights */}
            {bundle.highlights && (
              <div style={{
                background: 'var(--brand-tint)',
                border: '1px solid #C8E6C9',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--brand)', marginBottom: '12px', fontSize: '15px' }}>
                  Why this bundle?
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bundle.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                      <Check style={{ width: '16px', height: '16px', color: 'var(--brand)', flexShrink: 0, marginTop: '1px' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: sticky order summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '24px',
              background: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: '16px' }}>
                Order Summary
              </div>

              {/* Per-item prices */}
              {bundleProducts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: selectedItems[p.id] ? 'var(--ink-2)' : 'var(--ink-faint)',
                    marginBottom: '8px',
                    textDecoration: selectedItems[p.id] ? 'none' : 'line-through',
                  }}
                >
                  <span>{p.name}</span>
                  <span>{formatPrice(p.price)}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--line)', margin: '12px 0', paddingTop: '12px' }}>
                {allSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--success)', fontWeight: 600, marginBottom: '8px' }}>
                    <span>Bundle Discount ({bundle.discountPercent}%)</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px', color: 'var(--ink)' }}>
                  <span>Total</span>
                  <span>{formatPrice(displayPrice)}</span>
                </div>
              </div>

              {allSelected && (
                <div style={{
                  background: 'var(--brand-tint)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: 'var(--brand)',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginBottom: '16px',
                }}>
                  You save {formatPrice(savings)} with this bundle!
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={selectedProducts.length === 0}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: added ? 'var(--success)' : selectedProducts.length === 0 ? 'var(--ink-faint)' : 'var(--brand)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: selectedProducts.length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {added ? (
                  <><Check style={{ width: '18px', height: '18px' }} /> Added to Cart!</>
                ) : (
                  <><ShoppingCart style={{ width: '18px', height: '18px' }} /> Add to Cart</>
                )}
              </button>

              {/* Trust signals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0F0F0' }}>
                {[
                  { icon: Truck, text: 'Free shipping over $50' },
                  { icon: Shield, text: '1-year warranty on all items' },
                  { icon: RefreshCw, text: '30-day easy returns' },
                  { icon: Package, text: 'Secure bundled packaging' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--ink-muted)' }}>
                    <Icon style={{ width: '14px', height: '14px', color: 'var(--brand)' }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/bundles"
              style={{ display: 'block', textAlign: 'center', color: 'var(--brand)', fontSize: '14px', marginTop: '16px', textDecoration: 'none' }}
            >
              ← View all bundle deals
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
