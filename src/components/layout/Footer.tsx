'use client';

import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/collection/new-arrivals' },
    { name: 'Best Sellers', href: '/collection/best-sellers' },
    { name: 'On Sale', href: '/collection/sale' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  help: [
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: '#1B5E3B', color: 'white', paddingTop: '64px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px',
          paddingBottom: '48px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Leaf style={{ width: '28px', height: '28px' }} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700 }}>Sesoris</div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Do It With Ease</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.6, marginBottom: '24px' }}>
              Sesoris brings you the best deals for anyone. If you know yourself or looking to treat yourself better, check out our exciting products!
            </p>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 600, marginBottom: '12px' }}>Subscribe to our newsletter</p>
              <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px' }}>
                Get special offers and updates directly to your inbox.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
                <button style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#1B5E3B',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  <Mail style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px' }}>Shop</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.shop.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px' }}>Help</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.help.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px' }}>Company</h3>
            <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
              {footerLinks.company.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Mail style={{ width: '14px', height: '14px' }} />
                hello@sesoris.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Phone style={{ width: '14px', height: '14px' }} />
                +1 234 567 8900
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ width: '14px', height: '14px' }} />
                New York, NY
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', opacity: 0.7 }}>Follow us:</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Facebook style={{ width: '18px', height: '18px', opacity: 0.8 }} />
              <Instagram style={{ width: '18px', height: '18px', opacity: 0.8 }} />
              <Twitter style={{ width: '18px', height: '18px', opacity: 0.8 }} />
              <Youtube style={{ width: '18px', height: '18px', opacity: 0.8 }} />
            </div>
          </div>

          <p style={{ fontSize: '13px', opacity: 0.7 }}>
            © 2026 Sesoris. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', opacity: 0.7 }}>We accept:</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Visa</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Mastercard</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Amex</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>PayPal</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Apple Pay</span>
          </div>
        </div>

        {/* Legal */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px'
        }}>
          <Link href="/privacy" style={{ fontSize: '12px', opacity: 0.6 }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: '12px', opacity: 0.6 }}>Terms of Service</Link>
          <Link href="/cookies" style={{ fontSize: '12px', opacity: 0.6 }}>Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
