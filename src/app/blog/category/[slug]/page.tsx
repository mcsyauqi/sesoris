import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Home, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const revalidate = 3600;

const CATEGORY_SLUGS: Record<string, string> = {
  'buying-guide': 'Buying Guide',
  'tips-tricks': 'Tips & Tricks',
  tutorial: 'Tutorial',
  'home-organization': 'Home Organization',
  'kitchen-dining': 'Kitchen & Dining',
  'storage-solutions': 'Storage Solutions',
};

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function resolveCategory(slug: string) {
  const posts = getAllPosts();
  const fromMap = CATEGORY_SLUGS[slug];
  if (fromMap && posts.some((post) => post.category === fromMap)) return fromMap;
  return posts.find((post) => slugifyCategory(post.category) === slug)?.category;
}

export function generateStaticParams() {
  const categories = Array.from(new Set(getAllPosts().map((post) => post.category)));
  return categories.map((category) => ({ slug: slugifyCategory(category) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) return {};
  return {
    title: `${category} Articles - Sesoris Blog`,
    description: `Browse every ${category} article from Sesoris to keep your home more organized, functional, and comfortable every day.`,
    alternates: selfReferencingAlternates(`/blog/category/${slug}`),
    openGraph: {
      title: `${category} Articles | Sesoris`,
      description: `Read every ${category} guide from Sesoris on one easy-to-browse hub page.`,
      images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) notFound();
  const posts = getAllPosts().filter((post) => post.category === category);
  if (posts.length === 0) notFound();

  const categories = Array.from(new Set(getAllPosts().map((post) => post.category))).sort();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Articles - Sesoris Blog`,
    description: `${category} article hub from Sesoris.`,
    url: `https://www.sesoris.com/blog/category/${slug}`,
    mainEntity: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.sesoris.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}><Home style={{ width: '14px', height: '14px' }} /></Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <Link href="/blog" style={{ color: '#6C757D', textDecoration: 'none' }}>Blog</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{category}</span>
          </div>
        </div>
      </div>

      <main className="container" style={{ padding: '48px 16px 80px' }}>
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#1B5E3B', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '12px' }}>Blog Hub</p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#212529', marginBottom: '16px', lineHeight: 1.15 }}>{category} Articles</h1>
          <p style={{ color: '#6C757D', fontSize: '17px', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Explore every {category} article from Sesoris. This hub page gathers guides, checklists, and inspiration so you can find the topics most relevant to your home.
          </p>
        </section>

        <nav aria-label="Blog categories" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link href="/blog" style={{ padding: '10px 18px', borderRadius: '999px', background: '#F8F9FA', color: '#6C757D', textDecoration: 'none', fontWeight: 600 }}>All</Link>
          {categories.map((cat) => {
            const catSlug = slugifyCategory(cat);
            return (
              <Link key={cat} href={`/blog/category/${catSlug}`} style={{ padding: '10px 18px', borderRadius: '999px', background: cat === category ? '#1B5E3B' : '#F8F9FA', color: cat === category ? '#fff' : '#6C757D', textDecoration: 'none', fontWeight: 600 }}>
                {cat}
              </Link>
            );
          })}
        </nav>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: '#1B5E3B', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>{post.category}</p>
                  <h2 style={{ fontSize: '18px', lineHeight: 1.35, color: '#212529', marginBottom: '12px' }}>{post.title}</h2>
                  <p style={{ color: '#6C757D', lineHeight: 1.6, fontSize: '14px', marginBottom: '16px' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', gap: '14px', color: '#6C757D', fontSize: '12px', alignItems: 'center' }}>
                    <span style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}><Calendar style={{ width: '13px', height: '13px' }} />{post.dateFormatted}</span>
                    <span style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}><Clock style={{ width: '13px', height: '13px' }} />{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
