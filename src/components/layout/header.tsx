'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Leaf,
} from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { categories } from '@/data/products';
import { SearchModal } from '@/components/search/search-modal';
import { CartSidebar } from '@/components/cart/cart-sidebar';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Shop',
    href: '/shop',
    children: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/collection/new-arrivals' },
      { name: 'Best Sellers', href: '/collection/best-sellers' },
      { name: 'On Sale', href: '/collection/sale' },
    ],
  },
  { name: 'Collections', href: '/collections' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getItemCount());
  const { isOpen: isCartOpen, openCart, closeCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'white',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 4px 8px rgba(0,0,0,0.08)' : 'none',
          padding: isScrolled ? '12px 0' : '16px 0'
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                padding: '8px',
                marginLeft: '-8px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'none'
              }}
              className="lg-hidden"
            >
              <Menu style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Leaf style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1B5E3B', lineHeight: 1.2 }}>
                  Sesoris
                </span>
                <span style={{ fontSize: '10px', color: '#6C757D', lineHeight: 1 }}>
                  Do It With Ease
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navigation.map((item) => (
                <div
                  key={item.name}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      color: pathname === item.href ? '#1B5E3B' : '#343A40',
                      background: pathname === item.href ? '#E8F5E9' : 'transparent'
                    }}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown style={{ width: '16px', height: '16px' }} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && hoveredNav === item.name && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      paddingTop: '8px'
                    }}>
                      <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        border: '1px solid #E9ECEF',
                        padding: '8px 0',
                        minWidth: '200px'
                      }}>
                        {item.name === 'Shop' && (
                          <>
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                style={{
                                  display: 'block',
                                  padding: '8px 16px',
                                  fontSize: '14px',
                                  color: '#343A40',
                                  textDecoration: 'none'
                                }}
                              >
                                {child.name}
                              </Link>
                            ))}
                            <div style={{
                              borderTop: '1px solid #E9ECEF',
                              margin: '8px 0'
                            }} />
                            <div style={{
                              padding: '8px 16px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#6C757D',
                              textTransform: 'uppercase'
                            }}>
                              Categories
                            </div>
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                style={{
                                  display: 'block',
                                  padding: '8px 16px',
                                  fontSize: '14px',
                                  color: '#343A40',
                                  textDecoration: 'none'
                                }}
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Search"
              >
                <Search style={{ width: '20px', height: '20px', color: '#343A40' }} />
              </button>

              <Link
                href="/wishlist"
                style={{
                  position: 'relative',
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  textDecoration: 'none'
                }}
                aria-label="Wishlist"
              >
                <Heart style={{ width: '20px', height: '20px', color: '#343A40' }} />
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '18px',
                    height: '18px',
                    background: '#FF6B35',
                    color: 'white',
                    fontSize: '11px',
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

              <Link
                href="/account"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  textDecoration: 'none'
                }}
                aria-label="Account"
              >
                <User style={{ width: '20px', height: '20px', color: '#343A40' }} />
              </Link>

              <button
                onClick={openCart}
                style={{
                  position: 'relative',
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Cart"
              >
                <ShoppingCart style={{ width: '20px', height: '20px', color: '#343A40' }} />
                {cartItemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '18px',
                    height: '18px',
                    background: '#1B5E3B',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)'
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '384px',
            background: 'white',
            boxShadow: '8px 0 32px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid #E9ECEF'
            }}>
              <Link
                href="/"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Leaf style={{ width: '28px', height: '28px', color: '#1B5E3B' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#1B5E3B' }}>Sesoris</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            <nav style={{ padding: '16px', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: pathname === item.href ? '#1B5E3B' : '#343A40',
                      background: pathname === item.href ? '#E8F5E9' : 'transparent'
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            fontSize: '14px',
                            color: '#6C757D',
                            textDecoration: 'none'
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px',
              borderTop: '1px solid #E9ECEF',
              background: '#F8F9FA'
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    background: '#1B5E3B',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  <User style={{ width: '16px', height: '16px' }} />
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    border: '1px solid #1B5E3B',
                    color: '#1B5E3B',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    background: 'white'
                  }}
                >
                  <Heart style={{ width: '16px', height: '16px' }} />
                  Wishlist ({wishlistCount})
                </Link>
              </div>
              <div style={{ fontSize: '14px', color: '#6C757D' }}>
                <a href="mailto:hello@sesoris.com" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                  <Mail style={{ width: '16px', height: '16px' }} />
                  hello@sesoris.com
                </a>
                <a href="tel:+12345678900" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                  <Phone style={{ width: '16px', height: '16px' }} />
                  +1 234 567 8900
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
