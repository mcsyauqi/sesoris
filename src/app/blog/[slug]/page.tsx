import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Share2, BookOpen } from 'lucide-react';
import { notFound, redirect, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, findClosestSlug, getBlogSeoTitle, getRelatedPosts, getArchiveDeepLinks } from '@/lib/blog';
import { getShopLinksForPost } from '@/lib/shopLinks';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import { NewsletterSidebar } from '@/components/layout';
import React from 'react';

// Revalidate every hour so scheduled articles appear on time
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function isPostPublished(date: string): boolean {
  return date <= new Date().toISOString().split('T')[0];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.retired || !isPostPublished(post.date)) return {};
  return {
    title: getBlogSeoTitle(post),
    description: post.excerpt,
    alternates: selfReferencingAlternates(`/blog/${slug}`),
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

// --- Rich Markdown Renderer ---

/**
 * Flatten markdown to plain prose for machine-readable fields (JSON-LD).
 *
 * Fix (cycle #45, 2026-08-03): FAQ answers were pushed into
 * `acceptedAnswer.text` with their markdown intact, so Google received
 * `... at [Sesoris](https://www.sesoris.com)` verbatim and rendered the raw
 * brackets in FAQ rich results. Schema.org text fields must be plain text:
 * strip link syntax down to its label and drop bold/italic markers.
 */
function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/(^|\s)\*(\S[^*]*?)\*/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderInline(text: string, keyPrefix = ''): React.ReactNode[] {
  // Parse inline markdown: **bold**, [link](url)
  //
  // Fix (cycle #45, 2026-08-03): a bold span that CONTAINS a link
  // (`**Think about your existing [home storage solutions](/blog/x) ...**`)
  // used to render the inner markdown literally, so readers saw the raw
  // `[label](https://...)` on the page and the link never became an anchor.
  // Cause: <strong> received match[2] as a plain string instead of being
  // parsed again. 49 of 443 published posts were affected. The bold branch
  // now recurses through renderInline so nested links resolve properly.
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // Bold: **text** (may itself contain links)
      parts.push(<strong key={`${keyPrefix}b${match.index}`}>{renderInline(match[2], `${keyPrefix}${match.index}-`)}</strong>);
    } else if (match[3]) {
      // Link: [text](url)
      const href = match[5];
      const isInternal = href.startsWith('/') || href.includes('sesoris.com');
      if (isInternal) {
        const cleanHref = href.replace('https://www.sesoris.com', '').replace('https://sesoris.com', '') || '/';
        parts.push(
          <Link key={`${keyPrefix}l${match.index}`} href={cleanHref} style={{ color: '#1B5E3B', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(27,94,59,0.3)', textUnderlineOffset: '3px' }}>
            {match[4]}
          </Link>
        );
      } else {
        parts.push(
          <a key={`${keyPrefix}a${match.index}`} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#1B5E3B', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(27,94,59,0.3)', textUnderlineOffset: '3px' }}>
            {match[4]}
          </a>
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

// Flatten content array: split entries on `\n\n` so each markdown block is processed independently.
// Fixes generator bug where some entries pack multiple blocks (H2 + paragraphs) into one string,
// causing renderer to treat them as a single H2 heading or paragraph and surface raw markdown.
function flattenContentBlocks(content: string[]): string[] {
  const out: string[] = [];
  for (const entry of content) {
    if (typeof entry !== 'string') continue;
    if (entry.includes('\n\n') || (entry.startsWith('## ') && entry.includes('\n'))) {
      // Split on blank-line separator and discard empties
      const parts = entry.split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
      // Within a single block (no blank line) we still keep the original newlines
      // so multi-line tables / lists stay intact.
      for (const p of parts) out.push(p);
    } else {
      out.push(entry);
    }
  }
  return out;
}

function renderContentBlocks(rawContent: string[]): React.ReactNode[] {
  const content = flattenContentBlocks(rawContent);
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < content.length) {
    const line = content[i];

    // H2 heading
    if (line.startsWith('## ')) {
      // Only treat the FIRST line as the heading; never absorb body text into heading.
      const headingText = line.split('\n')[0].replace('## ', '');
      const headingId = headingText.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      elements.push(
        <h2 key={i} id={headingId} style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1B5E3B',
          marginTop: '40px',
          marginBottom: '16px',
          paddingBottom: '8px',
          borderBottom: '2px solid rgba(27,94,59,0.15)',
          lineHeight: 1.3,
        }}>
          {headingText}
        </h2>
      );
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{
          fontSize: '19px',
          fontWeight: 600,
          color: '#212529',
          marginTop: '28px',
          marginBottom: '12px',
          lineHeight: 1.4,
        }}>
          {line.split('\n')[0].replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // Image: ![alt](url)
    if (line.startsWith('![')) {
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        elements.push(
          <figure key={i} style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              loading="eager"
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
            {imgMatch[1] && (
              <figcaption style={{
                fontSize: '13px',
                color: '#6C757D',
                textAlign: 'center',
                marginTop: '8px',
                fontStyle: 'italic',
              }}>
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }
    }

    // "Read Also" box (supports both old :::baca-juga and new :::read-also)
    if (line.startsWith(':::baca-juga') || line.startsWith(':::read-also')) {
      const links: React.ReactNode[] = [];
      i++;
      while (i < content.length && content[i] !== ':::') {
        const linkMatch = content[i].match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const href = linkMatch[2].replace('https://www.sesoris.com', '').replace('https://sesoris.com', '') || '/';
          links.push(
            <li key={i} style={{ marginBottom: '8px' }}>
              <Link href={href} style={{ color: '#1B5E3B', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ChevronRight style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                {linkMatch[1]}
              </Link>
            </li>
          );
        }
        i++;
      }
      if (links.length > 0) {
        elements.push(
          <div key={`baca-${i}`} style={{
            background: 'linear-gradient(135deg, rgba(27,94,59,0.06), rgba(27,94,59,0.02))',
            border: '1px solid rgba(27,94,59,0.15)',
            borderLeft: '4px solid #1B5E3B',
            borderRadius: '0 12px 12px 0',
            padding: '20px 24px',
            margin: '28px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 600, color: '#1B5E3B', fontSize: '15px' }}>
              <BookOpen style={{ width: '16px', height: '16px' }} />
              Also Read
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{links}</ul>
          </div>
        );
      }
      i++;
      continue;
    }

    // Bullet points: group consecutive • or - lines
    if (line.startsWith('• ') || line.startsWith('- ')) {
      const items: React.ReactNode[] = [];
      while (i < content.length && (content[i].startsWith('• ') || content[i].startsWith('- '))) {
        const itemText = content[i].replace(/^[•-]\s*/, '');
        items.push(
          <li key={i} style={{ marginBottom: '8px', paddingLeft: '4px' }}>
            {renderInline(itemText)}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{
          listStyle: 'none',
          padding: 0,
          margin: '16px 0 20px',
        }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#1B5E3B', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>&#x2022;</span>
              <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#343A40' }}>{item}</div>
            </div>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list: group consecutive 1. 2. 3. lines
    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < content.length && /^\d+\.\s/.test(content[i])) {
        const itemText = content[i].replace(/^\d+\.\s*/, '');
        items.push(
          <li key={i} style={{ marginBottom: '8px', paddingLeft: '4px' }}>
            {renderInline(itemText)}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} style={{
          paddingLeft: '24px',
          margin: '16px 0 20px',
          counterReset: 'item',
          listStyle: 'none',
        }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{
                color: '#fff',
                background: '#1B5E3B',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '3px',
              }}>
                {idx + 1}
              </span>
              <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#343A40' }}>{item}</div>
            </div>
          ))}
        </ol>
      );
      continue;
    }

    // Table: group consecutive | lines
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableRows: string[][] = [];
      while (i < content.length && content[i].startsWith('|') && content[i].endsWith('|')) {
        const row = content[i].split('|').slice(1, -1).map(cell => cell.trim());
        // Skip separator rows (| --- | --- |)
        if (!row.every(cell => /^[-:]+$/.test(cell))) {
          tableRows.push(row);
        }
        i++;
      }
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        elements.push(
          <div key={`table-${i}`} style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '15px',
              lineHeight: 1.6,
            }}>
              <thead>
                <tr>
                  {headerRow.map((cell, ci) => (
                    <th key={ci} style={{
                      padding: '12px 16px',
                      background: '#1B5E3B',
                      color: '#fff',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderBottom: '2px solid #1B5E3B',
                      whiteSpace: 'nowrap',
                    }}>
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #dee2e6',
                        color: '#343A40',
                      }}>
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{
          borderLeft: '4px solid #1B5E3B',
          paddingLeft: '20px',
          margin: '24px 0',
          color: '#495057',
          fontStyle: 'italic',
          fontSize: '17px',
          lineHeight: 1.7,
        }}>
          {renderInline(line.replace('> ', ''))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{
        fontSize: '16px',
        lineHeight: 1.8,
        color: '#343A40',
        marginBottom: '20px',
      }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// --- Table of Contents ---

function generateTOC(content: string[]): { text: string; id: string; level: number }[] {
  return flattenContentBlocks(content)
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2;
      // Take only the first line of the heading (in case any single-block ## still has trailing text)
      const headingLine = line.split('\n')[0];
      const text = headingLine.replace(/^#{2,3}\s/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      return { text, id, level };
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    const closest = findClosestSlug(slug);
    if (closest) {
      permanentRedirect(`/blog/${closest}`);
    }
    notFound();
  }

  if (post.retired || !isPostPublished(post.date)) {
    notFound();
  }

  const toc = generateTOC(post.content);
  // Related posts: slug-seeded rotation across the whole archive so internal
  // links are distributed evenly (fixes 89% orphaned posts -> 0%, which was
  // causing GSC "Discovered - currently not indexed"). 2026-06-04.
  const relatedPosts = getRelatedPosts(post, 3);
  // Extra deep-link block targeting a different archive slice, multiplying
  // inbound internal links to older/deep posts.
  const archiveDeepLinks = getArchiveDeepLinks(post, 8);
  const shopLinks = getShopLinksForPost(post, 2);

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `https://www.sesoris.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sesoris',
      url: 'https://www.sesoris.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sesoris.com/images/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.sesoris.com/blog/${slug}`,
    },
    articleSection: post.category,
    wordCount: post.content.join(' ').split(/\s+/).length,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sesoris.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.sesoris.com/blog/${slug}` },
    ],
  };

  // Extract FAQ from (flattened) content if present
  const flatForFaq = flattenContentBlocks(post.content);
  const faqItems: { question: string; answer: string }[] = [];
  for (let i = 0; i < flatForFaq.length; i++) {
    const line = flatForFaq[i];
    if (line.startsWith('**Q:') || line.startsWith('**Q :')) {
      const question = plainText(line.replace(/^\*\*Q\s*:\s*/, '').replace(/\*\*$/, ''));
      const answer = (i + 1 < flatForFaq.length) ? plainText(flatForFaq[i + 1]) : '';
      if (question && answer && !answer.startsWith('##') && !answer.startsWith('**Q')) {
        faqItems.push({ question, answer });
      }
    }
  }

  const faqLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

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
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100vw', minWidth: 0, padding: '0 16px 48px' }}>
            <div style={{ width: '100%', maxWidth: '800px', minWidth: 0, margin: '0 auto' }}>
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
                width: '100%',
                minWidth: 0,
                fontSize: 'clamp(28px, 8vw, 36px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
                lineHeight: 1.3,
                overflowWrap: 'anywhere',
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
                  <span style={{ fontSize: '14px' }}>{post.readTime}</span>
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
                {[Facebook, Twitter, Linkedin, Share2].map((Icon, idx) => (
                  <button key={idx} style={{
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
                    <Icon style={{ width: '16px', height: '16px', color: '#343A40' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            {toc.length > 3 && (
              <nav style={{
                background: '#F8FAF9',
                border: '1px solid rgba(27,94,59,0.12)',
                borderRadius: '12px',
                padding: '24px 28px',
                marginTop: '32px',
              }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#1B5E3B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen style={{ width: '16px', height: '16px' }} />
                  Table of Contents
                </div>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'toc' }}>
                  {toc.map((item, idx) => (
                    <li key={idx} style={{
                      marginBottom: '6px',
                      paddingLeft: item.level === 3 ? '20px' : '0',
                    }}>
                      <a href={`#${item.id}`} style={{
                        color: item.level === 2 ? '#343A40' : '#6C757D',
                        textDecoration: 'none',
                        fontSize: item.level === 2 ? '14px' : '13px',
                        fontWeight: item.level === 2 ? 500 : 400,
                        lineHeight: 1.6,
                      }}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Content */}
            <div style={{ padding: '40px 0 48px' }}>
              {renderContentBlocks(post.content)}
            </div>

            {/* Shop the Solution — links this article to real product/category pages */}
            <div style={{
              background: '#F8FAF9',
              border: '1px solid rgba(27,94,59,0.12)',
              borderRadius: '12px',
              padding: '28px',
              marginBottom: '40px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1B5E3B', marginBottom: '16px' }}>
                Shop the Solution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {shopLinks.products.map((product) => (
                  <Link key={product.slug} href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #E9ECEF', background: '#fff' }}>
                      <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                        <Image src={product.images[0]?.url} alt={product.images[0]?.alt ?? product.name} fill sizes="180px" style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 700, marginTop: '4px' }}>
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/category/${shopLinks.categorySlug}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#1B5E3B',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
              }}>
                Browse all {shopLinks.categoryName}
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </Link>

              {/* Secondary category links. Category pages were the most
                  link-starved money pages in the 2026-07-31 indexation review,
                  and inbound internal link count, not content length, was what
                  separated indexed URLs from uncrawled ones. Each article now
                  points at three category pages instead of one. */}
              {shopLinks.secondaryCategories.length > 0 && (
                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(27,94,59,0.12)' }}>
                  <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '10px' }}>
                    Related collections
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {shopLinks.secondaryCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '20px',
                          border: '1px solid rgba(27,94,59,0.35)',
                          color: '#1B5E3B',
                          fontSize: '13px',
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Newsletter CTA */}
            <div style={{ marginBottom: '40px' }}>
              <NewsletterSidebar />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div style={{
                borderTop: '1px solid #E9ECEF',
                paddingTop: '40px',
                paddingBottom: '40px',
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '24px' }}>
                  Related Articles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E9ECEF' }}>
                        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                          <Image src={related.image} alt={related.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '14px' }}>
                          <span style={{ fontSize: '11px', color: '#1B5E3B', fontWeight: 600, textTransform: 'uppercase' }}>
                            {related.category}
                          </span>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#212529', marginTop: '4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {related.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore More (archive deep links — spreads internal link equity) */}
            {archiveDeepLinks.length > 0 && (
              <div style={{
                borderTop: '1px solid #E9ECEF',
                paddingTop: '32px',
                paddingBottom: '8px',
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '20px' }}>
                  Explore More Articles
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px 24px' }}>
                  {archiveDeepLinks.map((link) => (
                    <li key={link.slug} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <ChevronRight style={{ width: '16px', height: '16px', color: '#1B5E3B', flexShrink: 0, marginTop: '3px' }} />
                      <Link href={`/blog/${link.slug}`} style={{ color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none', lineHeight: 1.4 }}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
