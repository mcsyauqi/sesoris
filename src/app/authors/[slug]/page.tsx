import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { authors, getAuthorBySlug, authorUrl, authorId, ORGANIZATION_ID, SITE_URL } from '@/data/authors';
import { getAllPosts } from '@/lib/blog';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  const description = author.bio[0].slice(0, 155);
  return {
    title: `${author.name}: Who Writes Our Guides`,
    description,
    alternates: selfReferencingAlternates(`/authors/${author.slug}`),
    openGraph: {
      title: `${author.name} | Sesoris`,
      description,
      type: 'profile',
      url: authorUrl(author),
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getAllPosts().filter((p) => p.author.slug === author.slug);
  const latest = posts.slice(0, 24);

  const entity = {
    '@type': author.type,
    '@id': authorId(author),
    name: author.name,
    url: authorUrl(author),
    description: author.bio.join(' '),
    ...(author.type === 'Organization'
      ? { parentOrganization: { '@id': ORGANIZATION_ID } }
      : { worksFor: { '@id': ORGANIZATION_ID }, jobTitle: author.role }),
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
  };

  const profileLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': authorUrl(author),
    url: authorUrl(author),
    name: `${author.name} | Sesoris`,
    isPartOf: { '@type': 'WebSite', name: 'Sesoris', url: SITE_URL },
    ...(posts[0] ? { dateModified: posts[0].dateModified ?? posts[0].date } : {}),
    mainEntity: entity,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: author.name, item: authorUrl(author) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <Link href="/blog" style={{ color: 'var(--ink-muted)' }}>Blog</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{author.name}</span>
          </div>
        </div>
      </div>

      <section style={{ padding: '48px 0 24px' }}>
        <div className="container"><div className="article-measure">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span className="article-avatar" aria-hidden>{author.avatar}</span>
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{author.name}</h1>
              <div style={{ color: 'var(--ink-muted)', fontSize: '15px' }}>{author.role} at Sesoris</div>
            </div>
          </div>
          {author.bio.map((para) => (
            <p key={para.slice(0, 40)} style={{ color: 'var(--ink)', fontSize: '17px', lineHeight: 1.7, marginBottom: '16px' }}>{para}</p>
          ))}
          <p style={{ color: 'var(--ink-muted)', fontSize: '15px', lineHeight: 1.6 }}>
            Learn more <Link href="/about" className="text-link">about Sesoris</Link>, or send a correction through our{' '}
            <Link href="/contact" className="text-link">contact page</Link>.
          </p>
        </div></div>
      </section>

      <section style={{ padding: '24px 0 64px' }}>
        <div className="container"><div className="article-measure">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
            Latest guides ({posts.length} published)
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
            {latest.map((p) => (
              <li key={p.slug} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                <Link href={`/blog/${p.slug}`} className="text-link" style={{ fontWeight: 600 }}>{p.title}</Link>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                  <time dateTime={p.date}>{p.dateFormatted}</time> · {p.category}
                </div>
              </li>
            ))}
          </ul>
          {posts.length > latest.length && (
            <p style={{ marginTop: '20px' }}>
              <Link href="/blog" className="text-link">Browse all {posts.length} guides on the blog</Link>
            </p>
          )}
        </div></div>
      </section>
    </>
  );
}
