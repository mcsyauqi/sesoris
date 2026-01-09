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
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useUIStore } from '@/stores/ui-store';
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
        className={cn(
          'sticky top-0 z-40 bg-white transition-all duration-300',
          isScrolled ? 'shadow-md py-3' : 'py-4'
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <Leaf className="w-8 h-8 text-[#1B5E3B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#1B5E3B] leading-tight">
                  Sesoris
                </span>
                <span className="text-[10px] text-[#6C757D] leading-none hidden sm:block">
                  Do It With Ease
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      pathname === item.href
                        ? 'text-[#1B5E3B] bg-[#E8F5E9]'
                        : 'text-[#343A40] hover:text-[#1B5E3B] hover:bg-[#E8F5E9]'
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && hoveredNav === item.name && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] animate-fade-in">
                        {item.name === 'Shop' && (
                          <>
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-[#343A40] hover:bg-[#E8F5E9] hover:text-[#1B5E3B] transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                            <div className="border-t border-gray-100 my-2" />
                            <div className="px-4 py-2 text-xs font-semibold text-[#6C757D] uppercase">
                              Categories
                            </div>
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="block px-4 py-2 text-sm text-[#343A40] hover:bg-[#E8F5E9] hover:text-[#1B5E3B] transition-colors"
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
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#343A40]" />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#343A40]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-[#343A40]" />
              </Link>

              <button
                onClick={openCart}
                className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#343A40]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1B5E3B] text-white text-xs font-bold rounded-full flex items-center justify-center">
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
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl animate-slide-right">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Leaf className="w-7 h-7 text-[#1B5E3B]" />
                <span className="text-lg font-bold text-[#1B5E3B]">Sesoris</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
                      pathname === item.href
                        ? 'bg-[#E8F5E9] text-[#1B5E3B]'
                        : 'text-[#343A40] hover:bg-gray-100'
                    )}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-[#6C757D] hover:text-[#1B5E3B] transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
              <div className="flex gap-2 mb-4">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1B5E3B] text-white rounded-lg hover:bg-[#2E7D4A] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Account</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#1B5E3B] text-[#1B5E3B] rounded-lg hover:bg-[#E8F5E9] transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Wishlist ({wishlistCount})</span>
                </Link>
              </div>
              <div className="space-y-2 text-sm text-[#6C757D]">
                <a href="mailto:hello@sesoris.com" className="flex items-center gap-2 hover:text-[#1B5E3B]">
                  <Mail className="w-4 h-4" />
                  hello@sesoris.com
                </a>
                <a href="tel:+12345678900" className="flex items-center gap-2 hover:text-[#1B5E3B]">
                  <Phone className="w-4 h-4" />
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
