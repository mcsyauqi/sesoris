'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import { bundles } from '@/data/bundles';
import { products } from '@/data/products';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { shippingFor } from '@/lib/checkout';
import { applyCoupon } from '@/lib/apply-coupon';

const CartUpsell = dynamic(
  () => import('@/components/cart/CartUpsell').then((mod) => mod.CartUpsell),
  { ssr: false }
);

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount, coupon, setCoupon } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [applying, setApplying] = useState(false);

  const subtotal = getSubtotal();
  const shipping = shippingFor(subtotal);
  const discount = coupon?.discount ?? 0;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;

  const onApply = async () => {
    setPromoError('');
    setApplying(true);
    try {
      setCoupon(await applyCoupon(items, promoCode));
    } catch (e) {
      setCoupon(null);
      setPromoError((e as Error).message);
    } finally {
      setApplying(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        {/* Breadcrumb */}
        <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
                <Home style={{ width: '14px', height: '14px' }} />
              </Link>
              <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
              <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Cart</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <ShoppingBag style={{ width: '32px', height: '32px', color: 'var(--ink-muted)' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
            Your cart is empty
          </h1>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '24px' }}>
            You have not added any products yet.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Cart ({getItemCount()} items)</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)', marginBottom: '32px' }}>
          Shopping Cart
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
          {/* Cart Items */}
          <div>
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '20px',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: 'var(--surface-2)' }}>
                  <Image src={item.product.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(item.product)} fill style={{ objectFit: 'cover' }} />
                </div>

                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px', display: 'block' }}
                  >
                    {item.product.name}
                  </Link>
                  <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                    {formatPrice(item.product.price)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus style={{ width: '14px', height: '14px' }} />
                      </button>
                      <span style={{ width: '40px', textAlign: 'center', fontWeight: 500 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                        style={{
                          width: '36px',
                          height: '36px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--danger)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      <Trash2 style={{ width: '14px', height: '14px' }} />
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
            {/* Bundle Upsell */}
            <div style={{ marginTop: '24px' }}>
              <CartUpsell
                cartProductIds={items.map((i) => i.product.id)}
                allBundles={bundles}
                allProducts={products}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              background: 'var(--surface-2)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Tag style={{ width: '16px', height: '16px', color: 'var(--ink-muted)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Promo Code</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={onApply}
                    disabled={applying || !promoCode.trim()}
                    style={{
                      padding: '10px 16px',
                      background: 'var(--ink)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {applying ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {promoError && <p role="alert" style={{ color: '#842029', fontSize: '13px', marginTop: '8px' }}>{promoError}</p>}
                {coupon && <p style={{ color: 'var(--success)', fontSize: '13px', marginTop: '8px' }}>Code {coupon.code} applied.</p>}
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Subtotal</span>
                  <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Discount</span>
                    <span style={{ fontWeight: 500, color: 'var(--success)' }}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Shipping</span>
                  <span style={{ fontWeight: 500, color: shipping === 0 ? 'var(--success)' : 'var(--ink)' }}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 50 && (
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--brand)',
                    background: 'var(--brand-tint)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                  }}>
                    Add {formatPrice(50 - subtotal)} more for free shipping!
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--line)',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  marginTop: '24px',
                }}
              >
                Proceed to Checkout
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>

              <Link
                href="/shop"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'var(--brand)',
                  fontSize: '14px',
                  marginTop: '16px',
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
