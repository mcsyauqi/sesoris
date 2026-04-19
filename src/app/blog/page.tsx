import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

// Revalidate every hour so scheduled articles appear on time
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog - Home Organization Tips & Ideas',
  description: 'Read our latest articles about home organization, kitchen storage tips, interior design ideas, and product guides. Expert advice from Sesoris.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog - Home Organization Tips & Ideas | Sesoris',
    description: 'Read our latest articles about home organization, kitchen storage tips, interior design ideas, and product guides. Expert advice from Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const categories = ['All', 'Tips & Tricks', 'Tutorial', 'Inspiration', 'Lifestyle', 'Review'];

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts[0];
  const posts = allPosts.slice(1);

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
            <span style={{ color: '#212529', fontWeight: 500 }}>Blog</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Blog Sesoris
          </h1>
          <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Tips, inspiration, and guides to make your home more organized and comfortable
          </p>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: i === 0 ? '#1B5E3B' : '#F8F9FA',
                color: i === 0 ? 'white' : '#6C757D',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              marginBottom: '64px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'white',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div className="blog-featured-grid" style={{ display: 'grid' }}>
                <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                  <Image src={featuredPost.image} alt={featuredPost.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 'clamp(20px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{
                      background: '#E8F5E9',
                      color: '#1B5E3B',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 500,
                    }}>
                      {featuredPost.category}
                    </span>
                    <span style={{ fontSize: '13px', color: '#6C757D' }}>Featured Article</span>
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', marginBottom: '16px', lineHeight: 1.3 }}>
                    {featuredPost.title}
                  </h2>
                  <p style={{ color: '#6C757D', lineHeight: 1.6, marginBottom: '24px' }}>
                    {featuredPost.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                      <Calendar style={{ width: '14px', height: '14px' }} />
                      {featuredPost.dateFormatted}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                      <Clock style={{ width: '14px', height: '14px' }} />
                      {featuredPost.readTime} read
                    </div>
                  </div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1B5E3B',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '15px',
                    width: 'fit-content',
                  }}>
                    Read Article
                    <ArrowRight style={{ width: '18px', height: '18px' }} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '32px' }}>
          Latest Articles
        </h2>
        <div className="blog-posts-grid" style={{ display: 'grid', gap: '24px' }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
              }}>
                <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Tag style={{ width: '14px', height: '14px', color: '#1B5E3B' }} />
                    <span style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 500 }}>{post.category}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.5, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#6C757D' }}>{post.dateFormatted}</span>
                      <span style={{ fontSize: '12px', color: '#6C757D' }}>{post.readTime}</span>
                    </div>
                    <span style={{
                      color: '#1B5E3B',
                      fontWeight: 500,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      Read
                      <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button style={{
            padding: '14px 32px',
            borderRadius: '10px',
            border: '1px solid #E9ECEF',
            background: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '15px',
            color: '#212529',
          }}>
            Load More
          </button>
        </div>

        {/* Newsletter */}
        <div style={{
          marginTop: '64px',
          padding: 'clamp(24px, 4vw, 48px)',
          background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
            Get the Latest Tips
          </h3>
          <p style={{ opacity: 0.9, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Subscribe to our newsletter to get the latest articles and tips delivered straight to your inbox.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '450px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
              }}
            />
            <button style={{
              padding: '14px 24px',
              background: 'white',
              color: '#1B5E3B',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
