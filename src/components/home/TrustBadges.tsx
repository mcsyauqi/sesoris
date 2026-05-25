import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const badges = [
  { icon: Truck, title: 'Gratis Ongkir', desc: 'Untuk pesanan di atas Rp 320.000' },
  { icon: RefreshCw, title: 'Retur Mudah', desc: '30 Hari' },
  { icon: Shield, title: 'Pembayaran Aman', desc: '100% Terlindungi' },
  { icon: Headphones, title: 'Bantuan 24/7', desc: 'Selalu Siap Membantu' },
];

export function TrustBadges() {
  return (
    <section style={{
      background: '#F8F9FA',
      borderTop: '1px solid #E9ECEF',
      borderBottom: '1px solid #E9ECEF',
      padding: '20px 0'
    }}>
      <div className="container">
        <div className="grid-trust">
          {badges.map((badge) => (
            <div key={badge.title} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#E8F5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <badge.icon style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#212529' }}>{badge.title}</div>
                <div style={{ fontSize: '12px', color: '#6C757D' }}>{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
