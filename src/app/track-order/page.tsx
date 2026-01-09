'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function TrackOrderPage() {
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
              overflow: 'hidden',
            }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #E9ECEF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6C757D' }}>Order Number</span>
                  <span style={{ fontWeight: 600, color: '#212529' }}>{orderNumber || 'SES-123456'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#6C757D' }}>Estimated Delivery</span>
                  <span style={{ fontWeight: 600, color: '#1B5E3B' }}>Jan 15, 2026</span>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ position: 'relative' }}>
                  {/* Progress Line */}
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '30px',
                    bottom: '30px',
                    width: '2px',
                    background: '#E9ECEF',
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '30px',
                    height: '50%',
                    width: '2px',
                    background: '#1B5E3B',
                  }} />

                  {/* Steps */}
                  {[
                    { icon: CheckCircle, title: 'Order Confirmed', date: 'Jan 9, 2026 - 10:30 AM', done: true },
                    { icon: Package, title: 'Processing', date: 'Jan 9, 2026 - 2:15 PM', done: true },
                    { icon: Truck, title: 'Shipped', date: 'Jan 10, 2026 - 9:00 AM', done: true },
                    { icon: Clock, title: 'Out for Delivery', date: 'Expected Jan 15, 2026', done: false },
                  ].map((step, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: index < 3 ? '32px' : '0' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: step.done ? '#1B5E3B' : '#E9ECEF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <step.icon style={{ width: '16px', height: '16px', color: step.done ? 'white' : '#6C757D' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{step.title}</div>
                        <div style={{ fontSize: '13px', color: '#6C757D' }}>{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        </div>
      </div>
    </>
  );
}
