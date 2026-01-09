'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, debounce } from '@/lib/utils';
import { searchProducts, products } from '@/data/products';
import type { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = ['Organizer', 'Kitchen', 'Gift Set', 'Gadgets', 'Storage'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const searchResults = searchProducts(searchQuery);
        setResults(searchResults.slice(0, 6));
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    // Save to recent searches
    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    onClose();
    router.push(`/shop?q=${encodeURIComponent(searchTerm)}`);
  };

  const removeRecentSearch = (searchTerm: string) => {
    const updated = recentSearches.filter((s) => s !== searchTerm);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const trendingProducts = products.slice(0, 4);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-20">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
                {/* Search Input */}
                <div className="relative border-b">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-12 py-4 text-lg focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-[#6C757D]" />
                  </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {/* Search Results */}
                  {query.trim().length >= 2 && results.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-[#6C757D] mb-3">
                        Products
                      </h3>
                      <div className="space-y-3">
                        {results.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={product.images[0]?.url || '/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-[#212529] line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-sm text-[#6C757D]">
                                {product.category.name}
                              </p>
                            </div>
                            <p className="font-semibold text-[#1B5E3B]">
                              {formatPrice(product.price)}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <button
                        onClick={() => handleSearch(query)}
                        className="mt-3 flex items-center gap-2 text-sm font-medium text-[#1B5E3B] hover:underline"
                      >
                        View all results
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* No Results */}
                  {query.trim().length >= 2 && results.length === 0 && !isSearching && (
                    <div className="text-center py-8">
                      <p className="text-[#6C757D]">No products found for "{query}"</p>
                    </div>
                  )}

                  {/* Default State */}
                  {query.trim().length < 2 && (
                    <>
                      {/* Popular Searches */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#6C757D] mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Popular Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {popularSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setQuery(term);
                                handleSearch(term);
                              }}
                              className="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-[#E8F5E9] hover:text-[#1B5E3B] transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-[#6C757D] mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Recent Searches
                          </h3>
                          <div className="space-y-2">
                            {recentSearches.map((term) => (
                              <div
                                key={term}
                                className="flex items-center justify-between py-1"
                              >
                                <button
                                  onClick={() => {
                                    setQuery(term);
                                    handleSearch(term);
                                  }}
                                  className="text-sm text-[#343A40] hover:text-[#1B5E3B]"
                                >
                                  {term}
                                </button>
                                <button
                                  onClick={() => removeRecentSearch(term)}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <X className="w-3 h-3 text-[#6C757D]" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trending Products */}
                      <div>
                        <h3 className="text-sm font-semibold text-[#6C757D] mb-3">
                          Trending Products
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {trendingProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              onClick={onClose}
                              className="group"
                            >
                              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                                <Image
                                  src={product.images[0]?.url || '/placeholder.jpg'}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <p className="text-sm font-medium text-[#212529] line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-sm text-[#1B5E3B] font-semibold">
                                {formatPrice(product.price)}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
