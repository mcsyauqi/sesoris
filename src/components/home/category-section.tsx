import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { categories } from '@/data/products';

export function CategorySection() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212529] mb-3">
            Shop by Category
          </h2>
          <p className="text-[#6C757D] max-w-md mx-auto">
            Find the perfect product for every need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={category.image || '/placeholder.jpg'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-0.5">{category.name}</h3>
                  <p className="text-sm text-white/70">
                    {category.productCount} items
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
