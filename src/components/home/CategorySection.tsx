import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug } from '@/data/products';

// Tile order + art direction. Images are catalog photos chosen to read at tile size.
const TILES = [
  { slug: 'kitchen-dining', image: '/images/products/stackable-water-bottle-organizer-4-tier-1.webp', variant: 'is-lead' },
  { slug: 'home-living', image: '/images/products/folding-storage-cabinet-4-tier-wheels-small-1.webp', variant: 'is-wide' },
  { slug: 'bags-pouches', image: '/images/products/three-section-pu-leather-toiletry-bag-white-1.webp', variant: '' },
  { slug: 'outdoor-travel', image: '/images/products/packing-cubes-9-piece-set-1.webp', variant: '' },
];

export function CategorySection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">Shop by category</h2>
            <p className="section-lede">Start with the room that bothers you most.</p>
          </div>
          <Link href="/shop" className="text-link">
            All products <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="cat-grid">
          {TILES.map((t) => {
            const cat = getCategoryBySlug(t.slug);
            if (!cat) return null;
            return (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className={`cat-tile ${t.variant}`}>
                <div>
                  <div className="cat-tile-name">{cat.name}</div>
                  <div className="cat-tile-count">
                    {cat.productCount} {cat.productCount === 1 ? 'product' : 'products'}
                  </div>
                </div>
                <span className="cat-tile-arrow" aria-hidden><ArrowRight /></span>
                <span className="cat-tile-img">
                  <Image src={t.image} alt="" fill sizes="(max-width: 900px) 45vw, 30vw" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
