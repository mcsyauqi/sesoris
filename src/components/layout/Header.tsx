'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop', hasDropdown: true },
  { name: 'Collections', href: '/collections' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const shopLinks = [
  { name: 'All Products', href: '/shop' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Best Sellers', href: '/best-sellers' },
  { name: 'On Sale', href: '/on-sale' },
];

export function Header() {
  const pathname = usePathname();
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileShopOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E9ECEF',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px'
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Image
                src="/logo.webp"
                alt="Sesoris"
                width={280}
                height={90}
                priority
                style={{ height: '38px', width: 'auto' }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hide-mobile" style={{ alignItems: 'center', gap: '2px' }}>
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.hasDropdown && setShopDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setShopDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: pathname === link.href ? '#1B5E3B' : '#343A40',
                      background: pathname === link.href ? '#E8F5E9' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown style={{
                        width: '14px', height: '14px',
                        transition: 'transform 0.2s',
                        transform: shopDropdownOpen ? 'rotate(180deg)' : 'rotate(0)'
                      }} />
                    )}
                  </Link>

                  {/* Shop Dropdown */}
                  {link.hasDropdown && shopDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      paddingTop: '8px',
                      zIndex: 50
                    }}>
                      <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                        padding: '8px 0',
                        minWidth: '200px',
                        border: '1px solid #E9ECEF'
                      }}>
                        {shopLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            style={{
                              display: 'block',
                              padding: '10px 16px',
                              fontSize: '14px',
                              color: '#343A40',
                              transition: 'background 0.2s'
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <button className="hide-mobile" style={{
                padding: '10px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                <Search style={{ width: '20px', height: '20px', color: '#343A40' }} />
              </button>

              <Link href="/wishlist" style={{
                position: 'relative',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex'
              }}>
                <Heart style={{ width: '20px', height: '20px', color: '#343A40' }} />
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '16px',
                    height: '16px',
                    background: '#FF6B35',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/account" className="hide-mobile" style={{
                padding: '10px',
                borderRadius: '8px'
              }}>
                <User style={{ width: '20px', height: '20px', color: '#343A40' }} />
              </Link>

              <Link
                href="/cart"
                style={{
                  position: 'relative',
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex'
                }}
              >
                <ShoppingCart style={{ width: '20px', height: '20px', color: '#343A40' }} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '16px',
                    height: '16px',
                    background: '#1B5E3B',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="show-mobile"
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu style={{ width: '24px', height: '24px', color: '#343A40' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {/* Close button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #E9ECEF'
        }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/logo.webp" alt="Sesoris" width={280} height={90} style={{ height: '32px', width: 'auto' }} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: '#F8F9FA',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav style={{ padding: '12px 0' }}>
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasDropdown ? (
                <>
                  <button
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '15px',
                      fontWeight: pathname === link.href ? 600 : 500,
                      color: pathname === link.href ? '#1B5E3B' : '#212529',
                      cursor: 'pointer'
                    }}
                  >
                    {link.name}
                    <ChevronDown style={{
                      width: '16px', height: '16px',
                      transition: 'transform 0.2s',
                      transform: mobileShopOpen ? 'rotate(180deg)' : 'rotate(0)'
                    }} />
                  </button>
                  {mobileShopOpen && (
                    <div style={{ background: '#F8F9FA' }}>
                      {shopLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: 'block',
                            padding: '12px 20px 12px 36px',
                            fontSize: '14px',
                            color: '#6C757D',
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 20px',
                    fontSize: '15px',
                    fontWeight: pathname === link.href ? 600 : 500,
                    color: pathname === link.href ? '#1B5E3B' : '#212529',
                  }}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Bottom Actions */}
        <div style={{
          borderTop: '1px solid #E9ECEF',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#F8F9FA',
              fontSize: '14px',
              fontWeight: 500,
              color: '#212529'
            }}
          >
            <User style={{ width: '18px', height: '18px' }} />
            My Account
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#F8F9FA',
              fontSize: '14px',
              fontWeight: 500,
              color: '#212529'
            }}
          >
            <Search style={{ width: '18px', height: '18px' }} />
            Track Order
          </Link>
        </div>
      </div>
    </>
  );
}
