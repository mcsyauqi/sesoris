import Link from 'next/link';
import { Home, ChevronRight, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Kebijakan Privasi</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#E8F5E9',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Shield style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Kebijakan Privasi
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Terakhir diperbarui: 1 Januari 2026
            </p>
          </div>

          <div style={{ background: '#F8F9FA', padding: '20px 24px', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ color: '#495057', lineHeight: 1.7, margin: 0 }}>
              Sesoris berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
              menggunakan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
            </p>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Database style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                1. Informasi yang Kami Kumpulkan
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Informasi Akun:</strong> Nama, alamat email, nomor telepon, dan kata sandi saat Anda mendaftar akun.</li>
                <li style={{ marginBottom: '8px' }}><strong>Informasi Pengiriman:</strong> Alamat lengkap, kode pos, dan instruksi pengiriman khusus.</li>
                <li style={{ marginBottom: '8px' }}><strong>Informasi Pembayaran:</strong> Detail kartu kredit/debit atau metode pembayaran lainnya (diproses secara aman melalui penyedia pembayaran pihak ketiga).</li>
                <li style={{ marginBottom: '8px' }}><strong>Riwayat Pesanan:</strong> Produk yang Anda beli, tanggal pembelian, dan preferensi belanja.</li>
                <li style={{ marginBottom: '8px' }}><strong>Komunikasi:</strong> Pesan yang Anda kirimkan melalui layanan pelanggan kami.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Eye style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                2. Bagaimana Kami Menggunakan Informasi Anda
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Memproses dan mengirimkan pesanan Anda</li>
                <li style={{ marginBottom: '8px' }}>Mengirimkan konfirmasi pesanan dan pembaruan pengiriman</li>
                <li style={{ marginBottom: '8px' }}>Merespons pertanyaan dan permintaan layanan pelanggan</li>
                <li style={{ marginBottom: '8px' }}>Mengirimkan newsletter dan informasi promosi (jika Anda berlangganan)</li>
                <li style={{ marginBottom: '8px' }}>Meningkatkan produk dan layanan kami</li>
                <li style={{ marginBottom: '8px' }}>Mencegah penipuan dan menjaga keamanan platform</li>
                <li style={{ marginBottom: '8px' }}>Mematuhi kewajiban hukum</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Lock style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                3. Keamanan Data
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Enkripsi SSL/TLS untuk semua transmisi data</li>
                <li style={{ marginBottom: '8px' }}>Penyimpanan data yang aman dengan akses terbatas</li>
                <li style={{ marginBottom: '8px' }}>Pemantauan keamanan rutin dan audit sistem</li>
                <li style={{ marginBottom: '8px' }}>Pelatihan keamanan untuk semua karyawan</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                Meskipun kami berusaha keras untuk melindungi informasi Anda, tidak ada metode transmisi melalui internet
                yang 100% aman. Kami tidak dapat menjamin keamanan absolut.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <UserCheck style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                4. Hak Anda
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Anda memiliki hak untuk:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Mengakses:</strong> Meminta salinan informasi pribadi yang kami simpan tentang Anda.</li>
                <li style={{ marginBottom: '8px' }}><strong>Memperbaiki:</strong> Memperbarui atau memperbaiki informasi yang tidak akurat.</li>
                <li style={{ marginBottom: '8px' }}><strong>Menghapus:</strong> Meminta penghapusan informasi pribadi Anda.</li>
                <li style={{ marginBottom: '8px' }}><strong>Membatasi:</strong> Meminta pembatasan pemrosesan data Anda.</li>
                <li style={{ marginBottom: '8px' }}><strong>Berhenti Berlangganan:</strong> Memilih untuk tidak menerima komunikasi pemasaran.</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui email di{' '}
                <a href="mailto:privasi@sesoris.id" style={{ color: '#1B5E3B', fontWeight: 500 }}>privasi@sesoris.id</a>.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              5. Cookies dan Teknologi Pelacakan
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              Kami menggunakan cookies dan teknologi serupa untuk:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Menyimpan preferensi dan pengaturan Anda</li>
              <li style={{ marginBottom: '8px' }}>Menganalisis lalu lintas dan penggunaan situs</li>
              <li style={{ marginBottom: '8px' }}>Mempersonalisasi konten dan iklan</li>
              <li style={{ marginBottom: '8px' }}>Meningkatkan pengalaman pengguna</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              Anda dapat mengatur browser Anda untuk menolak cookies, namun ini mungkin mempengaruhi fungsionalitas situs.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              6. Berbagi Informasi dengan Pihak Ketiga
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              Kami dapat berbagi informasi Anda dengan:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Penyedia Layanan:</strong> Perusahaan yang membantu kami dalam pengiriman, pembayaran, dan layanan pelanggan.</li>
              <li style={{ marginBottom: '8px' }}><strong>Mitra Bisnis:</strong> Dengan persetujuan Anda, untuk penawaran yang relevan.</li>
              <li style={{ marginBottom: '8px' }}><strong>Otoritas Hukum:</strong> Jika diwajibkan oleh hukum atau untuk melindungi hak kami.</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              7. Penyimpanan Data
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              Kami menyimpan informasi pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini,
              atau selama diwajibkan oleh hukum. Setelah tidak diperlukan lagi, kami akan menghapus atau menganonimkan
              informasi Anda secara aman.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              8. Perubahan Kebijakan Privasi
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan
              melalui email atau pemberitahuan di situs kami. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
            </p>
          </section>

          {/* Contact */}
          <section style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
            padding: '32px',
            borderRadius: '16px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Mail style={{ width: '24px', height: '24px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
                Hubungi Kami
              </h2>
            </div>
            <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: '16px' }}>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi:
            </p>
            <div style={{ opacity: 0.9, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Sesoris - Tim Privasi</strong></p>
              <p style={{ margin: '0 0 4px' }}>Email: privasi@sesoris.id</p>
              <p style={{ margin: '0 0 4px' }}>Telepon: +62 274 123 4567</p>
              <p style={{ margin: 0 }}>Alamat: Jl. Malioboro No. 123, Yogyakarta, DIY 55271</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
