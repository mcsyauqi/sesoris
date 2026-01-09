'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faqs } from '@/data/products';

const categories = ['All', 'Shipping', 'Returns', 'Payment', 'Products', 'Orders'];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'FAQ' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="py-12 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#212529] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#6C757D] max-w-md mx-auto mb-8">
            Find answers to common questions about our products, shipping, and more.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  selectedCategory === category
                    ? 'bg-[#1B5E3B] text-white'
                    : 'bg-gray-100 text-[#343A40] hover:bg-gray-200'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-2xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6C757D]">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-[#212529] pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#6C757D] flex-shrink-0 transition-transform',
                          openItems.includes(faq.id) && 'rotate-180'
                        )}
                      />
                    </button>
                    {openItems.includes(faq.id) && (
                      <div className="px-5 pb-5">
                        <p className="text-[#6C757D]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto mt-12 bg-[#F8F9FA] rounded-2xl p-8 text-center">
            <MessageCircle className="w-10 h-10 text-[#1B5E3B] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#212529] mb-2">
              Still have questions?
            </h2>
            <p className="text-[#6C757D] mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
