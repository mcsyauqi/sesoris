import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                alt="Sesoris Store"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Logo */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Leaf className="w-10 h-10 text-[#1B5E3B]" />
                <div>
                  <span className="text-xl font-bold text-[#1B5E3B] block">Sesoris</span>
                  <span className="text-xs text-[#6C757D]">Do It With Ease</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#E8F5E9] text-[#1B5E3B] text-sm font-medium rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#212529] mb-6">
              Why Choose Sesoris?
            </h2>
            <p className="text-[#6C757D] text-lg mb-6">
              Sesoris brings you the best deals for anyone. If you know yourself or
              looking to treat yourself better, check out our exciting products!
            </p>
            <p className="text-[#6C757D] mb-8">
              We carefully curate each product to ensure quality, functionality, and
              style. Our mission is to make finding the perfect gift or treat for
              yourself as easy as possible.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-[#1B5E3B]">50K+</p>
                <p className="text-sm text-[#6C757D]">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1B5E3B]">500+</p>
                <p className="text-sm text-[#6C757D]">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1B5E3B]">4.8</p>
                <p className="text-sm text-[#6C757D]">Avg. Rating</p>
              </div>
            </div>

            <Button asChild size="lg">
              <Link href="/about" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
