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
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Track Order</span>
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
              background: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Package style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Track Your Order
            </h1>
            <p style={{ color: '#6C757D' }}>
              Enter your order details to see the current status of your shipment.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
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
                  border: '1px solid #E9ECEF',
                  fontSize: '15px',
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
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
                  border: '1px solid #E9ECEF',
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
              border: '1px solid #E9ECEF',
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <SearchX style={{ width: '40px', height: '40px', color: '#6C757D', margin: '0 auto 16px' }} />
              <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>
                We couldn&apos;t find order {orderNumber}
              </div>
              <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: '1.7', margin: 0 }}>
                Double-check the order number and email against your confirmation email.
                If the details are correct and you still can&apos;t find your order, our team
                can look it up for you via{' '}
                <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>Contact Support</Link>{' '}
                or email <a href="mailto:sesoris.store@gmail.com" style={{ color: '#1B5E3B', fontWeight: 500 }}>sesoris.store@gmail.com</a>.
              </p>
            </div>
          )}

          <div style={{
            marginTop: '40px',
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '12px' }}>
              Need help with your order?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Contact Support
            </Link>
          </div>

          {/* SEO Content */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #E9ECEF' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
              How Order Tracking Works at Sesoris
            </h2>
            <p style={{ color: '#6C757D', lineHeight: '1.7', marginBottom: '12px', fontSize: '14px' }}>
              After placing your order at Sesoris, you will receive a confirmation email with your order number. Once your order is shipped, we will send a tracking number that you can use to monitor your delivery in real time.
            </p>
            <p style={{ color: '#6C757D', lineHeight: '1.7', marginBottom: '16px', fontSize: '14px' }}>
              Standard delivery to major cities in Indonesia takes 2-5 business days. For remote areas, delivery may take 5-10 business days. All shipments are fully insured and trackable from our warehouse to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shipping" style={{ color: '#1B5E3B', fontSize: '14px', fontWeight: 500 }}>Shipping Policy</Link>
              <span style={{ color: '#6C757D' }}>·</span>
              <Link href="/returns" style={{ color: '#1B5E3B', fontSize: '14px', fontWeight: 500 }}>Returns Policy</Link>
              <span style={{ color: '#6C757D' }}>·</span>
              <Link href="/faq" style={{ color: '#1B5E3B', fontSize: '14px', fontWeight: 500 }}>FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
