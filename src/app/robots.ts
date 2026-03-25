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
    ],
    sitemap: [
      'https://www.sesoris.com/sitemap.xml',
      'https://www.sesoris.com/blog/sitemap.xml',
    ],
  };
}
