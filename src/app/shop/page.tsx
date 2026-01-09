'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { ProductGrid } from '@/components/product/product-grid';
import { products, categories } from '@/data/products';
import type { SortOption } from '@/types';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'best-selling', label: 'Best Selling' },
];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category.slug)
      );
    }

    // Price range filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(
        (p) => p.price >= range.min && p.price < range.max
      );
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.quantity > 0);
    }

    // On sale filter
    if (onSaleOnly) {
      filtered = filtered.filter(
        (p) => p.compareAtPrice && p.compareAtPrice > p.price
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-selling':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    selectedPriceRange,
    inStockOnly,
    onSaleOnly,
    sortBy,
  ]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange !== null ||
    inStockOnly ||
    onSaleOnly;

  return (
    <>
      {/* Header */}
      <div className="container py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#212529] mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p className="text-[#6C757D]">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="container pb-16">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                      />
                      <span className="text-sm text-[#343A40]">
                        {cat.name}
                      </span>
                      <span className="text-xs text-[#6C757D] ml-auto">
                        ({cat.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === index}
                        onChange={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === index ? null : index
                          )
                        }
                        className="w-4 h-4 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                      />
                      <span className="text-sm text-[#343A40]">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                    />
                    <span className="text-sm text-[#343A40]">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={() => setOnSaleOnly(!onSaleOnly)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                    />
                    <span className="text-sm text-[#343A40]">On Sale</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#DC3545] hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[#1B5E3B] text-white text-xs rounded-full">
                      {selectedCategories.length +
                        (selectedPriceRange !== null ? 1 : 0) +
                        (inStockOnly ? 1 : 0) +
                        (onSaleOnly ? 1 : 0)}
                    </span>
                  )}
                </Button>

                {/* Active Filters Tags */}
                {hasActiveFilters && (
                  <div className="hidden md:flex items-center gap-2 flex-wrap">
                    {selectedCategories.map((slug) => {
                      const cat = categories.find((c) => c.slug === slug);
                      return (
                        <span
                          key={slug}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[#E8F5E9] text-[#1B5E3B] text-sm rounded-full"
                        >
                          {cat?.name}
                          <button onClick={() => toggleCategory(slug)}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                    {selectedPriceRange !== null && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#E8F5E9] text-[#1B5E3B] text-sm rounded-full">
                        {priceRanges[selectedPriceRange].label}
                        <button onClick={() => setSelectedPriceRange(null)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select
                  value={sortBy}
                  onChange={(value) => setSortBy(value as SortOption)}
                  options={sortOptions}
                  className="w-48"
                />

                {/* View Toggle */}
                <div className="hidden md:flex items-center border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid'
                        ? 'bg-[#1B5E3B] text-white'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list'
                        ? 'bg-[#1B5E3B] text-white'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl animate-slide-left overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                      />
                      <span className="text-sm text-[#343A40]">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRangeMobile"
                        checked={selectedPriceRange === index}
                        onChange={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === index ? null : index
                          )
                        }
                        className="w-4 h-4 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                      />
                      <span className="text-sm text-[#343A40]">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-[#212529] mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                    />
                    <span className="text-sm text-[#343A40]">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={() => setOnSaleOnly(!onSaleOnly)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1B5E3B] focus:ring-[#1B5E3B]"
                    />
                    <span className="text-sm text-[#343A40]">On Sale</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 p-4 border-t bg-white flex gap-2">
              <Button variant="outline" onClick={clearFilters} fullWidth>
                Clear All
              </Button>
              <Button onClick={() => setShowFilters(false)} fullWidth>
                Show Results ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ShopLoading() {
  return (
    <div className="container py-8">
      <div className="h-10 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Shop' }]} />
        </div>
      </div>

      <Suspense fallback={<ShopLoading />}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
