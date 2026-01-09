import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  return (
    <section style={{ padding: '80px 0', background: '#F8F9FA' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#E9ECEF',
              position: 'relative'
            }}>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                alt="Sesoris Store"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Logo */}
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              right: '-24px',
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Leaf style={{ width: '40px', height: '40px', color: '#1B5E3B' }} />
                <div>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1B5E3B',
                    display: 'block'
                  }}>Sesoris</span>
                  <span style={{ fontSize: '12px', color: '#6C757D' }}>Do It With Ease</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: '#E8F5E9',
              color: '#1B5E3B',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '9999px',
              marginBottom: '16px'
            }}>
              About Us
            </span>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              color: '#212529',
              marginBottom: '24px'
            }}>
              Why Choose Sesoris?
            </h2>
            <p style={{
              color: '#6C757D',
              fontSize: '18px',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              Sesoris brings you the best deals for anyone. If you know yourself or
              looking to treat yourself better, check out our exciting products!
            </p>
            <p style={{
              color: '#6C757D',
              marginBottom: '32px',
              lineHeight: 1.6
            }}>
              We carefully curate each product to ensure quality, functionality, and
              style. Our mission is to make finding the perfect gift or treat for
              yourself as easy as possible.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1B5E3B' }}>50K+</p>
                <p style={{ fontSize: '14px', color: '#6C757D' }}>Happy Customers</p>
              </div>
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1B5E3B' }}>500+</p>
                <p style={{ fontSize: '14px', color: '#6C757D' }}>Products</p>
              </div>
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1B5E3B' }}>4.8</p>
                <p style={{ fontSize: '14px', color: '#6C757D' }}>Avg. Rating</p>
              </div>
            </div>

            <Button asChild size="lg">
              <Link href="/about" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Learn More
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
