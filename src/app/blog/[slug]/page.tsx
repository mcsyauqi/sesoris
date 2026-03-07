import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Sesoris`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
            <Link href="/blog" style={{ color: '#6C757D' }}>Blog</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{post.category}</span>
          </div>
        </div>
      </div>

      <article>
        {/* Hero */}
        <div style={{ position: 'relative', minHeight: '450px', display: 'flex', alignItems: 'flex-end' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 16px 48px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <span style={{
                display: 'inline-block',
                background: '#1B5E3B',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '16px',
              }}>
                {post.category}
              </span>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
                lineHeight: 1.3,
              }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px' }}>{post.dateFormatted}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px' }}>{post.readTime} baca</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '0 16px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #E9ECEF',
              marginTop: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#1B5E3B',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}>
                  {post.author.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#212529' }}>{post.author.name}</div>
                  <div style={{ fontSize: '14px', color: '#6C757D' }}>{post.author.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Facebook style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Twitter style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Linkedin style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Share2 style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px 0 80px' }}>
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#212529',
                      marginTop: '32px',
                      marginBottom: '16px',
                    }}>
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.includes('\n')) {
                  return (
                    <div key={index} style={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: '#343A40',
                      marginBottom: '20px',
                      whiteSpace: 'pre-line',
                    }}>
                      {paragraph}
                    </div>
                  );
                }
                return (
                  <p key={index} style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: '#343A40',
                    marginBottom: '20px',
                  }}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Back to Blog */}
            <div style={{
              paddingBottom: '48px',
              borderTop: '1px solid #E9ECEF',
              paddingTop: '24px',
            }}>
              <Link href="/blog" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1B5E3B',
                fontWeight: 500,
              }}>
                <ArrowLeft style={{ width: '18px', height: '18px' }} />
                Kembali ke Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
