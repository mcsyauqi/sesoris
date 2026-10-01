import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getProductBySlug } from '@/data/products';

// Hand-picked spread across rooms (the hero already shows the under-sink, drawer, and spice rack).
const PICKS = [
  'pull-out-cabinet-organizer-20-inch',
  'over-the-door-pantry-organizer-8-tier',
  '10-tier-shoe-rack-black',
  'rolling-egg-holder-double-layer-36',
  'travel-makeup-bag-large',
  'rotating-makeup-organizer-3-tier-green',
  'bamboo-bread-box-double-layer',
  'clear-travel-toiletry-bottle-set-7-piece',
];

export function FeaturedProducts() {
  const picks = PICKS.map((s) => getProductBySlug(s)).filter((p) => p !== undefined);

  return (
    <section className="section-padding" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">Where we would start</h2>
            <p className="section-lede">Eight organizers for the usual clutter spots: deep cabinets, pantry doors, shoe piles, vanities, and suitcases.</p>
          </div>
          <Link href="/shop" className="text-link">
            Shop all <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="grid-products">
          {picks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
