import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { categories } from '@/data/products';

const collections = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Discover our latest products',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    href: '/collection/new-arrivals',
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    description: 'Our most popular products',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    href: '/collection/best-sellers',
  },
  {
    id: 'sale',
    name: 'On Sale',
    description: 'Great deals on select items',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800',
    href: '/collection/sale',
  },
];

export const metadata = {
  title: 'Collections',
  description: 'Browse our curated collections of unique gifts and home essentials.',
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Collections' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="py-12 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#212529] mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-[#6C757D] max-w-md mx-auto">
            Explore our carefully curated collections of products
          </p>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="pb-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#212529] mb-8">
            Featured Collections
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={collection.href}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#212529] mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
              >
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={category.image || '/placeholder.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-[#212529] group-hover:text-[#1B5E3B] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-[#6C757D]">
                  {category.productCount} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
