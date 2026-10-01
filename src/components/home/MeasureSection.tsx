import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// A real three-step sequence, so the numbers carry meaning. Example figures come from
// the 20 in. pull-out listing in src/data/products.ts (minimum opening 22.3 in. wide).
export function MeasureSection() {
  return (
    <section className="measure section-padding">
      <div className="container measure-grid">
        <div>
          <h2 className="section-title">Measure once, order once.</h2>
          <p className="section-lede">
            Our listings give real dimensions, and the cabinet organizers also list the smallest
            opening they fit. A tape measure and two minutes save you a return.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/product/pull-out-cabinet-organizer-20-inch" className="text-link">
              See a full sizing example <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="ruler" aria-hidden />
        </div>

        <ol className="measure-steps">
          <li>
            <h3>Measure the inside</h3>
            <p>Width, depth, and height inside the cabinet, closet, or door. Note hinges, face frames, and pipes that eat into the space.</p>
          </li>
          <li>
            <h3>Check the minimum opening</h3>
            <p>Compare with the product specs. The 20 in. pull-out basket, for example, needs an opening at least 22.3 in. wide and 22.2 in. deep.</p>
          </li>
          <li>
            <h3>Install and load it up</h3>
            <p>Pull-out baskets screw into the cabinet floor. Adhesive drawers and over-the-door racks go up without drilling.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
