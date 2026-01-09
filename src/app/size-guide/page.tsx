import Link from 'next/link';
import { Home, ChevronRight, Ruler, HelpCircle } from 'lucide-react';

export default function SizeGuidePage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Panduan Ukuran</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              <Ruler style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Panduan Ukuran
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Temukan ukuran yang tepat untuk produk Sesoris
            </p>
          </div>

          {/* Storage Containers */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Kontainer Penyimpanan
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Ukuran</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Dimensi (P x L x T)</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Kapasitas</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Cocok Untuk</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: 'XS', dim: '15 x 10 x 8 cm', cap: '0.5 L', use: 'Bumbu, aksesoris kecil' },
                    { size: 'S', dim: '20 x 15 x 10 cm', cap: '1.5 L', use: 'Snack, alat tulis' },
                    { size: 'M', dim: '30 x 20 x 15 cm', cap: '4.5 L', use: 'Pakaian dalam, mainan' },
                    { size: 'L', dim: '40 x 30 x 20 cm', cap: '12 L', use: 'Pakaian, sepatu' },
                    { size: 'XL', dim: '50 x 40 x 30 cm', cap: '30 L', use: 'Selimut, perlengkapan' },
                  ].map((row, i) => (
                    <tr key={row.size} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1B5E3B' }}>{row.size}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.dim}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.cap}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kitchen Items */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Peralatan Dapur
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Produk</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Ukuran</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Kapasitas</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Porsi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prod: 'Lunch Box', size: '21 x 15 x 6 cm', cap: '1 L', portion: '1 porsi dewasa' },
                    { prod: 'Lunch Box Family', size: '28 x 20 x 8 cm', cap: '2.5 L', portion: '2-3 porsi' },
                    { prod: 'Tumbler Mini', size: 'Ø 7 x 15 cm', cap: '350 ml', portion: '1-2 gelas' },
                    { prod: 'Tumbler Standard', size: 'Ø 7 x 22 cm', cap: '500 ml', portion: '2-3 gelas' },
                    { prod: 'Tumbler Large', size: 'Ø 8 x 26 cm', cap: '750 ml', portion: '3-4 gelas' },
                  ].map((row, i) => (
                    <tr key={row.prod} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500, color: '#212529' }}>{row.prod}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.size}</td>
                      <td style={{ padding: '14px 16px', color: '#1B5E3B', fontWeight: 500 }}>{row.cap}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.portion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bags */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Tas & Organizer
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Tipe</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Dimensi</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Cocok Untuk</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Pouch Mini', dim: '15 x 10 cm', use: 'Kosmetik, kabel, aksesoris' },
                    { type: 'Pouch Medium', dim: '22 x 15 cm', use: 'Tablet, charger, toiletries' },
                    { type: 'Tote Bag S', dim: '30 x 25 x 10 cm', use: 'Belanja ringan, buku' },
                    { type: 'Tote Bag M', dim: '40 x 35 x 12 cm', use: 'Laptop 13", belanja harian' },
                    { type: 'Tote Bag L', dim: '45 x 40 x 15 cm', use: 'Laptop 15", gym, travel' },
                  ].map((row, i) => (
                    <tr key={row.type} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500, color: '#212529' }}>{row.type}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.dim}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div style={{
            padding: '24px',
            background: '#E8F5E9',
            borderRadius: '12px',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <HelpCircle style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
              <span style={{ fontWeight: 600, color: '#1B5E3B' }}>Tips Mengukur</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#212529', fontSize: '14px', lineHeight: 1.8 }}>
              <li>P = Panjang (sisi terpanjang)</li>
              <li>L = Lebar (sisi kedua terpanjang)</li>
              <li>T = Tinggi (dari dasar ke atas)</li>
              <li>Ø = Diameter (untuk produk bulat)</li>
              <li>Kapasitas diukur hingga bibir wadah</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div style={{
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#6C757D', marginBottom: '12px' }}>
              Masih bingung memilih ukuran yang tepat?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Tanya Customer Service Kami
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
