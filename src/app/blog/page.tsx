import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ArrowRight, Search } from 'lucide-react';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
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
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Blog</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: '48px 88px' }}>
        <div className="blog-head">
          <div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.25rem)' }}>The Sesoris Blog</h1>
            <p className="section-lede" style={{ fontSize: '17px' }}>
              Home organization tips, storage inspiration, kitchen guides, and tidy living ideas, with new articles every day.
            </p>
          </div>
          <form action="/blog" role="search" className="search-form" style={{ margin: 0, width: '100%', maxWidth: '440px' }}>
            {selectedCategory !== 'All' && <input type="hidden" name="category" value={selectedCategory} />}
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input id="blog-search" type="search" name="q" defaultValue={searchQuery} placeholder="Search tips, storage, kitchen…" className="field" />
            <button type="submit" className="btn btn-primary" aria-label="Search articles"><Search aria-hidden /></button>
          </form>
        </div>

        {/* Categories */}
        <nav aria-label="Blog categories" className="chip-row">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildBlogHref({ category: cat, q: searchQuery })}
              className="chip"
              aria-current={selectedCategory === cat ? 'page' : undefined}
            >
              {cat}{cat !== 'All' ? <span>{categoryCounts[cat]}</span> : null}
            </Link>
          ))}
        </nav>

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="post-card blog-featured">
            <div className="post-card-img">
              <Image src={featuredPost.image} alt={featuredPost.title} fill priority sizes="(max-width: 768px) 100vw, 55vw" />
            </div>
            <div>
              <div className="post-card-meta">
                <b>{featuredPost.category}</b>
                <span>{featuredPost.dateFormatted}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="post-card-title" style={{ fontSize: 'clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)', marginTop: '10px', lineHeight: 1.2 }}>
                {featuredPost.title}
              </h2>
              <p className="post-card-excerpt" style={{ marginTop: '12px', fontSize: '16px' }}>
                {featuredPost.excerpt}
              </p>
              <span className="text-link" style={{ marginTop: '20px' }}>
                Read the article <ArrowRight aria-hidden />
              </span>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="section-head" style={{ marginBottom: '28px' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 1.3rem + 0.8vw, 2rem)' }}>
              {selectedCategory === 'All' ? 'Latest articles' : `${selectedCategory} articles`}
            </h2>
            <p style={{ color: 'var(--ink-muted)', marginTop: '6px', fontSize: '15px' }}>
              {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
              {searchQuery ? ` for "${searchQuery}"` : ''}
            </p>
          </div>
        </div>
        <div className="blog-posts-grid" style={{ display: 'grid', gap: '40px 28px' }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <article style={{ display: 'contents' }}>
                <div className="post-card-img">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div>
                  <div className="post-card-meta">
                    <b>{post.category}</b>
                    <span>{post.dateFormatted}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="post-card-title" style={{ marginTop: '6px', fontSize: '18px' }}>
                    {post.title}
                  </h3>
                  <p className="post-card-excerpt" style={{ marginTop: '6px' }}>
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 16px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ color: 'var(--ink)', marginBottom: '8px' }}>No articles found</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px' }}>Try another keyword or browse all Sesoris articles.</p>
            <Link href="/blog" className="text-link">
              Back to all articles
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" className="pager">
            {page > 1 && (
              <Link href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: page - 1 })}>
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2)).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: pageNumber })}
                aria-current={pageNumber === page ? 'page' : undefined}
              >
                {pageNumber}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={buildBlogHref({ category: selectedCategory, q: searchQuery, page: page + 1 })}>
                Next
              </Link>
            )}
          </nav>
        )}

        {/* Newsletter */}
        <div className="news-card" style={{ marginTop: '72px' }}>
          <h2>Get new guides by email</h2>
          <p>New organizing guides and the occasional new product. No spam, unsubscribe anytime.</p>
          <div style={{ maxWidth: '520px' }}>
            <NewsletterForm source="blog" formClass="news-form" buttonClass="btn btn-light" />
          </div>
          <div className="ruler" aria-hidden />
        </div>
      </div>
    </>
  );
}
