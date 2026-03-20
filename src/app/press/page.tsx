import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Newspaper, Download, ExternalLink, Mail } from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    title: 'Sesoris Wins Best Local Brand Award 2025',
    date: 'December 15, 2025',
    excerpt: 'Sesoris was named the best local brand in the home & living category at the Indonesia Brand Award 2025.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Sesoris Expands to 5 Major Cities in Indonesia',
    date: 'November 28, 2025',
    excerpt: 'Sesoris opens 5 new experience stores in Jakarta, Surabaya, Bandung, Medan, and Makassar.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Sesoris x Yogyakarta Local Artisan Collaboration',
    date: 'October 10, 2025',
    excerpt: 'Launching a limited edition collection in collaboration with 20 local artisans from Yogyakarta.',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop',
  },
];

const mediaFeatures = [
  { name: 'Kompas.com', logo: 'K' },
  { name: 'Detik.com', logo: 'D' },
  { name: 'CNN Indonesia', logo: 'CNN' },
  { name: 'Tempo.co', logo: 'T' },
  { name: 'Bisnis.com', logo: 'B' },
  { name: 'IDN Times', logo: 'IDN' },
];

export default function PressPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Press</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
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
            <Newspaper style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Press & Media
          </h1>
          <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Latest news, press releases, and media coverage about Sesoris
          </p>
        </div>

        {/* Media Features */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', textAlign: 'center', marginBottom: '24px' }}>
            Featured In
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {mediaFeatures.map((media) => (
              <div key={media.name} style={{
                width: '80px',
                height: '80px',
                background: '#F8F9FA',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#6C757D',
                fontSize: '14px',
              }}>
                {media.logo}
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '32px' }}>
            Latest Press Releases
          </h2>
          <div className="press-releases-grid" style={{ display: 'grid', gap: '24px' }}>
            {pressReleases.map((release) => (
              <div key={release.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                  <Image src={release.image} alt={release.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>
                    {release.date}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', lineHeight: 1.4 }}>
                    {release.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.5, marginBottom: '16px' }}>
                    {release.excerpt}
                  </p>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#1B5E3B',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: 0,
                  }}>
                    Read More
                    <ExternalLink style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Kit */}
        <div style={{
          background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
          borderRadius: '16px',
          padding: 'clamp(24px, 4vw, 48px)',
          color: 'white',
          marginBottom: '64px',
        }}>
          <div className="press-kit-grid" style={{ display: 'grid', gap: '32px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>
                Press Kit
              </h2>
              <p style={{ opacity: 0.9, marginBottom: '24px', lineHeight: 1.6 }}>
                Download our press kit containing logos, high-resolution product photos,
                company profile, and fact sheet for your publication needs.
              </p>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                color: '#1B5E3B',
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '15px',
              }}>
                <Download style={{ width: '18px', height: '18px' }} />
                Download Press Kit
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {['Logo Package', 'Product Photos', 'Company Profile', 'Fact Sheet'].map((item) => (
                <div key={item} style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '16px',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}>
                  <Download style={{ width: '24px', height: '24px', marginBottom: '8px', opacity: 0.9 }} />
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Contact */}
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
            Media Contact
          </h2>
          <p style={{ color: '#6C757D', marginBottom: '24px', lineHeight: 1.6 }}>
            For interviews, media collaborations, or further information,
            please contact our Public Relations team.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F8F9FA',
            padding: '16px 24px',
            borderRadius: '10px',
          }}>
            <Mail style={{ width: '18px', height: '18px', color: '#1B5E3B' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>support@sesoris.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
