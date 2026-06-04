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
      // ---------------------------------------------------------------
      // Site targets US/English audience.
      // 169 Indonesian-slug blog articles + 1 Indonesian-slug landing
      // page (/rak-serbaguna-multifungsi) were removed on 2026-06-05.
      // The patterns below 301-redirect every legacy Indonesian URL to
      // /blog/ (or /shop/) so external links and SERP hits preserve
      // equity without serving Indonesian content.
      // ---------------------------------------------------------------
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
      // Indonesian-keyword catch-all patterns → /blog
      // Named regex group ensures only slugs containing the Indonesian
      // token match; English slugs continue to serve normally.
      { source: '/blog/:path(.*kamar-mandi.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kamar-tidur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kamar-kost.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rumah-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rumah-tangga.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rumah-kecil.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rumah-estetik.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rumah-rapi.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*di-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*ruang-tamu.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*ruang-keluarga.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*ruang-makan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*ruang-kecil.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dapur-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dapur-kecil.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*desain-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*alat-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*alat-camping.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tren-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-pakaian.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-baju.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-piring.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lemari-makan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-sabun.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-piring.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-sampah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-bumbu.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-tidur-dengan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-kue.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-alat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-dokumen.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tempat-sepatu.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-piring.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-dinding.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-buku.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-bumbu.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-mainan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-serbaguna.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-stainless.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-tanaman.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-mesin.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-microwave.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-monitor.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-panci.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-sepeda.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-gantung.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*rak-kolong.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*meja-rias.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*meja-belajar.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*meja-tv-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-membuat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-memilih.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-merawat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-merapikan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-menata.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-menyimpan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-menciptakan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*cara-declutter.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tips-membuat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tips-menata.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tips-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*panduan-memilih.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*panduan-lengkap.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*panduan-dekorasi.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tutorial-membuat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*jenis-jenis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dekorasi-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dekorasi-kamar.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dekorasi-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*dekorasi-ruang.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*denah-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*inspirasi-dapur.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*inspirasi-dekorasi.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*belanja-hemat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*checklist-pindah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*checklist-perlengkapan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*perlengkapan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*lebaran.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*bersih-bersih.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*organizer-kamar.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*organizer-perlengkapan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*organizer-pisau.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*tas-organizer.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*bag-organizer-travel.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kotak-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kotak-kayu-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*box-penyimpanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*keranjang.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*wadah-makanan.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*minimalis-modern.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*modern-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kitchen-set-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*gaya-hidup-minimalis.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*hidup-berkualitas.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*menciptakan-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*transformasi-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*sustainable-living-mulai.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*home-office-yang-produktif.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*warna-cat-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*teras-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*interior-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*vertical-garden-rumah.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*storage-box-baju.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*storage-box-lipat.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*storage-box-mini.*)', destination: '/blog', permanent: true },
      { source: '/blog/:path(.*kerja-dari-rumah.*)', destination: '/blog', permanent: true },
      // Legacy product slug renamed Indonesian → English
      {
        source: '/product/rak-piring-stainless-steel-2-tier',
        destination: '/product/stainless-steel-2-tier-dish-rack',
        permanent: true,
      },
      // Removed Indonesian /tools/* pages (5 calculators/quizzes shipped
      // before the i18n conversion). All redirected to the homepage.
      {
        source: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/kalkulator-kapasitas-kebutuhan-storage-box',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/konverter-satuan-online',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/penggaris-alat-ukur-online',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk',
        destination: '/',
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
