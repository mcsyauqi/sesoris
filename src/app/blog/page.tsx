import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowRight, Tag, Search } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

// Revalidate every hour so scheduled articles appear on time
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog - Home Organization Tips & Ideas',
  description: 'Read our latest articles about home organization, kitchen storage tips, interior design ideas, and product guides. Expert advice from Sesoris.',
  alternates: selfReferencingAlternates('/blog'),
  openGraph: {
    title: 'Blog - Home Organization Tips & Ideas | Sesoris',
    description: 'Read our latest articles about home organization, kitchen storage tips, interior design ideas, and product guides. Expert advice from Sesoris.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const POSTS_PER_PAGE = 24;

interface BlogPageProps {
  searchParams?: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
}

function buildBlogHref(params: { category?: string; q?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.q) query.set('q', params.q);
  if (params.page && params.page > 1) query.set('page', String(params.page));
  const value = query.toString();
  return value ? `/blog?${value}` : '/blog';
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = searchParams ? await searchParams : {};
  const allPosts = getAllPosts();
  const selectedCategory = params.category || 'All';
  const searchQuery = (params.q || '').trim();
  const currentPage = Math.max(1, Number(params.page) || 1);
  const categoryCounts = allPosts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});
  const categories = ['All', ...Object.keys(categoryCounts).sort()];
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const text = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    const matchesSearch = !searchQuery || text.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const showFeatured = selectedCategory === 'All' && !searchQuery && currentPage === 1;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const listSource = showFeatured ? filteredPosts.slice(1) : filteredPosts;
  const totalPages = Math.max(1, Math.ceil(listSource.length / POSTS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const posts = listSource.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

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
          <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '680px', margin: '0 auto' }}>
            Home organization tips, storage inspiration, kitchen guides, and tidy living ideas from Sesoris.
          </p>
        </div>

        <form
          action="/blog"
          style={{
            maxWidth: '640px',
            margin: '0 auto 28px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {selectedCategory !== 'All' && <input type="hidden" name="category" value={selectedCategory} />}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#6C757D' }} />
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search organization tips, storage, kitchen..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                borderRadius: '12px',
                border: '1px solid #E9ECEF',
                fontSize: '15px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '14px 22px',
              borderRadius: '12px',
              border: 'none',
              background: '#1B5E3B',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildBlogHref({ category: cat, q: searchQuery })}
              style={{
                display: 'inline-flex',
                padding: '10px 20px',
                borderRadius: '50px',
                background: selectedCategory === cat ? '#1B5E3B' : '#F8F9FA',
                color: selectedCategory === cat ? 'white' : '#6C757D',
                fontWeight: 500,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              {cat}{cat !== 'All' ? ` (${categoryCounts[cat]})` : ''}
            </Link>
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
                      {featuredPost.readTime}
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
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
          {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
        </h2>
        <p style={{ color: '#6C757D', marginBottom: '32px', fontSize: '14px' }}>
          Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </p>
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

        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 16px', background: '#F8F9FA', borderRadius: '16px' }}>
            <h3 style={{ color: '#212529', marginBottom: '8px' }}>No articles found</h3>
            <p style={{ color: '#6C757D', marginBottom: '20px' }}>Try another keyword or browse all Sesoris articles.</p>
            <Link href="/blog" style={{ color: '#1B5E3B', fontWeight: 600, textDecoration: 'none' }}>
              Back to all articles
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '48px', flexWrap: 'wrap' }}>
            {page > 1 && (
              <Link href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: page - 1 })} style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid #E9ECEF', color: '#212529', textDecoration: 'none', fontWeight: 500 }}>
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2)).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: pageNumber })}
                aria-current={pageNumber === page ? 'page' : undefined}
                style={{
                  minWidth: '44px',
                  textAlign: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E9ECEF',
                  background: pageNumber === page ? '#1B5E3B' : 'white',
                  color: pageNumber === page ? 'white' : '#212529',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                {pageNumber}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: page + 1 })} style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid #E9ECEF', color: '#212529', textDecoration: 'none', fontWeight: 500 }}>
                Next
              </Link>
            )}
          </nav>
        )}

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
