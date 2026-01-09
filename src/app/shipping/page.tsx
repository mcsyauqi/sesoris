import Link from 'next/link';
import { Home, ChevronRight, Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';

export default function ShippingPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Pengiriman</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Truck style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Informasi Pengiriman
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Kami berkomitmen mengirimkan pesanan Anda dengan cepat dan aman
            </p>
          </div>

          {/* Shipping Options */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Pilihan Pengiriman
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Reguler', time: '3-5 hari kerja', price: 'Rp 15.000', desc: 'Pengiriman standar ke seluruh Indonesia' },
                { name: 'Express', time: '1-2 hari kerja', price: 'Rp 30.000', desc: 'Pengiriman cepat untuk kebutuhan mendesak' },
                { name: 'Same Day', time: 'Hari yang sama', price: 'Rp 50.000', desc: 'Khusus area Yogyakarta dan sekitarnya' },
              ].map((option) => (
                <div key={option.name} style={{
                  padding: '20px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{option.name}</div>
                    <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '4px' }}>{option.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1B5E3B' }}>
                      <Clock style={{ width: '14px', height: '14px' }} />
                      {option.time}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#1B5E3B', fontSize: '18px' }}>{option.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Shipping */}
          <div style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: 'white',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package style={{ width: '24px', height: '24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Gratis Ongkir!</h3>
            </div>
            <p style={{ opacity: 0.9, marginBottom: '16px' }}>
              Nikmati gratis ongkos kirim untuk setiap pembelian minimal Rp 500.000 ke seluruh Indonesia.
            </p>
            <Link href="/shop" style={{
              display: 'inline-block',
              background: 'white',
              color: '#1B5E3B',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '14px',
            }}>
              Belanja Sekarang
            </Link>
          </div>

          {/* Coverage Area */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Area Pengiriman
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#1B5E3B' }} />
                  <span style={{ fontWeight: 600, color: '#212529' }}>Pulau Jawa</span>
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Estimasi 2-4 hari kerja untuk pengiriman reguler
                </p>
              </div>
              <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#1B5E3B' }} />
                  <span style={{ fontWeight: 600, color: '#212529' }}>Luar Jawa</span>
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Estimasi 4-7 hari kerja untuk pengiriman reguler
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Partners */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Mitra Pengiriman
            </h2>
            <p style={{ color: '#6C757D', marginBottom: '16px' }}>
              Kami bekerja sama dengan ekspedisi terpercaya untuk memastikan paket Anda sampai dengan aman:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['JNE', 'J&T Express', 'SiCepat', 'AnterAja', 'Ninja Express', 'GoSend'].map((partner) => (
                <span key={partner} style={{
                  padding: '8px 16px',
                  background: '#F8F9FA',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#212529',
                }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Pertanyaan Umum
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: 'Bagaimana cara melacak pesanan saya?', a: 'Setelah pesanan dikirim, Anda akan menerima email berisi nomor resi. Gunakan nomor tersebut untuk melacak di halaman Track Order atau website ekspedisi.' },
                { q: 'Apakah bisa kirim ke luar negeri?', a: 'Saat ini kami hanya melayani pengiriman ke seluruh wilayah Indonesia. Untuk pengiriman internasional, silakan hubungi customer service kami.' },
                { q: 'Bagaimana jika paket rusak saat pengiriman?', a: 'Jika paket rusak saat diterima, segera hubungi kami dalam 24 jam dengan melampirkan foto bukti kerusakan. Kami akan memproses penggantian atau refund.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>{item.q}</div>
                  <div style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.6 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#6C757D', marginBottom: '12px' }}>
              Punya pertanyaan lain tentang pengiriman?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
