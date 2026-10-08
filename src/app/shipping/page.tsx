import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import { products } from '@/data/products';
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from '@/lib/shipping';

// Must match the live checkout (src/lib/checkout.ts): US addresses only (50 states + DC),
// one flat rate, free over FREE_SHIPPING_MIN. Checked in the live checkout on 2026-10-09:
// no country field, no express or same-day choice.
const shipRanges = products
  .map((p) => p.shipDays?.match(/^(\d+)-(\d+)$/))
  .filter((m): m is RegExpMatchArray => m !== null && m !== undefined)
  .map((m) => [Number(m[1]), Number(m[2])]);
const MIN_DAYS = Math.min(...shipRanges.map((r) => r[0]));
const MAX_DAYS = Math.max(...shipRanges.map((r) => r[1]));
const FEE = `$${SHIPPING_FEE.toFixed(2)}`;
const DESCRIPTION = `Sesoris ships to US addresses only, from a US warehouse: free on orders over $${FREE_SHIPPING_MIN}, otherwise a flat ${FEE}. Delivery estimates and tracking.`;

export const metadata: Metadata = {
  title: 'Sesoris Shipping Info | Delivery Times & Costs',
  description: DESCRIPTION,
  alternates: selfReferencingAlternates('/shipping'),
  openGraph: {
    title: 'Sesoris Shipping Info | Delivery Times & Costs',
    description: DESCRIPTION,
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function ShippingPage() {
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
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Shipping</span>
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
              background: 'var(--brand-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Truck style={{ width: '32px', height: '32px', color: 'var(--brand)' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
              Shipping Information
            </h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px' }}>
              We are committed to delivering your orders quickly and safely
            </p>
          </div>

          {/* Shipping rate: one option, exactly what checkout charges */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
              Shipping Rate
            </h2>
            <div style={{
              padding: '20px',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '16px',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>Standard shipping, US addresses only</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '4px' }}>
                  One rate for every order: free over ${FREE_SHIPPING_MIN}, otherwise a flat {FEE}. There is no faster paid option.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--brand)' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  Estimated {MIN_DAYS}-{MAX_DAYS} days, depending on the item (each product page shows its own estimate)
                </div>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--brand)', fontSize: '18px' }}>{FEE}</div>
            </div>
          </div>

          {/* Free Shipping */}
          <div style={{
            background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-strong) 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: 'white',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package style={{ width: '24px', height: '24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Free Shipping!</h3>
            </div>
            <p style={{ opacity: 0.9, marginBottom: '16px' }}>
              Enjoy free shipping on all orders over ${FREE_SHIPPING_MIN}. No promo code needed!
            </p>
            <Link href="/shop" style={{
              display: 'inline-block',
              background: 'white',
              color: 'var(--brand)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '14px',
            }}>
              Shop Now
            </Link>
          </div>

          {/* Coverage Area */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
              Where We Ship
            </h2>
            <div style={{ padding: '20px', background: 'var(--surface-2)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MapPin style={{ width: '18px', height: '18px', color: 'var(--brand)' }} />
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>United States only</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', margin: 0 }}>
                We ship to addresses in all 50 states and Washington, DC. Checkout does not accept addresses outside the United States at the moment.
              </p>
            </div>
          </div>

          {/* Carriers and tracking */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
              Carriers and Tracking
            </h2>
            <p style={{ color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              Orders are fulfilled from a US warehouse, and the carrier is chosen per order for your address. We email you
              the tracking number as soon as your order ships, and you can also check it on the{' '}
              <Link href="/track-order" style={{ color: 'var(--brand)', fontWeight: 500 }}>Track Order</Link> page.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '24px' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: 'How can I track my order?', a: 'Once your order is shipped, you will receive an email with a tracking number. Use this number to track your package on our Track Order page or the carrier\'s website.' },
                { q: 'Do you ship outside the United States?', a: 'Not at the moment. Sesoris ships only to addresses in the United States, and checkout accepts US addresses only.' },
                { q: 'What if my package is damaged during shipping?', a: 'If your package arrives damaged, please contact us within 48 hours with photos of the damage. We will arrange a replacement or refund.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--surface-2)', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>{item.q}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: 'var(--surface-2)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '12px' }}>
              Have more questions about shipping?
            </p>
            <Link href="/contact" style={{ color: 'var(--brand)', fontWeight: 500 }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
