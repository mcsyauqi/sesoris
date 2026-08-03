import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, RotateCcw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Sesoris Returns | How to Exchange & Refund',
  description: 'Learn how returns, exchanges, and refunds work at Sesoris so shopping for home organizers stays safe and easy.',
  alternates: selfReferencingAlternates('/returns'),
  openGraph: {
    title: 'Sesoris Returns | How to Exchange & Refund | Sesoris',
    description: 'Learn how returns, exchanges, and refunds work at Sesoris so shopping for home organizers stays safe and easy.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function ReturnsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Returns</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              <RotateCcw style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Return Policy
            </h1>
            <p style={{ color: '#5F6873', fontSize: '16px' }}>
              Your satisfaction is our priority. Not happy? Return it with ease.
            </p>
          </div>

          {/* Return Policy Highlight */}
          <div style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: 'white',
            marginBottom: '48px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>30</div>
            <div style={{ fontSize: '18px', opacity: 0.9 }}>Day Satisfaction Guarantee</div>
            <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>
              Not satisfied with your product? Return it within 30 days for a full refund or product exchange.
            </p>
          </div>

          {/* Eligible Items */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Return Conditions
            </h2>
            <div className="returns-conditions-grid" style={{ display: 'grid', gap: '24px' }}>
              <div style={{ padding: '24px', border: '2px solid #1E7E34', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <CheckCircle style={{ width: '20px', height: '20px', color: '#1E7E34' }} />
                  <span style={{ fontWeight: 600, color: '#1E7E34' }}>Eligible for Return</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#5F6873', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Product is still in original condition</li>
                  <li>Tags and labels are still attached</li>
                  <li>Packaging is complete</li>
                  <li>Product has never been used</li>
                  <li>Within 30 days of purchase</li>
                </ul>
              </div>
              <div style={{ padding: '24px', border: '2px solid #DC3545', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <XCircle style={{ width: '20px', height: '20px', color: '#DC3545' }} />
                  <span style={{ fontWeight: 600, color: '#DC3545' }}>Not Eligible for Return</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#5F6873', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Product has been used</li>
                  <li>Custom or personalized products</li>
                  <li>Sale or clearance products</li>
                  <li>Products with broken seals</li>
                  <li>More than 30 days after purchase</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Return Process
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: 1, title: 'Request a Return', desc: 'Log into your account, select the order, and click "Request a Return". Describe the reason for your return.' },
                { step: 2, title: 'Wait for Approval', desc: 'Our team will review your request within 1-2 business days. You will receive a confirmation email.' },
                { step: 3, title: 'Ship the Product', desc: 'Pack the product securely and ship it to the provided address. Keep the shipping receipt.' },
                { step: 4, title: 'Receive Your Refund', desc: 'Once the product is received and inspected, the refund will be processed within 3-5 business days.' },
              ].map((item) => (
                <div key={item.step} style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: '16px',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#1B5E3B',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '18px',
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#5F6873', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Options */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Refund Options
            </h2>
            <div className="returns-refund-grid" style={{ display: 'grid', gap: '16px' }}>
              <div style={{ padding: '24px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>Refund to Store Credit</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#1B5E3B', marginBottom: '8px' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  Processed in 1-2 business days
                </div>
                <p style={{ fontSize: '14px', color: '#5F6873', margin: 0 }}>
                  Store credit can be used immediately for your next purchase.
                </p>
              </div>
              <div style={{ padding: '24px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>Refund to Original Payment</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#1B5E3B', marginBottom: '8px' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  Processed in 3-5 business days
                </div>
                <p style={{ fontSize: '14px', color: '#5F6873', margin: 0 }}>
                  Funds will be returned to your original payment method.
                </p>
              </div>
            </div>
          </div>

          {/* Exchange */}
          <div style={{
            padding: '24px',
            background: '#FFF3CD',
            borderRadius: '12px',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Package style={{ width: '20px', height: '20px', color: '#856404' }} />
              <span style={{ fontWeight: 600, color: '#856404' }}>Product Exchange</span>
            </div>
            <p style={{ fontSize: '14px', color: '#856404', margin: 0, lineHeight: 1.6 }}>
              Want to exchange for a different size or color? Select the &quot;Product Exchange&quot; option when submitting your return request.
              We will ship the replacement product once the original item is received.
            </p>
          </div>

          {/* Contact CTA */}
          <div style={{
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#5F6873', marginBottom: '12px' }}>
              Need help with a return?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Contact Customer Service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
