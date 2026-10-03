/**
 * Author registry: the single source of truth for every byline on /blog.
 *
 * Rule (Trello card xil03cdn, 2026-10-03): a byline must point to a real,
 * verifiable author. The eight names the generator used to pick at random
 * (Sarah Putri, Budi Santoso, Maya Dewi, Rina Wijaya, Hendra Kusuma,
 * Tim Sesoris, Dian Pratama, Ayu Lestari) were personas, not people: they were
 * assigned with Math.random() to AI-drafted articles and had no profile, bio,
 * or social presence anywhere. They are gone. Until a real, named person
 * agrees to be credited, every article is attributed honestly to the team.
 *
 * Adding a real person later: append an entry with type 'Person', a real bio,
 * and only sameAs links that resolve to that person's own profiles. The
 * /authors/[slug] page, BlogPosting.author, and ProfilePage JSON-LD pick it up
 * automatically. Never add a name that is not a real, consenting person.
 */

export const SITE_URL = 'https://www.sesoris.com';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export interface Author {
  slug: string;
  name: string;
  role: string;
  /** Initials shown in the byline avatar circle. */
  avatar: string;
  type: 'Person' | 'Organization';
  /** Plain-text bio, honest about how the content is produced. */
  bio: string[];
  /** Only profiles verified to belong to this author. */
  sameAs: string[];
}

/** Shape stored in content/blog/*.json under "author". */
export interface PostAuthorRef {
  name: string;
  slug: string;
  avatar: string;
  role: string;
}

export const EDITORIAL_TEAM: Author = {
  slug: 'sesoris-editorial-team',
  name: 'Sesoris Editorial Team',
  role: 'Editorial Team',
  avatar: 'SE',
  type: 'Organization',
  bio: [
    'The Sesoris Editorial Team is the in-house content team of Sesoris, an independent online home organization store founded in Yogyakarta, Indonesia. We publish storage, kitchen, closet, and workspace guides for American households.',
    'Our guides are drafted with the help of AI writing tools. Before an article goes live it must pass automated checks for US English and US-dollar pricing, and drafts that fail are discarded instead of published. Our writing rules forbid invented product tests, personal anecdotes, and statistics, and figures are meant to link to the source that contains them.',
    'We correct articles when we find an error or when a reader reports one. Updated articles show a new modified date. If you spot something wrong, tell us through the contact page and we will review it.',
  ],
  sameAs: [],
};

export const authors: Author[] = [EDITORIAL_TEAM];

export const DEFAULT_AUTHOR = EDITORIAL_TEAM;

export function authorUrl(author: Author): string {
  return `${SITE_URL}/authors/${author.slug}`;
}

/** Permanent @id for the author entity (never change once published). */
export function authorId(author: Author): string {
  return `${authorUrl(author)}#${author.type === 'Person' ? 'person' : 'team'}`;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

/**
 * Map whatever a post JSON carries to a registered author. Anything that is
 * not in the registry (old personas, typos) falls back to the team, so a
 * fictional byline can never reach the page even if it slips into content.
 */
export function resolveAuthor(raw?: { name?: string; slug?: string } | null): Author {
  if (raw?.slug) {
    const bySlug = getAuthorBySlug(raw.slug);
    if (bySlug) return bySlug;
  }
  if (raw?.name) {
    const byName = authors.find((a) => a.name === raw.name);
    if (byName) return byName;
  }
  return DEFAULT_AUTHOR;
}

export function toPostAuthorRef(author: Author): PostAuthorRef {
  return { name: author.name, slug: author.slug, avatar: author.avatar, role: author.role };
}

/** Compact JSON-LD reference used inside BlogPosting.author. */
export function authorJsonLdRef(author: Author) {
  return {
    '@type': author.type,
    '@id': authorId(author),
    name: author.name,
    url: authorUrl(author),
  };
}
