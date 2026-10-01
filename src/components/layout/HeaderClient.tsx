'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingBag, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

type NavCategory = { name: string; slug: string; count: number };

const collections = [
  { name: 'All products', href: '/shop' },
  { name: 'New arrivals', href: '/new-arrivals' },
  { name: 'Best sellers', href: '/best-sellers' },
  { name: 'On sale', href: '/on-sale' },
];

const pages = [
  { name: 'Blog', href: '/blog' },
  { name: 'Track order', href: '/track-order' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const isShopPath = (p: string) => p === '/shop' || p.startsWith('/category/') || p.startsWith('/product/');

export function HeaderClient({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const current = (href: string) =>
    (href === '/blog' ? pathname.startsWith('/blog') : pathname === href) ? 'page' : undefined;

  return (
    <>
      <header className="site-header">
        <div className="container header-bar">
          <Link href="/" className="header-logo" aria-label="Sesoris home">
            <Image src="/logo.webp" alt="Sesoris" width={280} height={90} priority />
          </Link>

          <nav className="header-nav" aria-label="Main">
            <div className="nav-item">
              <Link href="/shop" className="nav-link" aria-current={isShopPath(pathname) ? 'page' : undefined}>
                Shop <ChevronDown aria-hidden />
              </Link>
              <div className="nav-dropdown">
                <div className="nav-dropdown-panel">
                  <div>
                    <div className="nav-dropdown-title">Categories</div>
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/category/${c.slug}`}>
                        {c.name} <span>{c.count}</span>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <div className="nav-dropdown-title">Collections</div>
                    {collections.map((c) => (
                      <Link key={c.href} href={c.href}>{c.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {pages.map((p) => (
              <div className="nav-item" key={p.href}>
                <Link href={p.href} className="nav-link" aria-current={current(p.href)}>{p.name}</Link>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-btn"
              aria-label="Search products"
              aria-expanded={searchOpen}
              aria-controls="header-search"
              onClick={() => setSearchOpen((o) => !o)}
            >
              {searchOpen ? <X /> : <Search />}
            </button>
            <Link href="/wishlist" className="icon-btn" aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}>
              <Heart />
              {wishlistCount > 0 && <span className="icon-btn-count is-accent">{wishlistCount}</span>}
            </Link>
            <Link href="/account" className="icon-btn hide-mobile" aria-label="My account">
              <User />
            </Link>
            <Link href="/cart" className="icon-btn" aria-label={cartCount > 0 ? `Shopping cart, ${cartCount} items` : 'Shopping cart'}>
              <ShoppingBag />
              {cartCount > 0 && <span className="icon-btn-count">{cartCount}</span>}
            </Link>
            <button
              className="icon-btn header-burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* ponytail: plain GET form to /shop?search=, no client routing needed */}
        {searchOpen && (
          <div className="container header-search" id="header-search">
            <form action="/shop" method="get" role="search" className="search-form">
              <label htmlFor="header-search-input" className="sr-only">Search products</label>
              <input id="header-search-input" name="search" type="search" required autoFocus placeholder="Search organizers, racks, bags…" className="field" />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
        )}
      </header>

      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="drawer-head">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Sesoris home">
            <Image src="/logo.webp" alt="Sesoris" width={280} height={90} style={{ height: '32px', width: 'auto' }} />
          </Link>
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
            <X />
          </button>
        </div>

        <div className="drawer-section">
          <form action="/shop" method="get" role="search" className="search-form" style={{ maxWidth: 'none' }}>
            <label htmlFor="mobile-search" className="sr-only">Search products</label>
            <input id="mobile-search" name="search" type="search" required placeholder="Search products" className="field" />
            <button type="submit" className="btn btn-primary" aria-label="Search"><Search /></button>
          </form>
        </div>

        <nav aria-label="Mobile">
          <div className="drawer-section">
            <div className="drawer-label">Shop by category</div>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="drawer-link" aria-current={pathname === `/category/${c.slug}` ? 'page' : undefined}>
                {c.name} <span>{c.count}</span>
              </Link>
            ))}
            <Link href="/shop" className="drawer-link" aria-current={pathname === '/shop' ? 'page' : undefined}>
              All products <ChevronRight />
            </Link>
          </div>
          <div className="drawer-section">
            {pages.map((p) => (
              <Link key={p.href} href={p.href} className="drawer-link" aria-current={current(p.href)}>
                {p.name}
              </Link>
            ))}
            <Link href="/account" className="drawer-link" aria-current={current('/account')}>
              My account
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
