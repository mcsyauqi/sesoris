import { Truck, Warehouse, RotateCcw, LockKeyhole } from 'lucide-react';
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from '@/lib/shipping';

// Every line here must match checkout.ts and the policy pages. No "24/7" or other unprovable promises.
const values = [
  { icon: Truck, title: `Free shipping over $${FREE_SHIPPING_MIN}`, desc: `Flat $${SHIPPING_FEE} below that` },
  { icon: Warehouse, title: 'Ships from the US', desc: 'Delivery estimate on every product' },
  { icon: RotateCcw, title: '30-day returns', desc: 'Items in original condition' },
  { icon: LockKeyhole, title: 'Secure checkout', desc: 'PayPal, debit, or credit card' },
];

export function TrustBadges() {
  return (
    <section className="values" aria-label="Shopping with Sesoris">
      <ul className="container values-list">
        {values.map(({ icon: Icon, title, desc }) => (
          <li key={title}>
            <Icon aria-hidden />
            <div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
