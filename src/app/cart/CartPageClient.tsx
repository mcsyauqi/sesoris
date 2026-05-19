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

const CartUpsell = dynamic(
  () => import('@/components/cart/CartUpsell').then((mod) => mod.CartUpsell),
  { ssr: false }
);

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

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
              <span style={{ color: '#212529', fontWeight: 500 }}>Cart</span>
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
            <ShoppingBag style={{ width: '32px', height: '32px', color: '#6C757D' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
            Your cart is empty
          </h1>
          <p style={{ color: '#6C757D', marginBottom: '24px' }}>
            Looks like you haven&apos;t added any items to your cart yet.
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
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Cart ({getItemCount()} items)</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '32px' }}>
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
                  borderBottom: '1px solid #E9ECEF',
                }}
              >
                <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#F8F9FA' }}>
                  <Image src={item.product.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(item.product)} fill style={{ objectFit: 'cover' }} />
                </div>

                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '4px', display: 'block' }}
                  >
                    {item.product.name}
                  </Link>
                  <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '12px' }}>
                    {formatPrice(item.product.price)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E9ECEF', borderRadius: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
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
                        color: '#DC3545',
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

                <div style={{ fontWeight: 600, color: '#212529' }}>
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
              background: '#F8F9FA',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Tag style={{ width: '16px', height: '16px', color: '#6C757D' }} />
                  <span style={{ fontSize: '14px', color: '#6C757D' }}>Promo Code</span>
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
                      border: '1px solid #E9ECEF',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    style={{
                      padding: '10px 16px',
                      background: '#212529',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E9ECEF', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#6C757D' }}>Subtotal</span>
                  <span style={{ fontWeight: 500, color: '#212529' }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#6C757D' }}>Shipping</span>
                  <span style={{ fontWeight: 500, color: shipping === 0 ? '#28A745' : '#212529' }}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 50 && (
                  <div style={{
                    fontSize: '13px',
                    color: '#1B5E3B',
                    background: '#E8F5E9',
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
                  borderTop: '1px solid #E9ECEF',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#212529' }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>{formatPrice(total)}</span>
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
                  color: '#1B5E3B',
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
