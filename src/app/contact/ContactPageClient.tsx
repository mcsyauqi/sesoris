'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactPageClient() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

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
            <span style={{ color: '#212529', fontWeight: 500 }}>Kontak</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>Hubungi Sesoris Yogyakarta</h1>
          <p style={{ color: '#6C757D', fontSize: '16px' }}>
            Butuh bantuan memilih organizer rumah, dapur, meja kerja, atau travel gear? Tim Sesoris siap membantu pertanyaan produk, pesanan, dan kerja sama grosir.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gap: '40px' }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>Informasi Kontak</h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <Mail style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Email</div>
                  <a href="mailto:sesoris.store@gmail.com" style={{ color: '#1B5E3B' }}>sesoris.store@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <Phone style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Telepon</div>
                  <a href="tel:+62274123456" style={{ color: '#6C757D' }}>+62 274 123 4567</a>
                  <div style={{ fontSize: '13px', color: '#6C757D', marginTop: '4px' }}>
                    WhatsApp: +62 812 3456 7890
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Alamat</div>
                  <div style={{ color: '#6C757D', lineHeight: 1.5 }}>
                    Jl. Malioboro No. 123<br />
                    Gedongtengen, Yogyakarta<br />
                    DIY 55271, Indonesia
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Clock style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Jam Operasional</div>
                  <div style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.6 }}>
                    Senin - Jumat: 09:00 - 18:00 WIB<br />
                    Sabtu: 10:00 - 16:00 WIB<br />
                    Minggu & Hari Libur: Tutup
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: '#212529', marginBottom: '12px' }}>Ikuti Kami</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://facebook.com/sesoris" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Facebook style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="https://instagram.com/sesoris_com" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Instagram style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="https://twitter.com/sesoris_com" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Twitter style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="https://youtube.com/@sesoris" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Youtube style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>Kirim Pesan</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-row" style={{ display: 'grid', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF',
                      fontSize: '15px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF',
                      fontSize: '15px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Subjek</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E9ECEF',
                    fontSize: '15px',
                    background: 'white'
                  }}
                >
                  <option value="general">Pertanyaan Umum</option>
                  <option value="order">Pertanyaan Pesanan</option>
                  <option value="return">Retur & Refund</option>
                  <option value="feedback">Masukan</option>
                  <option value="business">Kerja Sama / Grosir</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Pesan</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E9ECEF',
                    fontSize: '15px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Send style={{ width: '16px', height: '16px' }} />
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div style={{
          marginTop: '64px',
          height: '300px',
          background: '#F8F9FA',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6C757D',
        }}>
          <div style={{ textAlign: 'center' }}>
            <MapPin style={{ width: '32px', height: '32px', marginBottom: '12px', color: '#1B5E3B' }} />
            <div style={{ fontWeight: 600, color: '#212529' }}>Sesoris Store Yogyakarta</div>
            <div style={{ fontSize: '14px' }}>Jl. Malioboro No. 123, Yogyakarta</div>
          </div>
        </div>

        <section style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>Bantuan Belanja Organizer</h2>
            <p style={{ color: '#495057', lineHeight: 1.7, fontSize: '15px' }}>
              Konsultasikan kebutuhan storage rumah, rak dapur, organizer meja kerja, atau perlengkapan travel. Kami membantu merekomendasikan ukuran, material, dan produk yang paling sesuai untuk ruang Anda.
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>Pesanan dan Pengiriman</h2>
            <p style={{ color: '#495057', lineHeight: 1.7, fontSize: '15px' }}>
              Hubungi kami untuk cek status pesanan, estimasi pengiriman, retur, atau permintaan invoice. Tim Sesoris melayani pelanggan dari Yogyakarta dan pengiriman ke seluruh Indonesia.
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>Kerja Sama Grosir</h2>
            <p style={{ color: '#495057', lineHeight: 1.7, fontSize: '15px' }}>
              Untuk kebutuhan kantor, hampers, reseller, atau pembelian jumlah besar, kirim detail kebutuhan melalui formulir. Kami akan menyiapkan rekomendasi produk dan penawaran khusus.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
