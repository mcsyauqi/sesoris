'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Rating } from '@/components/ui/rating';
import { testimonials } from '@/data/products';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212529] mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[#6C757D] max-w-md mx-auto">
            Read reviews from our happy customers
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#E8F5E9]" />

            <div className="text-center">
              <p className="text-lg md:text-xl text-[#343A40] mb-6 italic relative z-10">
                "{currentTestimonial.content}"
              </p>

              <Rating value={currentTestimonial.rating} className="justify-center mb-4" />

              <div className="flex items-center justify-center gap-3">
                {currentTestimonial.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-semibold text-[#212529]">
                    {currentTestimonial.name}
                  </p>
                  {currentTestimonial.verified && (
                    <p className="text-sm text-[#28A745] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified Buyer
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-[#343A40]" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      index === currentIndex
                        ? 'bg-[#1B5E3B] w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-[#343A40]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
