import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Sesoris privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Sesoris',
    description: 'Sesoris privacy policy. Learn how we collect, use, and protect your personal information.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Privacy Policy</span>
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
              <Shield style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Privacy Policy
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Last updated: January 1, 2026
            </p>
          </div>

          <div style={{ background: '#F8F9FA', padding: '20px 24px', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ color: '#495057', lineHeight: 1.7, margin: 0 }}>
              Sesoris is committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our services.
            </p>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Database style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                1. Information We Collect
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                We collect information that you provide directly to us, including:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Account Information:</strong> Name, email address, phone number, and password when you create an account.</li>
                <li style={{ marginBottom: '8px' }}><strong>Shipping Information:</strong> Full address, postal code, and special delivery instructions.</li>
                <li style={{ marginBottom: '8px' }}><strong>Payment Information:</strong> Credit/debit card details or other payment methods (securely processed through third-party payment providers).</li>
                <li style={{ marginBottom: '8px' }}><strong>Order History:</strong> Products you purchase, purchase dates, and shopping preferences.</li>
                <li style={{ marginBottom: '8px' }}><strong>Communications:</strong> Messages you send through our customer service.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Eye style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                2. How We Use Your Information
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                We use the collected information to:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Process and deliver your orders</li>
                <li style={{ marginBottom: '8px' }}>Send order confirmations and shipping updates</li>
                <li style={{ marginBottom: '8px' }}>Respond to inquiries and customer service requests</li>
                <li style={{ marginBottom: '8px' }}>Send newsletters and promotional information (if you have subscribed)</li>
                <li style={{ marginBottom: '8px' }}>Improve our products and services</li>
                <li style={{ marginBottom: '8px' }}>Prevent fraud and maintain platform security</li>
                <li style={{ marginBottom: '8px' }}>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Lock style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                3. Data Security
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>SSL/TLS encryption for all data transmissions</li>
                <li style={{ marginBottom: '8px' }}>Secure data storage with restricted access</li>
                <li style={{ marginBottom: '8px' }}>Regular security monitoring and system audits</li>
                <li style={{ marginBottom: '8px' }}>Security training for all employees</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                While we strive to protect your information, no method of transmission over the internet
                is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <UserCheck style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                4. Your Rights
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                You have the right to:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li style={{ marginBottom: '8px' }}><strong>Correct:</strong> Update or correct inaccurate information.</li>
                <li style={{ marginBottom: '8px' }}><strong>Delete:</strong> Request deletion of your personal information.</li>
                <li style={{ marginBottom: '8px' }}><strong>Restrict:</strong> Request restriction of your data processing.</li>
                <li style={{ marginBottom: '8px' }}><strong>Unsubscribe:</strong> Opt out of receiving marketing communications.</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                To exercise these rights, please contact us via email at{' '}
                <a href="mailto:support@sesoris.com" style={{ color: '#1B5E3B', fontWeight: 500 }}>support@sesoris.com</a>.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              5. Cookies and Tracking Technologies
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              We use cookies and similar technologies to:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Store your preferences and settings</li>
              <li style={{ marginBottom: '8px' }}>Analyze site traffic and usage</li>
              <li style={{ marginBottom: '8px' }}>Personalize content and advertisements</li>
              <li style={{ marginBottom: '8px' }}>Improve user experience</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              You can configure your browser to reject cookies, but this may affect site functionality.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              6. Sharing Information with Third Parties
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              We may share your information with:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Service Providers:</strong> Companies that assist us with shipping, payment, and customer service.</li>
              <li style={{ marginBottom: '8px' }}><strong>Business Partners:</strong> With your consent, for relevant offers.</li>
              <li style={{ marginBottom: '8px' }}><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              We do not sell your personal information to third parties.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              7. Data Retention
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              We retain your personal information for as long as necessary for the purposes described in this policy,
              or as required by law. Once no longer needed, we will securely delete or anonymize
              your information.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              8. Changes to Privacy Policy
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              We may update this Privacy Policy from time to time. Significant changes will be communicated
              via email or a notice on our site. We encourage you to review this policy periodically.
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
                Contact Us
              </h2>
            </div>
            <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: '16px' }}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact:
            </p>
            <div style={{ opacity: 0.9, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Sesoris - Privacy Team</strong></p>
              <p style={{ margin: '0 0 4px' }}>Email: support@sesoris.com</p>
              <p style={{ margin: '0 0 4px' }}>Phone: +62 274 123 4567</p>
              <p style={{ margin: 0 }}>Address: Jl. Malioboro No. 123, Yogyakarta, DIY 55271</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
