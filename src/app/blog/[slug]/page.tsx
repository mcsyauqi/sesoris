import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ArrowLeft, ArrowRight, Facebook, Linkedin, BookOpen } from 'lucide-react';
import { notFound, redirect, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, findClosestSlug, getBlogSeoTitle, getRelatedPosts, getArchiveDeepLinks } from '@/lib/blog';
import { getShopLinksForPost } from '@/lib/shopLinks';
import { selfReferencingAlternates } from '@/lib/seo-alternates';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { resolveAuthor, authorUrl, authorJsonLdRef } from '@/data/authors';
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
      modifiedTime: post.dateModified ?? post.date,
      authors: [authorUrl(resolveAuthor(post.author))],
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
          <Link key={`${keyPrefix}l${match.index}`} href={cleanHref} style={{ color: 'var(--brand)', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(27,94,59,0.3)', textUnderlineOffset: '3px' }}>
            {match[4]}
          </Link>
        );
      } else {
        parts.push(
          <a key={`${keyPrefix}a${match.index}`} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(27,94,59,0.3)', textUnderlineOffset: '3px' }}>
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
  // A markdown table stored as one multi-line string must become one entry per row,
  // because the table renderer below consumes consecutive `|...|` entries as rows.
  return out.flatMap((block) => {
    const lines = block.split('\n').map((l) => l.trim());
    return lines.length > 1 && lines.every((l) => l.startsWith('|') && l.endsWith('|')) ? lines : [block];
  });
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
          fontSize: 'clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          marginTop: '56px',
          marginBottom: '16px',
          lineHeight: 1.2,
          scrollMarginTop: '96px',
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
          fontSize: '20px',
          fontWeight: 650,
          color: 'var(--ink)',
          marginTop: '36px',
          marginBottom: '12px',
          lineHeight: 1.3,
          scrollMarginTop: '96px',
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
          <figure key={i} style={{ margin: '36px 0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              loading="eager"
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--radius-lg)', display: 'block' }}
            />
            {imgMatch[1] && (
              <figcaption style={{
                fontSize: '14px',
                color: 'var(--ink-muted)',
                marginTop: '10px',
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
    //
    // Fix (cycle #60, 2026-09-04): the generator emits this as ONE array element --
    // "opening-marker\n- [text](url)\n...\n:::" joined by single newlines. flattenContentBlocks()
    // only splits on blank-line separators, so the closing ':::' never becomes its own array
    // entry. The old code below always assumed it would, and scanned forward for a literal
    // ':::' that could never appear -- silently consuming (and dropping) every remaining block
    // in the article, headings included. That was live on 10 published articles, this one
    // (bathroom-cabinet-ideas) among them: everything after the "Also Read" box, including the
    // Conclusion heading and closing CTA, was missing from the rendered page even though the
    // source JSON had it. Parse links out of THIS block's own lines first; only fall back to
    // scanning later array elements for a genuine legacy multi-block form, and even then never
    // cross a heading, so a malformed block can no longer eat the rest of the article.
    if (line.startsWith(':::baca-juga') || line.startsWith(':::read-also')) {
      const links: React.ReactNode[] = [];
      const pushLink = (key: string, text: string, url: string) => {
        const href = url.replace('https://www.sesoris.com', '').replace('https://sesoris.com', '') || '/';
        links.push(
          <li key={key} style={{ marginBottom: '8px' }}>
            <Link href={href} style={{ color: 'var(--brand)', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ChevronRight style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              {text}
            </Link>
          </li>
        );
      };

      let closedInline = false;
      for (const inner of line.split('\n').slice(1)) {
        if (inner.trim() === ':::') { closedInline = true; break; }
        const linkMatch = inner.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) pushLink(`${i}-${links.length}`, linkMatch[1], linkMatch[2]);
      }
      i++;

      if (!closedInline) {
        // Legacy multi-block form (marker / link lines / ':::' as separate array entries).
        // No live article currently uses this, but stop at the next heading regardless, so a
        // missing closer degrades to "no Also Read box" instead of swallowing the article.
        while (i < content.length && content[i] !== ':::' && !content[i].startsWith('## ') && !content[i].startsWith('### ')) {
          const linkMatch = content[i].match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) pushLink(`${i}`, linkMatch[1], linkMatch[2]);
          i++;
        }
        if (content[i] === ':::') i++;
      }

      if (links.length > 0) {
        elements.push(
          <div key={`baca-${i}`} style={{
            background: 'var(--brand-tint)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            margin: '32px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 650, color: 'var(--ink)', fontSize: '15px' }}>
              <BookOpen style={{ width: '16px', height: '16px' }} />
              Also Read
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{links}</ul>
          </div>
        );
      }
      continue;
    }

    // Bullet points: group consecutive • or - lines
    if (line.startsWith('• ') || line.startsWith('- ')) {
      const items: React.ReactNode[] = [];
      while (i < content.length && (content[i].startsWith('• ') || content[i].startsWith('- '))) {
        const itemText = content[i].replace(/^[•-]\s*/, '');
        items.push(renderInline(itemText));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{
          listStyle: 'none',
          padding: 0,
          margin: '16px 0 20px',
        }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px', fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-2)' }}>
              <span aria-hidden="true" style={{ color: 'var(--brand)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>&#x2022;</span>
              <span>{item}</span>
            </li>
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
        items.push(renderInline(itemText));
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
            <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px', fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-2)' }}>
              <span aria-hidden="true" style={{
                color: '#fff',
                background: 'var(--brand)',
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
              <span>{item}</span>
            </li>
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
                      background: 'var(--brand-tint)',
                      color: 'var(--ink)',
                      fontWeight: 650,
                      textAlign: 'left',
                      borderBottom: '1.5px solid var(--brand-line)',
                      whiteSpace: 'nowrap',
                    }}>
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid var(--line)',
                        color: 'var(--ink-2)',
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

    // Blockquote. A multi-line entry ("> **Key Takeaways:**\n> - point\n> - point")
    // renders its "- " lines as a real list instead of leaking raw "> -" markers.
    if (line.startsWith('> ')) {
      const quoteLines = line.split('\n').map((l) => l.replace(/^>\s?/, '').trim()).filter(Boolean);
      const leadLines = quoteLines.filter((l) => !/^[-•]\s/.test(l));
      const listItems = quoteLines.filter((l) => /^[-•]\s/.test(l)).map((l) => l.replace(/^[-•]\s+/, ''));
      elements.push(
        <blockquote key={i} style={{
          margin: '32px 0',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-2)',
          color: 'var(--ink)',
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: 1.6,
        }}>
          {leadLines.map((l, li) => (
            <p key={li} style={{ margin: li === 0 ? 0 : '8px 0 0' }}>{renderInline(l)}</p>
          ))}
          {listItems.length > 0 && (
            <ul style={{ margin: '10px 0 0', paddingLeft: '22px', listStyle: 'disc', fontSize: '17px', fontWeight: 400 }}>
              {listItems.map((item, li) => (
                <li key={li} style={{ marginBottom: '6px' }}>{renderInline(item)}</li>
              ))}
            </ul>
          )}
        </blockquote>
      );
      i++;
      continue;
    }

    // Answer-first summary (GEO/AEO): a 40-60 word direct answer placed under the H1.
    // Rendered as a labelled, server-side box so it sits in the first 100 words of the
    // HTML for crawlers and answer engines without needing JavaScript.
    if (line.startsWith('**Answer first:**')) {
      elements.push(
        <aside key={i} data-answer-first="true" aria-label="Quick answer" style={{
          background: 'var(--brand-tint)',
          borderLeft: '4px solid var(--brand)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 22px',
          margin: '0 0 28px',
        }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--brand)', margin: '0 0 6px' }}>
            Quick answer
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>
            {renderInline(line.replace(/^\*\*Answer first:\*\*\s*/, ''))}
          </p>
        </aside>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{
        fontSize: '17px',
        lineHeight: 1.75,
        color: 'var(--ink-2)',
        marginBottom: '22px',
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

  // Retired posts declare where they were consolidated to. Honour it.
  //
  // Fix (cycle #45, 2026-08-03): `redirectTo` was declared on the BlogPost
  // interface and set on all 194 retired posts, but nothing ever read it -- this
  // branch called notFound() for every retired post. So 194 consolidated URLs
  // served a hard 404 instead of a 301, dumping whatever authority and inbound
  // links they held, and 58 live posts still carry 220 body links straight into
  // them (the 15 articles audited today accounted for 33 of those).
  // Values are stored as a bare slug ("food-storage-containers-airtight"), with
  // a leading "/" tolerated. All 194 targets were verified to resolve to a
  // published, non-retired post: no missing targets, no chains, no self-loops.
  if (post.retired) {
    if (post.redirectTo) {
      const target = post.redirectTo.startsWith('/') ? post.redirectTo : `/blog/${post.redirectTo}`;
      permanentRedirect(target);
    }
    notFound();
  }

  if (!isPostPublished(post.date)) {
    notFound();
  }

  const toc = generateTOC(post.content);
  const contentBlocks = renderContentBlocks(post.content);
  // Related posts: slug-seeded rotation across the whole archive so internal
  // links are distributed evenly (fixes 89% orphaned posts -> 0%, which was
  // causing GSC "Discovered - currently not indexed"). 2026-06-04.
  const relatedPosts = getRelatedPosts(post, 3);
  // Extra deep-link block targeting a different archive slice, multiplying
  // inbound internal links to older/deep posts.
  const archiveDeepLinks = getArchiveDeepLinks(post, 8);
  const shopLinks = getShopLinksForPost(post, 2);
  const revisionMarker = {
    'best-indoor-plant-pots-planters-home-organization-review-2026': 'sesoris-2026-10-10-citation-fix-v1',
    'how-to-set-up-indoor-plant-watering-station-step-by-step-tutorial-2026': 'sesoris-2026-10-10-citation-fix-v1',
    'indoor-plants-home-organization-lifestyle-guide-greener-tidier-home-2026': 'sesoris-2026-10-10-citation-fix-v1',
    'how-to-build-custom-under-stair-storage-system-step-by-step-tutorial-2026': 'sesoris-2026-10-09-daily-qa-v2',
    'how-to-build-diy-under-sink-storage-system-step-by-step-tutorial-2026': 'sesoris-2026-10-09-daily-qa-v2',
    'best-under-stair-storage-solutions-review-buying-guide-2026': 'sesoris-2026-10-09-daily-qa-v2',
    'best-bedroom-nightstand-organizers-review-buying-guide-2026': 'sesoris-2026-10-08-daily-qa-v2',
    'best-desk-organizer-accessories-review-2026': 'sesoris-2026-10-08-daily-qa-v2',
    'bedroom-lifestyle-habits-keep-sleep-space-calm-organized-2026': 'sesoris-2026-10-09-daily-qa-v3',
    'work-from-home-lifestyle-habits-home-office-2026': 'sesoris-2026-10-08-daily-qa-v2',
    'how-to-set-up-home-office-desk-step-by-step-tutorial-2026': 'sesoris-2026-10-08-daily-qa-v2',
    'how-to-organize-your-bedroom-closet-step-by-step-tutorial-2026': 'sesoris-2026-10-08-daily-qa-v2',
    'floating-shelf-ideas': 'sesoris-2026-08-27-scheduled-articles-v3',
    'garage-organization-systems': 'sesoris-2026-08-27-scheduled-articles-v3',
    'garage-storage-solutions-costco-complete-review-buying-guide-2026': 'sesoris-2026-10-06-answer-first-v2',
    'shoe-storage-ideas-garage': 'sesoris-2026-10-04-answer-first-v1',
    'toy-storage-ideas-for-living-room-transform-family-space-2026': 'sesoris-2026-10-04-answer-first-v1',
    'small-home-office-organization-ideas': 'sesoris-2026-10-06-answer-first-v2',
    'bathroom-closet-organization-systems': 'sesoris-2026-10-07-systems-rewrite-v1',
    'tool-storage-organization': 'sesoris-2026-08-27-scheduled-articles-v3',
    'bathroom-shelf-ideas': 'sesoris-2026-09-01-content-gate-v2',
    'corner-cabinet-kitchen-ideas': 'sesoris-2026-09-01-content-gate-v2',
    'laundry-room-storage-ideas': 'sesoris-2026-10-06-answer-first-v2',
    'laundry-closet-ideas': 'sesoris-2026-09-03-laundry-closet-ideas-v1',
    'basement-storage-ideas': 'sesoris-2026-09-01-content-gate-v2',
    'bedroom-organization-ideas': 'sesoris-2026-09-01-content-gate-v2',
    'office-organization-ideas': 'sesoris-2026-09-01-content-gate-v2',
    'bathroom-cabinet-ideas': 'sesoris-2026-09-05-bathroom-cabinet-ideas-v2',
    'diy-room-divider': 'sesoris-2026-09-05-diy-room-divider-v2',
    'modular-closet-organization': 'sesoris-2026-09-05-modular-closet-organization-v2',
    'shoe-rack-ideas': 'sesoris-2026-09-05-shoe-rack-ideas-v2',
    'pantry-organization-bins': 'sesoris-2026-09-07-pantry-organization-bins-v2',
    'declutter-office': 'sesoris-2026-09-10-3cbe0d1',
    'kitchen-floating-shelf-ideas': 'sesoris-2026-09-10-3cbe0d1',
    'playroom-storage-ideas': 'sesoris-2026-09-10-3cbe0d1',
    'corner-shelf-ideas': 'sesoris-2026-09-12-corner-shelf-ideas-v3',
    'newborn-closet-organization': 'sesoris-2026-09-12-newborn-closet-organization-v4',
    'purse-storage-ideas': 'sesoris-2026-09-12-purse-storage-ideas-v3',
    'organizing-children-s-closet': 'sesoris-2026-09-12-organizing-children-s-closet-v1',
    'pantry-cabinet-ideas': 'sesoris-2026-09-12-pantry-cabinet-ideas-v1',
    'pantry-storage-ideas': 'sesoris-2026-09-12-pantry-storage-ideas-v1',
    'kitchen-organization-dish-rack-alternatives': 'sesoris-2026-09-10-3cbe0d1',
    'laundry-room-shelving-ideas': 'sesoris-2026-09-10-3cbe0d1',
    'playroom-organization': 'sesoris-2026-09-09-scheduled-images-v3',
    'living-room-shelving-ideas': 'sesoris-2026-09-13-scheduled-images-v2',
    'diy-shelf-brackets': 'sesoris-2026-09-13-scheduled-images-v2',
    'garage-cabinet-ideas': 'sesoris-2026-09-14-citation-repair-v1',
    'corner-closet-system': 'sesoris-2026-09-14-citation-repair-v1',
    'over-the-toilet-storage-ideas': 'sesoris-2026-09-14-citation-repair-v1',
    'yarn-storage-ideas': 'sesoris-2026-09-14-citation-repair-v1',
    'diy-wood-shelves': 'sesoris-2026-09-16-daily-article-gate-v1',
    'open-shelving-kitchen-ideas': 'sesoris-2026-09-16-daily-article-gate-v1',
    'under-stairs-closet-storage-ideas': 'sesoris-2026-09-16-daily-article-gate-v1',
    'diy-clothes-rack': 'sesoris-2026-09-16-daily-article-gate-v1',
    'organization-closet-ideas': 'sesoris-2026-09-16-daily-article-gate-v1',
    'storage-for-clothes': 'sesoris-2026-09-16-daily-article-gate-v1',
    'craft-storage-room': 'sesoris-2026-10-02-image-citation-repair-v2',
    'kitchen-cabinet-organizer-ideas': 'sesoris-2026-10-02-image-citation-repair-v2',
    'laundry-room-organization-ideas': 'sesoris-2026-10-02-image-citation-repair-v2',
    'laundry-room-organization-tips': 'sesoris-2026-10-02-image-citation-repair-v2',
    'shelf-on-wall-ideas': 'sesoris-2026-10-02-image-citation-repair-v2',
    'wall-to-wall-shelf-ideas': 'sesoris-2026-10-02-image-citation-repair-v2',
    'living-room-toy-storage-ideas': 'sesoris-2026-10-04-answer-first-v1',
    'ideas-for-shoe-storage-in-small-closet': 'sesoris-2026-10-06-answer-first-v2',
    'organization-ideas-for-small-home-office': 'sesoris-2026-10-04-answer-first-v1',
    'ideas-for-shoe-storage-in-small-space-transform-home-2026': 'sesoris-2026-10-04-answer-first-v1',
    'do-it-yourself-closet-organization-ideas': 'sesoris-2026-10-06-answer-first-v2',
    'bathroom-closet-organization-ideas-transform-storage-space-2026': 'sesoris-2026-10-04-answer-first-v1',
    'cable-management': 'sesoris-2026-10-06-answer-first-v2',
    'container-box': 'sesoris-2026-10-06-answer-first-v2',
    'storage-space-ideas-for-small-bathroom-maximize-every-inch-2026': 'sesoris-2026-10-04-answer-first-v1',
    'diy-garage-storage-solutions': 'sesoris-2026-10-06-answer-first-v2',
    'office-organization-supplies': 'sesoris-2026-10-06-answer-first-v2',
    'home-office-desk-organization': 'sesoris-2026-10-06-answer-first-v2',
    'home-storage-ideas': 'sesoris-2026-10-06-answer-first-v2',
    'storage-boxes-for-home': 'sesoris-2026-10-06-answer-first-v2',
    'garage-bike-storage-ideas': 'sesoris-2026-10-06-answer-first-v2',
    'rak-bumbu-dapur-3-susun-review-3-tier-spice-rack-2026': 'sesoris-2026-10-06-answer-first-v2',
  }[post.slug];

  // Byline resolves through the author registry (no personas, see src/data/authors.ts)
  const author = resolveAuthor(post.author);
  const authorPath = `/authors/${author.slug}`;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `https://www.sesoris.com${post.image}`,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: authorJsonLdRef(author),
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.sesoris.com/#organization',
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

  // Extract FAQ from both generated **Q:** blocks and legacy FAQ H3 sections.
  const flatForFaq = flattenContentBlocks(post.content);
  const faqItems: { question: string; answer: string }[] = [];
  let inFaqSection = false;
  for (let i = 0; i < flatForFaq.length; i++) {
    const line = flatForFaq[i];
    if (line.startsWith('## ')) {
      inFaqSection = /\bfaq\b|frequently asked questions|common questions/i.test(plainText(line));
      continue;
    }

    const isGeneratedQuestion = line.startsWith('**Q:') || line.startsWith('**Q :');
    const isLegacyQuestion = inFaqSection && line.startsWith('### ') && line.trim().endsWith('?');
    if (!isGeneratedQuestion && !isLegacyQuestion) continue;

    const question = isGeneratedQuestion
      ? plainText(line.replace(/^\*\*Q\s*:\s*/, '').replace(/\*\*$/, ''))
      : plainText(line.replace(/^###\s+/, ''));
    const answer = (i + 1 < flatForFaq.length) ? plainText(flatForFaq[i + 1]) : '';
    if (question && answer && !answer.startsWith('##') && !answer.startsWith('**Q')) {
      faqItems.push({ question, answer });
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
      <div style={{ background: 'var(--surface-2)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink-muted)' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <Link href="/blog" style={{ color: 'var(--ink-muted)' }}>Blog</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--ink-muted)' }} />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{post.category}</span>
          </div>
        </div>
      </div>

      <article>
        {/* Header */}
        <header className="container article-head">
          <div className="article-measure">
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="text-link" style={{ fontSize: '14px' }}>
              {post.category}
            </Link>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
            <div className="article-byline">
              <div className="article-author">
                <span className="article-avatar" aria-hidden>{author.avatar}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    <Link href={authorPath} rel="author" className="text-link" data-author-link={author.slug}>{author.name}</Link>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>
                    <time dateTime={post.date}>{post.dateFormatted}</time> · {post.readTime}
                  </div>
                </div>
              </div>
              <div className="article-share">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.sesoris.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook (opens in a new tab)" className="icon-btn"><Facebook /></a>
                <a href={`https://x.com/intent/post?url=${encodeURIComponent(`https://www.sesoris.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens in a new tab)" className="icon-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.9L18.9 2Zm-1.1 18.1h1.7L6.3 3.8H4.5l13.3 16.3Z" /></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.sesoris.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in a new tab)" className="icon-btn"><Linkedin /></a>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <figure style={{ margin: 0 }}>
            <div className="article-hero">
              <Image src={post.image} alt={post.imageCaption || post.title} fill priority sizes="(max-width: 1100px) 100vw, 1040px" />
            </div>
            {post.imageCaption && (
              <figcaption style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '10px' }}>
                {post.imageCaption}
              </figcaption>
            )}
          </figure>
        </div>

        <div className="container">
          <div className="article-measure">
            <div data-revision-marker={revisionMarker} data-article-content={post.slug} style={{ padding: '40px 0 48px' }}>
            {contentBlocks.slice(0, 1)}
            {/* Table of Contents follows the answer-first opening. */}
            {toc.length > 3 && (
              <nav aria-label="Table of contents" style={{
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginTop: '40px',
              }}>
                <div style={{ fontWeight: 650, fontSize: '16px', color: 'var(--ink)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen style={{ width: '16px', height: '16px' }} />
                  Table of Contents
                </div>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'toc' }}>
                  {toc.map((item, idx) => (
                    <li key={idx} style={{
                      marginBottom: '6px',
                      paddingLeft: item.level === 3 ? '20px' : '0',
                    }}>
                      <a href={`#${item.id}`} className="toc-link" style={{
                        color: item.level === 2 ? 'var(--ink-2)' : 'var(--ink-muted)',
                        fontSize: item.level === 2 ? '15px' : '14px',
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

              {contentBlocks.slice(1)}
            </div>

            {/* Author box: honest team attribution, links to the author profile page */}
            <aside aria-label="About the author" style={{
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(20px, 4vw, 28px)',
              marginBottom: '48px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <span className="article-avatar" aria-hidden>{author.avatar}</span>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '4px' }}>Written by</div>
                <Link href={authorPath} rel="author" className="text-link" style={{ fontWeight: 700, fontSize: '17px' }}>{author.name}</Link>
                <p style={{ color: 'var(--ink-muted)', fontSize: '15px', lineHeight: 1.6, margin: '8px 0 0' }}>
                  {author.bio[0]} <Link href={authorPath} className="text-link">How we write and update our guides</Link>.
                </p>
              </div>
            </aside>

            {/* Shop the Solution — links this article to real product/category pages */}
            <div style={{
              background: 'var(--brand-tint)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(20px, 4vw, 32px)',
              marginBottom: '48px',
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)', marginBottom: '18px' }}>
                Shop the solution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {shopLinks.products.map((product) => (
                  <Link key={product.slug} href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: '#fff' }}>
                      <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                        <Image src={product.images[0]?.url} alt={product.images[0]?.alt ?? product.name} fill sizes="180px" style={{ objectFit: 'contain', padding: '8%' }} />
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, marginTop: '4px' }}>
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/category/${shopLinks.categorySlug}`} className="text-link">
                Browse all {shopLinks.categoryName}
                <ArrowRight aria-hidden />
              </Link>

              {/* Secondary category links. Category pages were the most
                  link-starved money pages in the 2026-07-31 indexation review,
                  and inbound internal link count, not content length, was what
                  separated indexed URLs from uncrawled ones. Each article now
                  points at three category pages instead of one. */}
              {shopLinks.secondaryCategories.length > 0 && (
                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--brand-line)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '10px' }}>
                    Related collections
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {shopLinks.secondaryCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="chip"
                        style={{ background: '#fff', borderColor: 'transparent' }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Newsletter CTA */}
            <div className="news-card" style={{ marginBottom: '48px' }}>
              <h2>Liked this guide?</h2>
              <p>Get new organizing guides and the occasional new product by email. No spam, unsubscribe anytime.</p>
              <NewsletterForm source="article" formClass="news-form" buttonClass="btn btn-light" />
              <div className="ruler" aria-hidden />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '40px',
                paddingBottom: '40px',
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '24px' }}>
                  Related articles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="post-card" style={{ gap: '10px' }}>
                      <div className="post-card-img" style={{ aspectRatio: '16/10' }}>
                        <Image src={related.image} alt={related.title} fill sizes="(max-width: 768px) 100vw, 260px" />
                      </div>
                      <div>
                        <div className="post-card-meta"><b>{related.category}</b></div>
                        <h4 className="post-card-title" style={{ fontSize: '16px', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore More (archive deep links — spreads internal link equity) */}
            {archiveDeepLinks.length > 0 && (
              <div style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '32px',
                paddingBottom: '8px',
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px' }}>
                  Explore more articles
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px 24px' }}>
                  {archiveDeepLinks.map((link) => (
                    <li key={link.slug} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--brand)', flexShrink: 0, marginTop: '3px' }} />
                      <Link href={`/blog/${link.slug}`} className="toc-link" style={{ color: 'var(--ink-2)', fontSize: '15px', fontWeight: 500, lineHeight: 1.45 }}>
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
              borderTop: '1px solid var(--line)',
              paddingTop: '24px',
            }}>
              <Link href="/blog" className="text-link">
                <ArrowLeft aria-hidden />
                Back to the blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
