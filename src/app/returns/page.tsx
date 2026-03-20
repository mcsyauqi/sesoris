import Link from 'next/link';
import { Home, ChevronRight, RotateCcw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

export default function ReturnsPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Pengembalian</span>
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
              <RotateCcw style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Kebijakan Pengembalian
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Kepuasan Anda adalah prioritas kami. Jika tidak puas, kembalikan dengan mudah.
            </p>
          </div>

          {/* Return Policy Highlight */}
          <div style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: 'white',
            marginBottom: '48px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>30</div>
            <div style={{ fontSize: '18px', opacity: 0.9 }}>Hari Garansi Kepuasan</div>
            <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>
              Tidak puas dengan produk? Kembalikan dalam 30 hari untuk refund penuh atau tukar produk.
            </p>
          </div>

          {/* Eligible Items */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Syarat Pengembalian
            </h2>
            <div className="returns-conditions-grid" style={{ display: 'grid', gap: '24px' }}>
              <div style={{ padding: '24px', border: '2px solid #28A745', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <CheckCircle style={{ width: '20px', height: '20px', color: '#28A745' }} />
                  <span style={{ fontWeight: 600, color: '#28A745' }}>Dapat Dikembalikan</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#6C757D', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Produk masih dalam kondisi asli</li>
                  <li>Tag dan label masih terpasang</li>
                  <li>Kemasan lengkap</li>
                  <li>Belum pernah digunakan</li>
                  <li>Dalam jangka waktu 30 hari</li>
                </ul>
              </div>
              <div style={{ padding: '24px', border: '2px solid #DC3545', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <XCircle style={{ width: '20px', height: '20px', color: '#DC3545' }} />
                  <span style={{ fontWeight: 600, color: '#DC3545' }}>Tidak Dapat Dikembalikan</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#6C757D', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Produk sudah digunakan</li>
                  <li>Produk custom/personalisasi</li>
                  <li>Produk sale/clearance</li>
                  <li>Produk dengan segel rusak</li>
                  <li>Lewat dari 30 hari pembelian</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Proses Pengembalian
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: 1, title: 'Ajukan Pengembalian', desc: 'Login ke akun Anda, pilih pesanan, lalu klik "Ajukan Pengembalian". Jelaskan alasan pengembalian.' },
                { step: 2, title: 'Tunggu Persetujuan', desc: 'Tim kami akan meninjau permintaan dalam 1-2 hari kerja. Anda akan menerima email konfirmasi.' },
                { step: 3, title: 'Kirim Produk', desc: 'Kemas produk dengan aman dan kirim ke alamat yang tertera. Simpan bukti pengiriman.' },
                { step: 4, title: 'Terima Refund', desc: 'Setelah produk diterima dan diperiksa, refund akan diproses dalam 3-5 hari kerja.' },
              ].map((item) => (
                <div key={item.step} style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: '16px',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#1B5E3B',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '18px',
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Options */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Opsi Pengembalian Dana
            </h2>
            <div className="returns-refund-grid" style={{ display: 'grid', gap: '16px' }}>
              <div style={{ padding: '24px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>Refund ke Saldo Sesoris</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#1B5E3B', marginBottom: '8px' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  Proses 1-2 hari kerja
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Saldo dapat langsung digunakan untuk pembelian berikutnya.
                </p>
              </div>
              <div style={{ padding: '24px', background: '#F8F9FA', borderRadius: '12px' }}>
                <div style={{ fontWeight: 600, color: '#212529', marginBottom: '8px' }}>Refund ke Rekening</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#1B5E3B', marginBottom: '8px' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  Proses 3-5 hari kerja
                </div>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0 }}>
                  Dana dikembalikan ke metode pembayaran asli.
                </p>
              </div>
            </div>
          </div>

          {/* Exchange */}
          <div style={{
            padding: '24px',
            background: '#FFF3CD',
            borderRadius: '12px',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Package style={{ width: '20px', height: '20px', color: '#856404' }} />
              <span style={{ fontWeight: 600, color: '#856404' }}>Tukar Produk</span>
            </div>
            <p style={{ fontSize: '14px', color: '#856404', margin: 0, lineHeight: 1.6 }}>
              Ingin menukar dengan ukuran atau warna berbeda? Pilih opsi &quot;Tukar Produk&quot; saat mengajukan pengembalian.
              Kami akan mengirimkan produk pengganti setelah produk lama diterima.
            </p>
          </div>

          {/* Contact CTA */}
          <div style={{
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#6C757D', marginBottom: '12px' }}>
              Butuh bantuan dengan pengembalian?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Hubungi Customer Service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
