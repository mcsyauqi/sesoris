import Link from 'next/link';
import { Home, ChevronRight, Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';

export default function ShippingPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Shipping</span>
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
              <Truck style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Shipping Information
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              We are committed to delivering your orders quickly and safely
            </p>
          </div>

          {/* Shipping Options */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Shipping Options
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Standard', time: '5-7 business days', price: '$5.99', desc: 'Standard shipping across all regions' },
                { name: 'Express', time: '2-3 business days', price: '$12.99', desc: 'Fast shipping for urgent needs' },
                { name: 'Same Day', time: 'Same day delivery', price: '$19.99', desc: 'Available in select metro areas only' },
              ].map((option) => (
                <div key={option.name} style={{
                  padding: '20px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{option.name}</div>
                    <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '4px' }}>{option.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1B5E3B' }}>
                      <Clock style={{ width: '14px', height: '14px' }} />
                      {option.time}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#1B5E3B', fontSize: '18px' }}>{option.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Shipping */}
          <div style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
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
              Enjoy free shipping on all orders over $50. No promo code needed!
            </p>
            <Link href="/shop" style={{
              display: 'inline-block',
              background: 'white',
              color: '#1B5E3B',
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
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Shipping Areas
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#1B5E3B' }} />
                  <span style={{ fontWeight: 600, color: '#212529' }}>Domestic</span>
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Estimated 3-7 business days for standard shipping
                </p>
              </div>
              <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#1B5E3B' }} />
                  <span style={{ fontWeight: 600, color: '#212529' }}>International</span>
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Estimated 10-14 business days for standard shipping
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Partners */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Shipping Partners
            </h2>
            <p style={{ color: '#6C757D', marginBottom: '16px' }}>
              We partner with trusted carriers to ensure your packages arrive safely:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['FedEx', 'UPS', 'DHL', 'USPS', 'Royal Mail', 'Australia Post'].map((partner) => (
                <span key={partner} style={{
                  padding: '8px 16px',
                  background: '#F8F9FA',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#212529',
                }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: 'How can I track my order?', a: 'Once your order is shipped, you will receive an email with a tracking number. Use this number to track your package on our Track Order page or the carrier\'s website.' },
                { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Customers may be responsible for customs duties and taxes.' },
                { q: 'What if my package is damaged during shipping?', a: 'If your package arrives damaged, please contact us within 48 hours with photos of the damage. We will arrange a replacement or refund.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>{item.q}</div>
                  <div style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.6 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#6C757D', marginBottom: '12px' }}>
              Have more questions about shipping?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
