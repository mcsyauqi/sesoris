'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { getProductBySlug } from '@/data/products';
import { shippingFor, FREE_SHIPPING_MIN } from '@/lib/checkout';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics';

interface PaypalButtonsApi {
  Buttons: (opts: Record<string, unknown>) => { render: (el: HTMLElement) => Promise<void>; close?: () => void };
}
declare global {
  interface Window { paypal?: PaypalButtonsApi }
}

function loadPaypal(clientId: string): Promise<PaypalButtonsApi> {
  if (window.paypal) return Promise.resolve(window.paypal);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    // Apple Pay, Google Pay, Venmo and Pay Later are off on purpose: only PayPal and card.
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons&enable-funding=card&disable-funding=venmo,paylater,credit`;
    s.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error('PayPal failed to load')));
    s.onerror = () => reject(new Error('PayPal failed to load'));
    document.head.appendChild(s);
  });
}

const crumb = (label: string) => (
  <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
      <Link href="/" aria-label="Home" style={{ display: 'flex', color: '#5F6873' }}><Home style={{ width: '14px', height: '14px' }} /></Link>
      <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
      <span style={{ color: '#212529', fontWeight: 500 }}>{label}</span>
    </div>
  </div>
);

export default function CheckoutPageClient({ clientId, sandbox }: { clientId?: string; sandbox: boolean }) {
  const { items, clearCart } = useCartStore();
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);
  const [error, setError] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const beginFired = useRef(false);

  // Show current catalog data (price, name) rather than the copy saved in localStorage.
  const lines = items.flatMap((i) => {
    const product = getProductBySlug(i.product.slug);
    return product ? [{ product, quantity: i.quantity }] : [];
  });

  const subtotal = Math.round(lines.reduce((s, l) => s + l.product.price * l.quantity, 0) * 100) / 100;
  const shipping = shippingFor(subtotal);
  const discount = coupon?.discount ?? 0;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;
  const cartKey = lines.map((l) => `${l.product.slug}:${l.quantity}`).join(',');
  const cartItems = () => cartKey.split(',').map((p) => ({ slug: p.split(':')[0], quantity: Number(p.split(':')[1]) }));

  // A coupon is priced for one cart; changing the cart drops it so the shown total stays true.
  useEffect(() => setCoupon(null), [cartKey]);

  const applyCoupon = async () => {
    setError('');
    const res = await fetch('/api/checkout/paypal?preview=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems(), coupon: couponInput }),
    });
    const json = await res.json();
    if (!res.ok) { setCoupon(null); setError(json.error || 'This coupon code is not valid.'); return; }
    setCoupon({ code: couponInput.trim().toUpperCase(), discount: json.discount });
  };

  useEffect(() => {
    if (beginFired.current || lines.length === 0) return;
    beginFired.current = true;
    trackBeginCheckout(lines);
  }, [lines]);

  useEffect(() => {
    if (!clientId || !cartKey || !buttonsRef.current) return;
    const el = buttonsRef.current;
    let buttons: ReturnType<PaypalButtonsApi['Buttons']> | undefined;
    loadPaypal(clientId)
      .then((paypal) => {
        el.innerHTML = '';
        buttons = paypal.Buttons({
          style: { layout: 'vertical', shape: 'rect', label: 'pay' },
          createOrder: async () => {
            setError('');
            const res = await fetch('/api/checkout/paypal', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: cartItems(), coupon: coupon?.code }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Payment could not be started.');
            return json.id as string;
          },
          onShippingAddressChange: async (data: { shippingAddress?: { countryCode?: string } }, actions: { reject: (e?: unknown) => Promise<void> }) => {
            if (data.shippingAddress?.countryCode && data.shippingAddress.countryCode !== 'US') return actions.reject();
          },
          onApprove: async (data: { orderID: string }) => {
            const res = await fetch(`/api/checkout/paypal/${data.orderID}/capture`, { method: 'POST' });
            const json = await res.json();
            if (!res.ok) { setError(json.error || 'Payment was not completed.'); return; }
            trackPurchase({ transactionId: json.orderId, cartItems: lines, shipping, tax: 0 });
            setPlaced({ id: json.orderId, total: json.total });
            clearCart();
          },
          onError: (err: unknown) => setError(err instanceof Error ? err.message : 'Something went wrong with the payment. Please try again.'),
        });
        return buttons.render(el);
      })
      .catch((err: Error) => setError(err.message));
    return () => buttons?.close?.();
    // lines/shipping are derived from cartKey; re-render buttons only when the cart changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, cartKey, coupon?.code]);

  if (placed) {
    return (
      <>
        {crumb('Order Confirmed')}
        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <CheckCircle style={{ width: '56px', height: '56px', color: '#1B5E3B', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>Thank you for your order</h1>
          <p style={{ color: '#5F6873', marginBottom: '8px' }}>Order reference: <strong style={{ color: '#212529' }}>{placed.id}</strong> ({formatPrice(placed.total)})</p>
          <p style={{ color: '#5F6873', marginBottom: '24px' }}>A confirmation email is on its way. We will send tracking as soon as your order ships from our US warehouse.</p>
          <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        {crumb('Checkout')}
        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Your cart is empty</h1>
          <p style={{ color: '#5F6873', marginBottom: '24px' }}>Add items to your cart before checking out.</p>
          <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      {crumb('Checkout')}
      <div className="container" style={{ padding: '48px 16px 80px', maxWidth: '640px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 600, marginBottom: '24px' }}>Checkout</h1>
        {sandbox && (
          <p style={{ background: '#FFF3CD', color: '#664D03', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
            Test mode: payments go to the PayPal sandbox and no real money is charged.
          </p>
        )}

        <div style={{ background: '#F8F9FA', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          {lines.map(({ product, quantity }) => (
            <div key={product.slug} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: 'white', flexShrink: 0 }}>
                <Image src={product.images[0]?.url} alt={getProductImageAlt(product)} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{product.name}</div>
                <div style={{ fontSize: '13px', color: '#5F6873' }}>Qty: {quantity}</div>
              </div>
              <div style={{ fontWeight: 500 }}>{formatPrice(product.price * quantity)}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E9ECEF', paddingTop: '16px', display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5F6873' }}>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5F6873' }}>Discount ({coupon?.code})</span><span style={{ color: '#1E7E34' }}>-{formatPrice(discount)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5F6873' }}>Shipping (US only)</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E9ECEF', paddingTop: '10px' }}>
              <span style={{ fontWeight: 600 }}>Total</span><span style={{ fontSize: '20px', fontWeight: 700, color: '#1B5E3B' }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <label htmlFor="checkout-coupon" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Coupon code</label>
          <input id="checkout-coupon" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
          <button type="button" onClick={applyCoupon} disabled={!couponInput.trim()} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #1B5E3B', background: 'white', color: '#1B5E3B', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Pay with PayPal or card</h2>
        <p style={{ fontSize: '14px', color: '#5F6873', marginBottom: '16px' }}>
          No PayPal account needed: choose &quot;Debit or Credit Card&quot; to pay by card. Your shipping address is entered in the payment window.
        </p>
        {error && <p role="alert" style={{ background: '#F8D7DA', color: '#842029', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
        {clientId ? <div ref={buttonsRef} style={{ minHeight: '150px' }} /> : <p style={{ color: '#5F6873' }}>Checkout is temporarily unavailable. Please try again shortly.</p>}

        <div style={{ marginTop: '24px', display: 'grid', gap: '8px', fontSize: '13px', color: '#5F6873' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck style={{ width: '16px', height: '16px', color: '#1B5E3B' }} />Payments are processed by PayPal. Sesoris never sees your card number.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck style={{ width: '16px', height: '16px', color: '#1B5E3B' }} />Free shipping on orders over ${FREE_SHIPPING_MIN}. Ships from our US warehouse.</div>
        </div>
      </div>
    </>
  );
}
