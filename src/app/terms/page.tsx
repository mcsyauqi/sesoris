import Link from 'next/link';
import { Home, ChevronRight, FileText, ShoppingBag, Truck, RefreshCw, AlertTriangle, Scale, Mail } from 'lucide-react';

export default function TermsPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Syarat & Ketentuan</span>
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
              <FileText style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Syarat & Ketentuan
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Terakhir diperbarui: 1 Januari 2026
            </p>
          </div>

          <div style={{ background: '#F8F9FA', padding: '20px 24px', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ color: '#495057', lineHeight: 1.7, margin: 0 }}>
              Selamat datang di Sesoris. Dengan mengakses dan menggunakan situs web kami, Anda menyetujui untuk terikat
              dengan syarat dan ketentuan berikut. Mohon baca dengan seksama sebelum melakukan pembelian.
            </p>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              1. Ketentuan Umum
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              Dengan menggunakan layanan Sesoris, Anda menyatakan bahwa:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Anda berusia minimal 18 tahun atau memiliki izin dari orang tua/wali.</li>
              <li style={{ marginBottom: '8px' }}>Informasi yang Anda berikan adalah akurat dan lengkap.</li>
              <li style={{ marginBottom: '8px' }}>Anda bertanggung jawab untuk menjaga kerahasiaan akun Anda.</li>
              <li style={{ marginBottom: '8px' }}>Anda tidak akan menggunakan layanan kami untuk tujuan ilegal.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShoppingBag style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                2. Pemesanan dan Pembayaran
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>2.1 Proses Pemesanan</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Semua pesanan tunduk pada ketersediaan produk.</li>
                <li style={{ marginBottom: '8px' }}>Kami berhak menolak atau membatalkan pesanan dengan alasan yang wajar.</li>
                <li style={{ marginBottom: '8px' }}>Konfirmasi pesanan akan dikirimkan melalui email setelah pembayaran berhasil.</li>
                <li style={{ marginBottom: '8px' }}>Harga dapat berubah tanpa pemberitahuan sebelumnya, namun tidak mempengaruhi pesanan yang sudah dikonfirmasi.</li>
              </ul>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>2.2 Metode Pembayaran</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Transfer Bank (BCA, Mandiri, BNI, BRI)</li>
                <li style={{ marginBottom: '8px' }}>Kartu Kredit/Debit (Visa, Mastercard)</li>
                <li style={{ marginBottom: '8px' }}>E-Wallet (GoPay, OVO, DANA, ShopeePay)</li>
                <li style={{ marginBottom: '8px' }}>Virtual Account</li>
                <li style={{ marginBottom: '8px' }}>Cicilan 0% (untuk pembelian minimum tertentu)</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Truck style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                3. Pengiriman
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Pesanan diproses dalam 1-2 hari kerja setelah pembayaran dikonfirmasi.</li>
                <li style={{ marginBottom: '8px' }}>Estimasi waktu pengiriman: 2-5 hari kerja (tergantung lokasi).</li>
                <li style={{ marginBottom: '8px' }}>Biaya pengiriman dihitung berdasarkan berat dan lokasi pengiriman.</li>
                <li style={{ marginBottom: '8px' }}>Gratis ongkir untuk pembelian di atas Rp500.000 (area tertentu).</li>
                <li style={{ marginBottom: '8px' }}>Risiko kehilangan atau kerusakan selama pengiriman ditanggung oleh jasa ekspedisi.</li>
                <li style={{ marginBottom: '8px' }}>Harap periksa paket saat diterima dan laporkan kerusakan dalam 24 jam.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <RefreshCw style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                4. Pengembalian dan Refund
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>4.1 Kebijakan Pengembalian</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Produk dapat dikembalikan dalam waktu 30 hari setelah diterima.</li>
                <li style={{ marginBottom: '8px' }}>Produk harus dalam kondisi asli, belum digunakan, dengan kemasan lengkap.</li>
                <li style={{ marginBottom: '8px' }}>Produk yang sudah dipersonalisasi atau custom tidak dapat dikembalikan.</li>
                <li style={{ marginBottom: '8px' }}>Biaya pengiriman pengembalian ditanggung pembeli, kecuali produk cacat/salah kirim.</li>
              </ul>

              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>4.2 Proses Refund</h3>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Refund diproses dalam 7-14 hari kerja setelah produk diterima dan diverifikasi.</li>
                <li style={{ marginBottom: '8px' }}>Refund akan dikembalikan ke metode pembayaran asli.</li>
                <li style={{ marginBottom: '8px' }}>Untuk pembayaran COD, refund melalui transfer bank.</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7, marginTop: '16px' }}>
                Untuk informasi lengkap, silakan kunjungi halaman{' '}
                <Link href="/returns" style={{ color: '#1B5E3B', fontWeight: 500 }}>Pengembalian</Link>.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              5. Garansi Produk
            </h2>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Semua produk Sesoris dijamin bebas cacat produksi.</li>
              <li style={{ marginBottom: '8px' }}>Garansi berlaku 1 tahun untuk cacat produksi (bukan kerusakan akibat penggunaan).</li>
              <li style={{ marginBottom: '8px' }}>Klaim garansi harus disertai bukti pembelian.</li>
              <li style={{ marginBottom: '8px' }}>Garansi tidak berlaku untuk keausan normal, kerusakan akibat kesalahan penggunaan, atau modifikasi produk.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              6. Hak Kekayaan Intelektual
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
              Semua konten di situs ini, termasuk namun tidak terbatas pada:
            </p>
            <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Logo, merek dagang, dan nama "Sesoris"</li>
              <li style={{ marginBottom: '8px' }}>Foto produk dan gambar</li>
              <li style={{ marginBottom: '8px' }}>Deskripsi produk dan teks</li>
              <li style={{ marginBottom: '8px' }}>Desain dan tata letak situs web</li>
            </ul>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              adalah milik Sesoris dan dilindungi oleh hukum hak cipta Indonesia. Dilarang menyalin, mendistribusikan,
              atau menggunakan konten tanpa izin tertulis dari kami.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <AlertTriangle style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                7. Batasan Tanggung Jawab
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7, marginBottom: '16px' }}>
                Sesoris tidak bertanggung jawab atas:
              </p>
              <ul style={{ color: '#495057', lineHeight: 1.8, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Kerugian tidak langsung atau konsekuensial dari penggunaan produk</li>
                <li style={{ marginBottom: '8px' }}>Keterlambatan pengiriman yang disebabkan oleh jasa ekspedisi atau force majeure</li>
                <li style={{ marginBottom: '8px' }}>Kerusakan yang disebabkan oleh penggunaan yang tidak sesuai</li>
                <li style={{ marginBottom: '8px' }}>Gangguan layanan akibat pemeliharaan sistem atau faktor di luar kendali kami</li>
              </ul>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                Tanggung jawab maksimum kami terbatas pada nilai produk yang dibeli.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Scale style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', margin: 0 }}>
                8. Hukum yang Berlaku
              </h2>
            </div>
            <div style={{ paddingLeft: '36px' }}>
              <p style={{ color: '#495057', lineHeight: 1.7 }}>
                Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                Setiap perselisihan yang timbul akan diselesaikan melalui musyawarah. Jika tidak tercapai kesepakatan,
                perselisihan akan diselesaikan melalui Pengadilan Negeri Yogyakarta.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
              9. Perubahan Syarat & Ketentuan
            </h2>
            <p style={{ color: '#495057', lineHeight: 1.7 }}>
              Kami berhak untuk mengubah Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah
              dipublikasikan di situs web. Penggunaan berkelanjutan atas layanan kami setelah perubahan dianggap sebagai
              persetujuan Anda terhadap syarat yang diperbarui.
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
                Pertanyaan?
              </h2>
            </div>
            <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: '16px' }}>
              Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi tim kami:
            </p>
            <div style={{ opacity: 0.9, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Sesoris Customer Service</strong></p>
              <p style={{ margin: '0 0 4px' }}>Email: halo@sesoris.com</p>
              <p style={{ margin: '0 0 4px' }}>Telepon: +62 274 123 4567</p>
              <p style={{ margin: '0 0 4px' }}>WhatsApp: +62 812 3456 7890</p>
              <p style={{ margin: 0 }}>Jam Operasional: Senin - Jumat, 09.00 - 18.00 WIB</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
