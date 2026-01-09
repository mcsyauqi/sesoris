'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Belanja', href: '/shop', hasDropdown: true },
  { name: 'Koleksi', href: '/collections' },
  { name: 'Lacak Pesanan', href: '/track-order' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  return (
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
          height: '72px'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.svg"
              alt="Sesoris"
              width={160}
              height={50}
              priority
              style={{ height: '45px', width: 'auto' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: pathname === link.href ? '#1B5E3B' : '#343A40',
                    background: pathname === link.href ? '#E8F5E9' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown style={{ width: '14px', height: '14px' }} />}
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
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      padding: '8px 0',
                      minWidth: '200px',
                      border: '1px solid #E9ECEF'
                    }}>
                      {[
                        { name: 'Semua Produk', href: '/shop' },
                        { name: 'Produk Terbaru', href: '/new-arrivals' },
                        { name: 'Terlaris', href: '/best-sellers' },
                        { name: 'Promo', href: '/on-sale' },
                      ].map((item) => (
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button style={{
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

            <Link href="/account" style={{
              padding: '10px',
              borderRadius: '8px',
              display: 'flex'
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
          </div>
        </div>
      </div>
    </header>
  );
}
