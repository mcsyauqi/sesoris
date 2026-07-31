/**
 * Self-referencing hreflang for a single-locale site.
 *
 * Sesoris targets the United States market and ships exactly one US English
 * version of every page (see CLAUDE.md, section "KEPUTUSAN PASAR: US ENGLISH",
 * locked 2026-07-31). There is no translated variant, so the correct
 * annotation is a self-referencing `en-US` alternate plus an `x-default`
 * pointing at the same URL. That tells search and answer engines the page is
 * deliberately US English rather than an untagged page of unknown locale.
 *
 * The same input string is reused for `canonical` and for both language keys
 * on purpose. Next.js 16 normalizes alternate URLs through the same resolver
 * as the canonical, and a root URL gets shortened to the bare origin. Passing
 * a different literal to hreflang than to canonical would emit a pair that
 * disagree about trailing slashes, which is exactly the conflict this helper
 * exists to prevent.
 *
 * Note that `alternates` is NOT deep-merged by Next.js: a page that declares
 * its own `alternates` replaces the root layout's copy entirely
 * (see resolve-metadata.js, `case 'alternates'`). Every indexable page must
 * therefore call this helper rather than relying on inheritance.
 */
export function selfReferencingAlternates(url: string): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: url,
    languages: {
      'en-US': url,
      'x-default': url,
    },
  };
}
