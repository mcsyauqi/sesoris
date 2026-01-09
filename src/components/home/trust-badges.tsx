import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Orders over $50',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30 Days',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% Protected',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always Here',
  },
];

export function TrustBadges() {
  return (
    <section className="py-8 bg-[#F8F9FA] border-y border-[#E9ECEF]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              <div className="p-3 bg-[#E8F5E9] rounded-xl">
                <badge.icon className="w-6 h-6 text-[#1B5E3B]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#212529] text-sm">
                  {badge.title}
                </h3>
                <p className="text-xs text-[#6C757D]">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
