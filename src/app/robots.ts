import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
          '/wishlist/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
          '/wishlist/',
        ],
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: [
      'https://www.sesoris.com/sitemap.xml',
      'https://www.sesoris.com/blog/sitemap.xml',
    ],
  };
}
