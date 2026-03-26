import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, FileText, ShoppingBag, Truck, RefreshCw, AlertTriangle, Scale, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Sesoris terms and conditions of use. Read our policies on orders, payments, and service.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms & Conditions | Sesoris',
    description: 'Sesoris terms and conditions of use. Read our policies on orders, payments, and service.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function TermsPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Terms & Conditions</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#E8F5E9',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <FileText style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Terms & Conditions
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Last updated: January 1, 2026
            </p>
          </div>

          <div style={{ background: '#F8F9FA', padding: '20px 24px', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ color: '#495057', lineHeight: 1.7, margin: 0 }}>
              Welcome to Sesoris. By accessing and using our website, you agree to be bound
              by the following terms and conditions. Please read them carefully before making a purchase.
            </p>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              1. General Terms
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              By using Sesoris services, you represent that:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>You are at least 18 years old or have parental/guardian consent.</li>
              <li style={{ marginBottom: '8px' }}>The information you provide is accurate and complete.</li>
              <li style={{ marginBottom: '8px' }}>You are responsible for maintaining the confidentiality of your account.</li>
              <li style={{ marginBottom: '8px' }}>You will not use our services for any illegal purpose.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShoppingBag style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                2. Orders and Payment
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>2.1 Order Process</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>All orders are subject to product availability.</li>
                <li style={{ marginBottom: '8px' }}>We reserve the right to refuse or cancel orders for reasonable cause.</li>
                <li style={{ marginBottom: '8px' }}>Order confirmation will be sent via email after successful payment.</li>
                <li style={{ marginBottom: '8px' }}>Prices may change without prior notice, but will not affect confirmed orders.</li>
              </ul>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>2.2 Payment Methods</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
                <li style={{ marginBottom: '8px' }}>PayPal</li>
                <li style={{ marginBottom: '8px' }}>Apple Pay and Google Pay</li>
                <li style={{ marginBottom: '8px' }}>Bank Transfer</li>
                <li style={{ marginBottom: '8px' }}>Buy Now, Pay Later (for qualifying orders)</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Truck style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                3. Shipping
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Orders are processed within 1-2 business days after payment is confirmed.</li>
                <li style={{ marginBottom: '8px' }}>Estimated delivery time: 3-7 business days (depending on location).</li>
                <li style={{ marginBottom: '8px' }}>Shipping costs are calculated based on weight and delivery location.</li>
                <li style={{ marginBottom: '8px' }}>Free shipping on orders over $50 (select regions).</li>
                <li style={{ marginBottom: '8px' }}>Risk of loss or damage during shipping is borne by the carrier.</li>
                <li style={{ marginBottom: '8px' }}>Please inspect your package upon receipt and report any damage within 48 hours.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <RefreshCw style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                4. Returns and Refunds
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>4.1 Return Policy</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Products can be returned within 30 days of receipt.</li>
                <li style={{ marginBottom: '8px' }}>Products must be in original condition, unused, with complete packaging.</li>
                <li style={{ marginBottom: '8px' }}>Personalized or custom products cannot be returned.</li>
                <li style={{ marginBottom: '8px' }}>Return shipping costs are borne by the buyer, unless the product is defective or incorrectly shipped.</li>
              </ul>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>4.2 Refund Process</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Refunds are processed within 7-14 business days after the product is received and verified.</li>
                <li style={{ marginBottom: '8px' }}>Refunds will be credited to the original payment method.</li>
                <li style={{ marginBottom: '8px' }}>For COD payments, refunds are issued via bank transfer.</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7, marginTop: '16px' }}>
                For full details, please visit our{' '}
                <Link href="/returns" style={{ color: '#1B5E3B', fontWeight: 500 }}>Returns</Link> page.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              5. Product Warranty
            </h2>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>All Sesoris products are guaranteed free from manufacturing defects.</li>
              <li style={{ marginBottom: '8px' }}>Warranty is valid for 1 year for manufacturing defects (not damage from use).</li>
              <li style={{ marginBottom: '8px' }}>Warranty claims must include proof of purchase.</li>
              <li style={{ marginBottom: '8px' }}>Warranty does not cover normal wear and tear, damage from misuse, or product modifications.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              6. Intellectual Property
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              All content on this site, including but not limited to:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Logos, trademarks, and the &quot;Sesoris&quot; name</li>
              <li style={{ marginBottom: '8px' }}>Product photos and images</li>
              <li style={{ marginBottom: '8px' }}>Product descriptions and text</li>
              <li style={{ marginBottom: '8px' }}>Website design and layout</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              are the property of Sesoris and are protected by applicable copyright laws. Copying, distributing,
              or using content without our written permission is prohibited.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <AlertTriangle style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                7. Limitation of Liability
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Sesoris shall not be liable for:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Indirect or consequential damages from product use</li>
                <li style={{ marginBottom: '8px' }}>Shipping delays caused by carriers or force majeure</li>
                <li style={{ marginBottom: '8px' }}>Damage caused by improper use</li>
                <li style={{ marginBottom: '8px' }}>Service interruptions due to system maintenance or factors beyond our control</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                Our maximum liability is limited to the value of the product purchased.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Scale style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                8. Governing Law
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                These Terms and Conditions are governed by and construed in accordance with applicable laws.
                Any disputes arising shall be resolved through mutual discussion. If no agreement is reached,
                disputes shall be settled through the appropriate jurisdiction.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              9. Changes to Terms & Conditions
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              We reserve the right to modify these Terms & Conditions at any time. Changes take effect immediately upon
              publication on the website. Continued use of our services after changes constitutes your
              acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
            padding: '32px',
            borderRadius: '16px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Mail style={{ width: '24px', height: '24px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
                Questions?
              </h2>
            </div>
            <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: '16px' }}>
              If you have any questions about these Terms & Conditions, please contact our team:
            </p>
            <div style={{ opacity: 0.9, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Sesoris Customer Service</strong></p>
              <p style={{ margin: '0 0 4px' }}>Email: sesoris.store@gmail.com</p>
              <p style={{ margin: '0 0 4px' }}>Phone: +62 274 123 4567</p>
              <p style={{ margin: '0 0 4px' }}>WhatsApp: +62 812 3456 7890</p>
              <p style={{ margin: 0 }}>Business Hours: Monday - Friday, 09:00 - 18:00 WIB</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
