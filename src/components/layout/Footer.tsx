'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'On Sale', href: '/on-sale' },
    { name: 'Collections', href: '/collections' },
  ],
  help: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  popularArticles: [
    { name: 'Cara Menata Kamar Kost', href: '/blog/cara-menata-kamar-kost' },
    { name: 'Inspirasi Dapur Minimalis', href: '/blog/inspirasi-dapur-minimalis' },
    { name: 'Kotak Penyimpanan Terbaik', href: '/blog/kotak-penyimpanan' },
    { name: 'Perlengkapan Rumah Minimalis', href: '/blog/perlengkapan-rumah-minimalis' },
    { name: 'Rak Gantung Dapur', href: '/blog/rak-gantung-dapur' },
    { name: 'Storage Box Lipat', href: '/blog/storage-box-lipat' },
    { name: 'Tempat Penyimpanan ASI', href: '/blog/tempat-penyimpanan-asi' },
    { name: 'Teras Rumah Minimalis', href: '/blog/teras-rumah-minimalis' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <footer style={{ background: '#1B5E3B', color: 'white', paddingTop: '48px' }}>
      <div className="container">
        <div className="grid-footer" style={{ paddingBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Image
                src="/logo.webp"
                alt="Sesoris"
                width={280}
                height={90}
                style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Do It With Ease</div>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.6, marginBottom: '24px' }}>
              Sesoris is here to help you organize your life with high-quality products.
              Discover the best storage solutions and home essentials for modern living.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>Subscribe to Newsletter</p>
              <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px' }}>
                Get the latest deals and product updates straight to your inbox.
              </p>
              {status === 'success' ? (
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  color: 'white',
                }}>
                  ✓ {message}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: status === 'error' ? '1px solid #ff6b6b' : 'none',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '14px',
                      minWidth: 0,
                      opacity: status === 'loading' ? 0.7 : 1,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: 'white',
                      color: '#1B5E3B',
                      border: 'none',
                      fontWeight: 600,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      opacity: status === 'loading' ? 0.7 : 1,
                    }}
                  >
                    <Mail style={{ width: '16px', height: '16px' }} />
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '6px' }}>{message}</p>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px', fontSize: '15px' }}>Shop</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.shop.map((link) => (
                <li key={link.name} style={{ marginBottom: '10px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px', fontSize: '15px' }}>Help</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.help.map((link) => (
                <li key={link.name} style={{ marginBottom: '10px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '20px', fontSize: '15px' }}>Company</h3>
            <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
              {footerLinks.company.map((link) => (
                <li key={link.name} style={{ marginBottom: '10px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', opacity: 0.8 }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Mail style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                sesoris.store@gmail.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Phone style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                +62 274 123 4567
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin style={{ width: '14px', height: '14px', marginTop: '2px', flexShrink: 0 }} />
                <span>
                  Yogyakarta, Indonesia<br />
                  Online store with worldwide shipping
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 0' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '14px', opacity: 0.9 }}>Popular Articles</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
            {footerLinks.popularArticles.map((link) => (
              <Link key={link.name} href={link.href} style={{ fontSize: '13px', opacity: 0.7 }}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
          <div className="footer-bottom">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', opacity: 0.7 }}>Follow us:</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://facebook.com/sesoris" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Facebook style={{ width: '18px', height: '18px', opacity: 0.8 }} />
                </a>
                <a href="https://instagram.com/sesoris_com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Instagram style={{ width: '18px', height: '18px', opacity: 0.8 }} />
                </a>
                <a href="https://twitter.com/sesoris_com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Twitter style={{ width: '18px', height: '18px', opacity: 0.8 }} />
                </a>
                <a href="https://youtube.com/@sesoris" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Youtube style={{ width: '18px', height: '18px', opacity: 0.8 }} />
                </a>
              </div>
            </div>

            <p style={{ fontSize: '13px', opacity: 0.7 }}>
              © 2026 Sesoris. All rights reserved.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '13px', opacity: 0.7 }}>Payment:</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>BCA</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>Mandiri</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>GoPay</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>OVO</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>DANA</span>
            </div>
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
          <Link href="/terms" style={{ fontSize: '12px', opacity: 0.6 }}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
