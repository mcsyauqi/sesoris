import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Heart, Globe, Users, Leaf, Award } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Quality First', desc: 'We source only the best products, ensuring every item meets our high standards.' },
  { icon: Globe, title: 'Sustainability', desc: 'Eco-friendly practices and sustainable materials are at the heart of what we do.' },
  { icon: Users, title: 'Customer Care', desc: "Your satisfaction is our priority. We're here to help every step of the way." },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '98%', label: 'Satisfied Customers' },
  { value: '4.8', label: 'Average Rating' },
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
            Our Story
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#212529', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
            Making Life Easier, One Product at a Time
          </h1>
          <p style={{ color: '#6C757D', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Sesoris was founded with a simple mission: to bring high-quality, innovative products that make everyday life easier and more enjoyable.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/3', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our Team"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
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
                  <div style={{ fontWeight: 700, color: '#212529' }}>Since 2020</div>
                  <div style={{ fontSize: '12px', color: '#6C757D' }}>Serving customers worldwide</div>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '20px' }}>Who We Are</h2>
              <p style={{ color: '#6C757D', lineHeight: 1.8, marginBottom: '16px' }}>
                At Sesoris, we believe that the right products can transform your daily routine. What started as a small online store has grown into a trusted destination for thousands of customers seeking quality home essentials, unique gifts, and innovative gadgets.
              </p>
              <p style={{ color: '#6C757D', lineHeight: 1.8, marginBottom: '16px' }}>
                Our team carefully curates each product, ensuring it meets our standards for quality, functionality, and design. We partner with trusted suppliers and constantly seek out new and exciting items to bring to our customers.
              </p>
              <p style={{ color: '#6C757D', lineHeight: 1.8 }}>
                &ldquo;Do It With Ease&rdquo; isn&apos;t just our tagline – it&apos;s our promise. We&apos;re committed to making your shopping experience as simple and enjoyable as the products we sell.
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }}>
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
            padding: '64px',
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
