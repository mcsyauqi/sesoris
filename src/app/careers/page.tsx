import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Briefcase, MapPin, Clock, Users, Heart, Zap, Coffee, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Sesoris team. Explore career opportunities in e-commerce, design, marketing, and more.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers | Sesoris',
    description: 'Join the Sesoris team. Explore career opportunities in e-commerce, design, marketing, and more.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Design beautiful and functional product experiences for millions of users.',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Yogyakarta / Remote',
    type: 'Full-time',
    desc: 'Build a scalable and performant e-commerce platform.',
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Develop digital marketing strategies for brand growth.',
  },
  {
    id: 4,
    title: 'Content Creator',
    department: 'Marketing',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Create creative content for social media and marketing campaigns.',
  },
  {
    id: 5,
    title: 'Customer Experience Lead',
    department: 'Operations',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Lead the customer service team to deliver the best experience.',
  },
  {
    id: 6,
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    location: 'Yogyakarta',
    type: 'Full-time',
    desc: 'Manage the supply chain and vendor relationships.',
  },
];

const benefits = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive health insurance for employees and family' },
  { icon: Coffee, title: 'Flexible Working', desc: 'Work from home twice a week and flexible hours' },
  { icon: Zap, title: 'Learning Budget', desc: 'Annual learning budget for personal development' },
  { icon: Users, title: 'Team Events', desc: 'Regular outings, gatherings, and team building activities' },
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Careers</span>
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
            Join the Sesoris Team
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 32px' }}>
            Build a meaningful career with us. We are looking for the best talent
            to create products that help millions of people live more organized lives.
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
            View Open Positions
          </a>
        </div>
      </div>

      <div className="container" style={{ padding: '64px 16px 80px' }}>
        {/* Why Join Us */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', textAlign: 'center', marginBottom: '16px' }}>
            Why Join Sesoris?
          </h2>
          <p style={{ color: '#6C757D', textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            We believe that happy employees produce the best work
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
            Open Positions
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
                  Apply
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
            Don&apos;t see a position that fits?
          </h3>
          <p style={{ color: '#6C757D', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Send us your resume and portfolio. We are always open to exceptional talent!
          </p>
          <a href="mailto:admin@sesoris.com" style={{
            display: 'inline-block',
            background: '#1B5E3B',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '15px',
          }}>
            Send Resume to admin@sesoris.com
          </a>
        </div>
      </div>
    </>
  );
}
