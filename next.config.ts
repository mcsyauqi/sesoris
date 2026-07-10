import type { NextConfig } from "next";
import { readFileSync, readdirSync } from "fs";
import path from "path";

// ---------------------------------------------------------------
// Legacy Indonesian blog slugs removed on 2026-06-05 (cycle #22).
// The exact list is derived from git history (deleted files under
// content/blog/) and stored in data/legacy-blog-redirects.json.
//
// IMPORTANT (2026-07-07): the previous implementation used ~100 broad
// token matchers like `/blog/:path(.*rak-dapur.*)`. Those patterns
// repeatedly caught NEW live English articles that happened to contain
// an Indonesian token, 301-ing live content to /blog (3 incidents).
// Broad matchers are banned here: every redirect must be an exact,
// one-to-one source path. scripts/check-scheduled-publishing.mjs
// verifies no redirect source collides with a live article slug.
// ---------------------------------------------------------------
const legacyBlogSlugs: string[] = JSON.parse(
  readFileSync(path.join(process.cwd(), "data", "legacy-blog-redirects.json"), "utf-8")
);

// High-impression legacy URLs should not fall back to /blog when a relevant
// live replacement exists. These overrides are exact-source only, so they do
// not reintroduce the broad false-match redirect bug.
const legacyBlogRedirectOverrides: Record<string, string> = {
  "rak-piring-aluminium-kelebihan-dan-cara-memilih":
    "/blog/rak-piring-dapur-dish-rack-guide-best-kitchen-plate-storage-solutions-2026",
  "rekomendasi-rak-piring-terbaik":
    "/blog/rak-piring-dapur-dish-rack-guide-best-kitchen-plate-storage-solutions-2026",
  "rak-penyimpanan-makanan": "/blog/glass-containers-food-storage",
  "tutorial-membuat-kitchen-island-mini-dapur-kecil":
    "/blog/kitchen-island-minimalis-untuk-dapur-modern",
};

const retiredBlogRedirects = readdirSync(path.join(process.cwd(), "content", "blog"))
  .filter((file) => file.endsWith(".json"))
  .flatMap((file) => {
    const post = JSON.parse(
      readFileSync(path.join(process.cwd(), "content", "blog", file), "utf-8")
    ) as { slug?: string; retired?: boolean; redirectTo?: string };

    if (!post.retired || !post.slug || !post.redirectTo) return [];
    return [{
      source: `/blog/${post.slug}`,
      destination: `/blog/${post.redirectTo}`,
      permanent: true,
    }];
  });

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Removed standalone landing page → /shop
      {
        source: '/rak-serbaguna-multifungsi',
        destination: '/shop',
        permanent: true,
      },
      // Pre-existing redirect now pointed to /blog (old destination was
      // also Indonesian and has been removed)
      {
        source: '/blog/rumah-minimalis-modern',
        destination: '/blog',
        permanent: true,
      },
      // Exact redirects for retired cannibalizing blog posts.
      // Source files remain in git as content archive, but are excluded from
      // blog lists/sitemaps via src/lib/blog.ts and redirected here.
      ...retiredBlogRedirects,
      // Exact redirects for every removed legacy Indonesian article.
      // One rule per removed slug; live English slugs can never match.
      ...legacyBlogSlugs.map((slug) => ({
        source: `/blog/${slug}`,
        destination: legacyBlogRedirectOverrides[slug] ?? '/blog',
        permanent: true,
      })),
      // Legacy product slug renamed Indonesian → English
      {
        source: '/product/rak-piring-stainless-steel-2-tier',
        destination: '/product/stainless-steel-2-tier-dish-rack',
        permanent: true,
      },
      // NOTE (2026-06-10): the 5 Indonesian /tools/* pages were restored
      // per user strategy decision (Indonesian-keyword tools stay live on
      // the EN site). Their old homepage redirects were removed so the
      // routes can serve again. Do NOT re-add /tools/* redirects here.
      // Redirect broken /blog/best-sellers to the actual best-sellers page
      {
        source: '/blog/best-sellers',
        destination: '/best-sellers',
        permanent: true,
      },
      // Legacy Shopify /collections/* paths → new /category/* structure
      // (Ahrefs audit 2026-05-14, fix 4XX/404 errors)
      {
        source: '/collections/plastic-storage',
        destination: '/category/home-living',
        permanent: true,
      },
      {
        source: '/collections/glass-storage',
        destination: '/category/kitchen-dining',
        permanent: true,
      },
      {
        source: '/collections/kitchen-organization',
        destination: '/category/kitchen-dining',
        permanent: true,
      },
      {
        source: '/collections/pantry-organization',
        destination: '/category/kitchen-dining',
        permanent: true,
      },
      // Catch-all /collections/* → /shop (anything legacy not in specific mappings)
      {
        source: '/collections/:slug',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/collections',
        destination: '/shop',
        permanent: true,
      },
      // /blog/collections (legacy) → /blog index
      {
        source: '/blog/collections',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
