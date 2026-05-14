import type { NextConfig } from "next";

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
      {
        source: '/blog/rumah-minimalis-modern',
        destination: '/blog/desain-rumah-minimalis',
        permanent: true,
      },
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
