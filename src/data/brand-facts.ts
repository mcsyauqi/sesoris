/**
 * Verifiable brand facts for Sesoris.
 *
 * One source for the About page, the "What is Sesoris?" page, the Press page,
 * the Contact page schema, and the Organization JSON-LD in the root layout.
 * Every entry must be checkable from a public record (linked in `source`) or
 * from this codebase. Do not add awards, press coverage, ratings, follower
 * counts, or customer numbers unless a public source proves them.
 *
 * Last checked live: 2026-10-09.
 */

export { ORGANIZATION_ID } from '@/data/authors';

export const BRAND_FACTS_CHECKED = 'October 9, 2026';

/** Verisign RDAP registration event for sesoris.com: 2019-06-04T15:25:05Z. */
export const DOMAIN_REGISTERED = {
  year: '2019',
  label: 'June 4, 2019',
  source: 'https://lookup.icann.org/en/lookup?name=sesoris.com',
};

/** Earliest Internet Archive capture of sesoris.com with HTTP 200 (a Sesoris Shopify page). */
export const FIRST_ARCHIVED = {
  label: 'May 28, 2020',
  source: 'https://web.archive.org/web/20200528182003/https://sesoris.com/',
};

/**
 * Official profiles. Each one returned HTTP 200 on 2026-10-09 and is listed in
 * the site footer or contact page. X (@sesoris_com) is NOT here: x.com answers
 * "User Profile Not Found" for that handle.
 */
export const OFFICIAL_PROFILES = [
  { network: 'Instagram', handle: '@sesoris_com', url: 'https://www.instagram.com/sesoris_com' },
  { network: 'Facebook', handle: 'facebook.com/sesoris', url: 'https://www.facebook.com/sesoris' },
  { network: 'TikTok', handle: '@sesoris', url: 'https://www.tiktok.com/@sesoris' },
  { network: 'YouTube', handle: '@sesoris', url: 'https://www.youtube.com/@sesoris' },
  { network: 'Pinterest', handle: 'sesoris_com', url: 'https://www.pinterest.com/sesoris_com/' },
] as const;

export const SAME_AS: string[] = OFFICIAL_PROFILES.map((p) => p.url);

export const SUPPORT_EMAIL = 'admin@sesoris.com';
export const SUPPORT_WHATSAPP = '+62-813-2610-2061';
export const SUPPORT_WHATSAPP_URL = 'https://wa.me/6281326102061';

/** SmartCustomer (formerly Sitejabber) listing for sesoris.com: 0 reviews on 2026-10-09. */
export const SMARTCUSTOMER_PROFILE = 'https://www.smartcustomer.com/reviews/sesoris.com';
