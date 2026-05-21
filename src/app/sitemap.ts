import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { products, categories } from '@/data/products';

const baseUrl = 'https://www.sesoris.com';

// Use fixed dates for sitemap lastmod to avoid changing on every build.
// Update these dates when actual content changes are deployed.
const LAST_CONTENT_UPDATE = '2026-03-20T00:00:00.000Z';
const LAST_BLOG_UPDATE = '2026-03-15T00:00:00.000Z';
const LAST_INFO_UPDATE = '2026-01-15T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // /collections removed from sitemap 2026-05-14 — page returned 404,
    // now 301-redirected to /shop via next.config.ts. Keep out of sitemap
    // until a dedicated /collections index is restored.
    {
      url: `${baseUrl}/new-arrivals`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-sellers`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/on-sale`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: LAST_BLOG_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map(({ slug }) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Blog article pages (date-filtered: only published, no future-dated)
  // Fixed 2026-05-21: switched from getAllSlugs() to getAllPosts() to prevent
  // GSC warnings on future-dated blog URLs (was causing 84 warnings).
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: LAST_BLOG_UPDATE,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
