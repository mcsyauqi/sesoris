import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Heart, Globe, Users, Leaf, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Sesoris | Live More Organized',
  description: 'Get to know Sesoris, a home organization store that helps households choose practical organizers for a more organized home.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Sesoris | Live More Organized | Sesoris',
    description: 'Get to know Sesoris, a home organization store that helps households choose practical organizers for a more organized home.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const values = [
  { icon: Heart, title: 'Quality First', desc: 'We curate organizers and storage products with practical materials, tidy dimensions, and everyday usability in mind.' },
  { icon: Globe, title: 'Yogyakarta Roots', desc: 'Our Yogyakarta base shapes a calm, practical, and craft-conscious approach to home organization.' },
  { icon: Users, title: 'Customer Care', desc: "We help customers choose storage, kitchen, desk, and travel products that fit their real space and routine." },
];

const stats = [
  { value: 'DIY', label: 'Yogyakarta-based brand' },
  { value: '30', label: 'Day return window' },
  { value: '4', label: 'Main organizer categories' },
  { value: 'WA', label: 'Direct customer support' },
];

export default function AboutPage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>About Us</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            background: '#E8F5E9',
            color: '#1B5E3B',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '50px',
            marginBottom: '20px'
          }}>
            <Leaf style={{ width: '14px', height: '14px' }} />
            Our Yogyakarta Story
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#212529', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
            Practical Home Organization from Yogyakarta
          </h1>
          <p style={{ color: '#6C757D', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Sesoris is a Yogyakarta-founded home organizer brand helping households choose practical storage, kitchen, desk, and travel products for calmer daily routines.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="about-story-grid" style={{ display: 'grid', gap: '40px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/3', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop&q=75"
                  alt="Our Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '0px',
                background: 'white',
                borderRadius: '12px',
                padding: '16px 20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Award style={{ width: '28px', height: '28px', color: '#1B5E3B' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#212529' }}>Yogyakarta, Indonesia</div>
                  <div style={{ fontSize: '12px', color: '#6C757D' }}>Online home organizer store</div>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '20px' }}>Who We Are</h2>
              <p style={{ color: '#6C757D', lineHeight: 1.8, marginBottom: '16px' }}>
                At Sesoris, we believe a tidy home starts with products that are easy to use, easy to clean, and easy to fit into real living spaces. Our team works from Yogyakarta and curates items for kitchens, desks, rooms, wardrobes, and travel needs.
              </p>
              <p style={{ color: '#6C757D', lineHeight: 1.8, marginBottom: '16px' }}>
                The Yogyakarta roots matter to us: it is where the idea for Sesoris started, shaping a calm, practical approach to home organization that we bring to every product we curate.
              </p>
              <p style={{ color: '#6C757D', lineHeight: 1.8 }}>
                &ldquo;Do It With Ease&rdquo; is our promise: simple product choices, clear support, and practical storage ideas for people who want their home to feel more organized without making the process complicated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '64px 0', background: '#F8F9FA' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#6C757D', marginBottom: '8px' }}>The principles that guide everything we do</p>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529' }}>Our Values</h2>
          </div>
          <div className="about-values-grid" style={{ display: 'grid', gap: '24px' }}>
            {values.map((value) => (
              <div key={value.title} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#E8F5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <value.icon style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>{value.title}</h3>
                <p style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px 0', background: '#1B5E3B' }}>
        <div className="container">
          <div className="about-stats-grid" style={{ display: 'grid', gap: '24px', textAlign: 'center' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '40px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            background: '#F8F9FA',
            borderRadius: '24px',
            padding: 'clamp(24px, 5vw, 64px)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <Leaf style={{
              position: 'absolute',
              top: '32px',
              left: '32px',
              width: '48px',
              height: '48px',
              color: '#E8F5E9'
            }} />
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>
              Ready to Discover Amazing Products?
            </h2>
            <p style={{ color: '#6C757D', marginBottom: '32px' }}>
              Browse our collection and find the perfect items for yourself or someone special.
            </p>
            <Link
              href="/shop"
              className="btn btn-primary"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
