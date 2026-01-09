import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const badges = [
  { icon: Truck, title: 'Free Shipping', desc: 'Orders over $50' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30 Days' },
  { icon: Shield, title: 'Secure Payment', desc: '100% Protected' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always Here' },
];

export function TrustBadges() {
  return (
    <section style={{
      background: '#F8F9FA',
      borderTop: '1px solid #E9ECEF',
      borderBottom: '1px solid #E9ECEF',
      padding: '24px 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {badges.map((badge) => (
            <div key={badge.title} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#E8F5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <badge.icon style={{ width: '22px', height: '22px', color: '#1B5E3B' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#212529' }}>{badge.title}</div>
                <div style={{ fontSize: '12px', color: '#6C757D' }}>{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
