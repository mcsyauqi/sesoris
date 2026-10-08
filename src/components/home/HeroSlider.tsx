import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { products, getProductBySlug } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { shortDimensions } from '@/lib/product-dims';
import { FREE_SHIPPING_MIN } from '@/lib/shipping';

// Real catalog items, not mood photography: the hero sells what the store actually ships.
const HERO_SLUGS = [
  'pull-out-under-sink-organizer-2-tier-black',
  'slide-out-cabinet-drawer-black',
  'swivel-cabinet-spice-rack-20-bottles-white',
];

export function HeroSlider() {
  const tiles = HERO_SLUGS.map((s) => getProductBySlug(s)).filter((p) => p !== undefined);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1 className="hero-title">
            Sesoris home organizers that fit <em>the space you have.</em>
          </h1>
          <p className="hero-lede">
            Pull-out cabinet baskets, pantry racks, shoe storage, and travel organizers, each listed
            with its real measurements. Shipped from our US warehouse, free on orders over ${FREE_SHIPPING_MIN}.
          </p>
          <div className="hero-ctas">
            <Link href="/shop" className="btn btn-light">
              Shop all {products.length} organizers <ArrowRight aria-hidden />
            </Link>
            <Link href="/category/kitchen-dining" className="btn btn-ghost-light">
              Kitchen storage
            </Link>
          </div>
        </div>

        <div className="hero-tiles">
          {tiles.map((p, i) => {
            const dims = shortDimensions(p);
            return (
              <Link key={p.slug} href={`/product/${p.slug}`} className={`hero-tile${i === 0 ? ' is-main' : ''}`}>
                <span className="hero-tile-img">
                  <Image
                    src={p.images[0].url}
                    alt={p.images[0].alt}
                    fill
                    priority={i === 0}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    sizes={i === 0 ? '(max-width: 640px) 92vw, (max-width: 1024px) 55vw, 34vw' : '(max-width: 640px) 46vw, (max-width: 1024px) 40vw, 24vw'}
                  />
                </span>
                <span className="hero-tile-caption">
                  <span>
                    <strong>{p.name}</strong>
                    {dims && <small>{dims}</small>}
                  </span>
                  <span className="hero-tile-price">{formatPrice(p.price)}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="ruler" aria-hidden />
    </section>
  );
}
