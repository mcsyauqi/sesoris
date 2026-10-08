'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Search, Package, SearchX } from 'lucide-react';

export default function TrackOrderPageClient() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

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
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Track Order</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--brand-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Package style={{ width: '32px', height: '32px', color: 'var(--brand)' }} />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Track Your Order
            </h1>
            <p style={{ color: 'var(--ink-muted)' }}>
              Enter your order details to see the current status of your shipment.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., SES-123456"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  fontSize: '15px',
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email used for the order"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  fontSize: '15px',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Search style={{ width: '18px', height: '18px' }} />
              Track Order
            </button>
          </form>

          {showResult && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--line)',
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <SearchX style={{ width: '40px', height: '40px', color: 'var(--ink-muted)', margin: '0 auto 16px' }} />
              <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                We couldn&apos;t find order {orderNumber}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: '1.7', margin: 0 }}>
                Double-check the order number and email against your confirmation email.
                If the details are correct and you still can&apos;t find your order, our team
                can look it up for you via{' '}
                <Link href="/contact" style={{ color: 'var(--brand)', fontWeight: 500 }}>Contact Support</Link>{' '}
                or email <a href="mailto:admin@sesoris.com" style={{ color: 'var(--brand)', fontWeight: 500 }}>admin@sesoris.com</a>.
              </p>
            </div>
          )}

          <div style={{
            marginTop: '40px',
            padding: '24px',
            background: 'var(--surface-2)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '12px' }}>
              Need help with your order?
            </p>
            <Link href="/contact" style={{ color: 'var(--brand)', fontWeight: 500 }}>
              Contact Support
            </Link>
          </div>

          {/* SEO Content */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
              How Order Tracking Works at Sesoris
            </h2>
            <p style={{ color: 'var(--ink-muted)', lineHeight: '1.7', marginBottom: '12px', fontSize: '14px' }}>
              After placing your order at Sesoris, you will receive a confirmation email with your order number. Once your order is shipped, we will send a tracking number that you can use to monitor your delivery in real time.
            </p>
            <p style={{ color: 'var(--ink-muted)', lineHeight: '1.7', marginBottom: '16px', fontSize: '14px' }}>
              Orders ship from our US warehouse to US addresses only, and each product page shows its estimated delivery time. Every shipment comes with a tracking number.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shipping" style={{ color: 'var(--brand)', fontSize: '14px', fontWeight: 500 }}>Shipping Policy</Link>
              <span style={{ color: 'var(--ink-muted)' }}>·</span>
              <Link href="/returns" style={{ color: 'var(--brand)', fontSize: '14px', fontWeight: 500 }}>Returns Policy</Link>
              <span style={{ color: 'var(--ink-muted)' }}>·</span>
              <Link href="/faq" style={{ color: 'var(--brand)', fontSize: '14px', fontWeight: 500 }}>FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
