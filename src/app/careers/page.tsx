import Link from 'next/link';
import { Home, ChevronRight, Briefcase, MapPin, Clock, Users, Heart, Zap, Coffee, ArrowRight } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Merancang pengalaman produk yang indah dan fungsional untuk jutaan pengguna.',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Yogyakarta / Remote',
    type: 'Full-time',
    desc: 'Membangun platform e-commerce yang scalable dan performant.',
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Mengembangkan strategi marketing digital untuk pertumbuhan brand.',
  },
  {
    id: 4,
    title: 'Content Creator',
    department: 'Marketing',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Membuat konten kreatif untuk social media dan kampanye marketing.',
  },
  {
    id: 5,
    title: 'Customer Experience Lead',
    department: 'Operations',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Memimpin tim customer service untuk memberikan pengalaman terbaik.',
  },
  {
    id: 6,
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Mengelola rantai pasok dan hubungan dengan vendor.',
  },
];

const benefits = [
  { icon: Heart, title: 'Asuransi Kesehatan', desc: 'BPJS & asuransi swasta untuk karyawan dan keluarga' },
  { icon: Coffee, title: 'Flexible Working', desc: 'WFH 2x seminggu dan jam kerja fleksibel' },
  { icon: Zap, title: 'Learning Budget', desc: 'Rp 5 juta/tahun untuk pengembangan diri' },
  { icon: Users, title: 'Team Events', desc: 'Outing, gathering, dan team building rutin' },
];

export default function CareersPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Karir</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
        padding: '80px 16px',
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '16px' }}>
            Bergabung dengan Tim Sesoris
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 32px' }}>
            Bangun karir yang bermakna bersama kami. Kami mencari talenta terbaik
            untuk menciptakan produk yang membantu jutaan orang hidup lebih terorganisir.
          </p>
          <a href="#openings" style={{
            display: 'inline-block',
            background: 'white',
            color: '#1B5E3B',
            padding: '14px 32px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '15px',
          }}>
            Lihat Lowongan
          </a>
        </div>
      </div>

      <div className="container" style={{ padding: '64px 16px 80px' }}>
        {/* Why Join Us */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', textAlign: 'center', marginBottom: '16px' }}>
            Mengapa Bergabung dengan Sesoris?
          </h2>
          <p style={{ color: '#6C757D', textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            Kami percaya bahwa karyawan yang bahagia akan menghasilkan karya terbaik
          </p>
          <div className="careers-benefits-grid" style={{ display: 'grid', gap: '24px' }}>
            {benefits.map((benefit) => (
              <div key={benefit.title} style={{
                padding: '24px',
                background: '#F8F9FA',
                borderRadius: '16px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#E8F5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <benefit.icon style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6C757D', margin: 0, lineHeight: 1.5 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div id="openings">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', marginBottom: '32px' }}>
            Lowongan Terbuka
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map((job) => (
              <div key={job.id} style={{
                padding: '24px',
                background: 'white',
                border: '1px solid #E9ECEF',
                borderRadius: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '24px',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{
                      background: '#E8F5E9',
                      color: '#1B5E3B',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}>
                      {job.department}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '8px' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '12px' }}>
                    {job.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                      <MapPin style={{ width: '14px', height: '14px' }} />
                      {job.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                      <Clock style={{ width: '14px', height: '14px' }} />
                      {job.type}
                    </div>
                  </div>
                </div>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#1B5E3B',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                }}>
                  Lamar
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '64px',
          padding: 'clamp(24px, 4vw, 48px)',
          background: '#F8F9FA',
          borderRadius: '16px',
          textAlign: 'center',
        }}>
          <Briefcase style={{ width: '40px', height: '40px', color: '#1B5E3B', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
            Tidak menemukan posisi yang cocok?
          </h3>
          <p style={{ color: '#6C757D', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Kirimkan CV dan portfolio Anda. Kami selalu terbuka untuk talenta luar biasa!
          </p>
          <a href="mailto:careers@sesoris.id" style={{
            display: 'inline-block',
            background: '#1B5E3B',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '15px',
          }}>
            Kirim CV ke careers@sesoris.id
          </a>
        </div>
      </div>
    </>
  );
}
