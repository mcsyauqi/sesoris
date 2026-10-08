'use client';

import { useEffect, useRef, useState } from 'react';
import { WELCOME_CODE_KEY } from '@/components/layout/NewsletterPopup';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { getProductBySlug } from '@/data/products';
import { shippingFor, FREE_SHIPPING_MIN, US_STATES, shipToError, type ShipTo } from '@/lib/checkout';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics';
import { applyCoupon as priceCoupon } from '@/lib/apply-coupon';

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

const inputStyle = { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line-strong)', fontSize: '15px', background: 'white' } as const;

const crumb = (label: string) => (
  <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
      <Link href="/" aria-label="Home" style={{ display: 'flex', color: 'var(--ink-muted)' }}><Home style={{ width: '14px', height: '14px' }} /></Link>
      <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
      <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{label}</span>
    </div>
  </div>
);

export default function CheckoutPageClient({ clientId, sandbox }: { clientId?: string; sandbox: boolean }) {
  const { items, clearCart, coupon, setCoupon } = useCartStore();
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);
  const [error, setError] = useState('');
  const [couponInput, setCouponInput] = useState('');
  // Prefill the welcome code from the newsletter popup on this browser (the buyer still presses Apply).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WELCOME_CODE_KEY);
      if (saved) setCouponInput((cur) => cur || saved);
    } catch {
      // storage blocked
    }
  }, []);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [shipTo, setShipTo] = useState<ShipTo>({ name: '', address1: '', address2: '', city: '', state: '', zip: '', phone: '' });
  // PayPal callbacks are created once per cart; the ref lets them read the latest form values.
  const shipToRef = useRef(shipTo);
  shipToRef.current = shipTo;
  const field = (k: keyof ShipTo) => ({ value: shipTo[k] ?? '', onChange: (e: { target: { value: string } }) => setShipTo((a) => ({ ...a, [k]: e.target.value })) });
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

  // The cart store clears the coupon on any cart change, so a stored discount always matches this cart.
  const applyCoupon = async () => {
    setError('');
    try {
      setCoupon(await priceCoupon(items, couponInput));
    } catch (e) {
      setCoupon(null);
      setError((e as Error).message);
    }
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
          // Validate the address before the PayPal window opens, so nobody approves a payment we would refuse.
          onClick: (_data: unknown, actions: { resolve: () => void; reject: () => void }) => {
            const problem = shipToError(shipToRef.current);
            setError(problem ?? '');
            return problem ? actions.reject() : actions.resolve();
          },
          createOrder: async () => {
            setError('');
            const res = await fetch('/api/checkout/paypal', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: cartItems(), coupon: coupon?.code, shipTo: shipToRef.current }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Payment could not be started.');
            return json.id as string;
          },
          onApprove: async (data: { orderID: string }) => {
            const res = await fetch(`/api/checkout/paypal/${data.orderID}/capture`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone: shipToRef.current.phone }),
            });
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
          <CheckCircle style={{ width: '56px', height: '56px', color: 'var(--brand)', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>Thank you for your order</h1>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '8px' }}>Order reference: <strong style={{ color: 'var(--ink)' }}>{placed.id}</strong> ({formatPrice(placed.total)})</p>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '24px' }}>A confirmation email is on its way. We will send tracking as soon as your order ships from our US warehouse.</p>
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
          <p style={{ color: 'var(--ink-muted)', marginBottom: '24px' }}>Add items to your cart before checking out.</p>
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

        <div style={{ background: 'var(--surface-2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          {lines.map(({ product, quantity }) => (
            <div key={product.slug} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: 'white', flexShrink: 0 }}>
                <Image src={product.images[0]?.url} alt={getProductImageAlt(product)} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{product.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Qty: {quantity}</div>
              </div>
              <div style={{ fontWeight: 500 }}>{formatPrice(product.price * quantity)}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--ink-muted)' }}>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--ink-muted)' }}>Discount ({coupon?.code})</span><span style={{ color: 'var(--success)' }}>-{formatPrice(discount)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--ink-muted)' }}>Shipping (US only)</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
              <span style={{ fontWeight: 600 }}>Total</span><span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brand)' }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <label htmlFor="checkout-coupon" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Coupon code</label>
          <input id="checkout-coupon" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
          <button type="button" onClick={applyCoupon} disabled={!couponInput.trim()} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--brand)', background: 'white', color: 'var(--brand)', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Shipping address (US only)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
          {([
            ['name', 'Full name', 'name', true, 2],
            ['address1', 'Street address', 'address-line1', true, 2],
            ['address2', 'Apt, suite, unit (optional)', 'address-line2', false, 2],
            ['city', 'City', 'address-level2', true, 1],
            ['zip', 'ZIP code', 'postal-code', true, 1],
            ['phone', 'Phone (for delivery, optional)', 'tel', false, 1],
          ] as const).map(([k, label, auto, required, span]) => (
            <label key={k} style={{ gridColumn: `span ${span}`, fontSize: '13px', color: 'var(--ink-2)' }}>
              {label}
              <input {...field(k)} autoComplete={auto} required={required} style={inputStyle} />
            </label>
          ))}
          <label style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
            State
            <select {...field('state')} autoComplete="address-level1" required style={inputStyle}>
              <option value="">Choose...</option>
              {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
          </label>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Pay with PayPal or card</h2>
        <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '16px' }}>
          No PayPal account needed: choose &quot;Debit or Credit Card&quot; to pay by card. We ship to the address above.
        </p>
        {error && <p role="alert" style={{ background: '#F8D7DA', color: '#842029', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
        {clientId ? <div ref={buttonsRef} style={{ minHeight: '150px' }} /> : <p style={{ color: 'var(--ink-muted)' }}>Checkout is temporarily unavailable. Please try again shortly.</p>}

        <div style={{ marginTop: '24px', display: 'grid', gap: '8px', fontSize: '13px', color: 'var(--ink-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck style={{ width: '16px', height: '16px', color: 'var(--brand)' }} />Payments are processed by PayPal. Sesoris never sees your card number.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck style={{ width: '16px', height: '16px', color: 'var(--brand)' }} />Free shipping on orders over ${FREE_SHIPPING_MIN}. Ships from our US warehouse.</div>
        </div>
      </div>
    </>
  );
}
