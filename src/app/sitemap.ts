import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { products, categories } from '@/data/products';
import { comparisonGuides } from '@/data/comparison-guides';

// ISR: regenerate sitemap every hour so scheduled blog publishes appear
// without requiring a deploy (cycle #16 fix, 2026-05-25).
export const revalidate = 3600;

const baseUrl = 'https://www.sesoris.com';

// Content/blog lastmod is now derived dynamically:
//   - Blog pages use each post's own publishDate (post.date) so Google sees
//     fresh signals when new articles publish (was stale at 2026-03-15 prior
//     to cycle #16, 2026-05-25).
//   - Shop / category / product / blog-index lastmod tracks the most recent
//     published blog date (proxy for "site content was last touched").
//   - Static info pages keep an older, infrequent timestamp.
function computeLatestBlogDate(): string {
  try {
    const posts = getAllPosts();
    if (posts.length === 0) return new Date().toISOString();
    // getAllPosts() already sorts desc by date
    return new Date(posts[0].date).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

const LAST_BLOG_UPDATE = computeLatestBlogDate();
const LAST_CONTENT_UPDATE = LAST_BLOG_UPDATE;
const LAST_INFO_UPDATE = '2026-01-15T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
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
    // /collections removed from sitemap 2026-05-14, page returned 404,
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
      url: `${baseUrl}/guides`,
      lastModified: '2026-08-12T00:00:00.000Z',
      changeFrequency: 'monthly',
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
    // Free /tools/* utility pages (restored 2026-06-10; Indonesian-keyword
    // tools kept live per user strategy decision)
    {
      url: `${baseUrl}/tools/penggaris-alat-ukur-online`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/konverter-satuan-online`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/kalkulator-kapasitas-kebutuhan-storage-box`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk`,
      lastModified: LAST_INFO_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis`,
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

  const comparisonGuidePages: MetadataRoute.Sitemap = comparisonGuides.map(({ slug }) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: '2026-08-12T00:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog article pages (date-filtered: only published, no future-dated)
  // Fixed 2026-05-21: switched from getAllSlugs() to getAllPosts() to prevent
  // GSC warnings on future-dated blog URLs (was causing 84 warnings).
  // Fixed 2026-05-25 (cycle #16): use per-post date so lastmod reflects actual
  // publish date instead of a single hardcoded constant.
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...comparisonGuidePages, ...blogPages];
}
