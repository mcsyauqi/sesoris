import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Globe, Award, Users, Package } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description:
      'We source only the best products, ensuring every item meets our high standards.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description:
      'Eco-friendly practices and sustainable materials are at the heart of what we do.',
  },
  {
    icon: Users,
    title: 'Customer Care',
    description:
      'Your satisfaction is our priority. We\'re here to help every step of the way.',
  },
];

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '500+', label: 'Products' },
  { number: '98%', label: 'Satisfied Customers' },
  { number: '4.8', label: 'Average Rating' },
];

export const metadata = {
  title: 'About Us',
  description: 'Learn about Sesoris - our story, mission, and commitment to bringing you quality products.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'About Us' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#E8F5E9] to-white overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B5E3B]/10 rounded-full mb-6">
              <Leaf className="w-5 h-5 text-[#1B5E3B]" />
              <span className="text-sm font-medium text-[#1B5E3B]">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6">
              Making Life Easier, One Product at a Time
            </h1>
            <p className="text-lg text-[#6C757D]">
              Sesoris was founded with a simple mission: to bring high-quality,
              innovative products that make everyday life easier and more enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <Award className="w-8 h-8 text-[#1B5E3B] mb-2" />
                <p className="font-bold text-2xl text-[#212529]">Since 2020</p>
                <p className="text-sm text-[#6C757D]">Serving customers worldwide</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#212529] mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-[#6C757D]">
                <p>
                  At Sesoris, we believe that the right products can transform your
                  daily routine. What started as a small online store has grown into
                  a trusted destination for thousands of customers seeking quality
                  home essentials, unique gifts, and innovative gadgets.
                </p>
                <p>
                  Our team carefully curates each product, ensuring it meets our
                  standards for quality, functionality, and design. We partner with
                  trusted suppliers and constantly seek out new and exciting items
                  to bring to our customers.
                </p>
                <p>
                  "Do It With Ease" isn't just our tagline – it's our promise. We're
                  committed to making your shopping experience as simple and enjoyable
                  as the products we sell.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-[#F8F9FA]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#212529] mb-4">Our Values</h2>
            <p className="text-[#6C757D] max-w-md mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#E8F5E9] rounded-xl mb-4">
                  <value.icon className="w-7 h-7 text-[#1B5E3B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#212529] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6C757D]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1B5E3B]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E8F5E9]/50 rounded-3xl p-8 md:p-12 text-center">
            <Package className="w-12 h-12 text-[#1B5E3B] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#212529] mb-4">
              Ready to Discover Amazing Products?
            </h2>
            <p className="text-[#6C757D] mb-8 max-w-md mx-auto">
              Browse our collection and find the perfect items for yourself or
              someone special.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center h-12 px-8 bg-[#1B5E3B] text-white font-medium rounded-lg hover:bg-[#2E7D4A] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
