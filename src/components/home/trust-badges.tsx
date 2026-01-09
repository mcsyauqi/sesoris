import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

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
    <section style={{
      padding: '32px 0',
      background: '#F8F9FA',
      borderTop: '1px solid #E9ECEF',
      borderBottom: '1px solid #E9ECEF'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {badges.map((badge) => (
            <div
              key={badge.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                justifyContent: 'center'
              }}
            >
              <div style={{
                padding: '12px',
                background: '#E8F5E9',
                borderRadius: '12px'
              }}>
                <badge.icon style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              </div>
              <div>
                <h3 style={{
                  fontWeight: 600,
                  color: '#212529',
                  fontSize: '14px'
                }}>
                  {badge.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#6C757D' }}>
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
