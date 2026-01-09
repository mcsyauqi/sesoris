import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const featuredPost = {
  id: 1,
  slug: 'tips-menata-rumah-minimalis-marie-kondo',
  title: '10 Tips Menata Rumah Minimalis ala Marie Kondo',
  excerpt: 'Pelajari metode KonMari untuk merapikan rumah Anda dan hanya menyimpan barang yang membawa kebahagiaan.',
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
  category: 'Tips & Trik',
  date: '5 Januari 2026',
  readTime: '8 menit',
};

const posts = [
  {
    id: 2,
    slug: 'cara-merawat-peralatan-dapur-stainless-steel',
    title: 'Cara Merawat Peralatan Dapur Stainless Steel',
    excerpt: 'Panduan lengkap membersihkan dan merawat peralatan dapur stainless steel agar tetap mengkilap.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    category: 'Tutorial',
    date: '2 Januari 2026',
    readTime: '5 menit',
  },
  {
    id: 3,
    slug: 'inspirasi-dekorasi-kamar-tidur-2026',
    title: 'Inspirasi Dekorasi Kamar Tidur 2026',
    excerpt: 'Tren dekorasi kamar tidur terbaru yang cozy dan instagramable untuk tahun ini.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop',
    category: 'Inspirasi',
    date: '28 Desember 2025',
    readTime: '6 menit',
  },
  {
    id: 4,
    slug: 'sustainable-living-mulai-dari-rumah',
    title: 'Sustainable Living: Mulai dari Rumah',
    excerpt: 'Langkah-langkah sederhana untuk memulai gaya hidup ramah lingkungan dari rumah Anda.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
    category: 'Lifestyle',
    date: '20 Desember 2025',
    readTime: '7 menit',
  },
  {
    id: 5,
    slug: 'mengorganisir-dapur-kecil-dengan-efektif',
    title: 'Mengorganisir Dapur Kecil dengan Efektif',
    excerpt: 'Solusi cerdas untuk memaksimalkan ruang di dapur mungil Anda.',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=400&fit=crop',
    category: 'Tips & Trik',
    date: '15 Desember 2025',
    readTime: '5 menit',
  },
  {
    id: 6,
    slug: 'review-koleksi-kontainer-serbaguna-sesoris',
    title: 'Review: Koleksi Kontainer Serbaguna Sesoris',
    excerpt: 'Ulasan lengkap tentang koleksi kontainer terbaru dari Sesoris untuk berbagai kebutuhan.',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop',
    category: 'Review',
    date: '10 Desember 2025',
    readTime: '4 menit',
  },
];

const categories = ['Semua', 'Tips & Trik', 'Tutorial', 'Inspirasi', 'Lifestyle', 'Review'];

export default function BlogPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Blog</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Blog Sesoris
          </h1>
          <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Tips, inspirasi, dan panduan untuk membuat rumah Anda lebih terorganisir dan nyaman
          </p>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: i === 0 ? '#1B5E3B' : '#F8F9FA',
                color: i === 0 ? 'white' : '#6C757D',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${featuredPost.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{
            marginBottom: '64px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                <Image src={featuredPost.image} alt={featuredPost.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    background: '#E8F5E9',
                    color: '#1B5E3B',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}>
                    {featuredPost.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6C757D' }}>Artikel Pilihan</span>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#212529', marginBottom: '16px', lineHeight: 1.3 }}>
                  {featuredPost.title}
                </h2>
                <p style={{ color: '#6C757D', lineHeight: 1.6, marginBottom: '24px' }}>
                  {featuredPost.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                    <Calendar style={{ width: '14px', height: '14px' }} />
                    {featuredPost.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6C757D' }}>
                    <Clock style={{ width: '14px', height: '14px' }} />
                    {featuredPost.readTime} baca
                  </div>
                </div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#1B5E3B',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  width: 'fit-content',
                }}>
                  Baca Artikel
                  <ArrowRight style={{ width: '18px', height: '18px' }} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Posts Grid */}
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '32px' }}>
          Artikel Terbaru
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
              }}>
                <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Tag style={{ width: '14px', height: '14px', color: '#1B5E3B' }} />
                    <span style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 500 }}>{post.category}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.5, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#6C757D' }}>{post.date}</span>
                      <span style={{ fontSize: '12px', color: '#6C757D' }}>{post.readTime}</span>
                    </div>
                    <span style={{
                      color: '#1B5E3B',
                      fontWeight: 500,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      Baca
                      <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button style={{
            padding: '14px 32px',
            borderRadius: '10px',
            border: '1px solid #E9ECEF',
            background: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '15px',
            color: '#212529',
          }}>
            Muat Lebih Banyak
          </button>
        </div>

        {/* Newsletter */}
        <div style={{
          marginTop: '64px',
          padding: '48px',
          background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
            Dapatkan Tips Terbaru
          </h3>
          <p style={{ opacity: 0.9, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Berlangganan newsletter kami untuk mendapatkan artikel dan tips terbaru langsung di inbox Anda.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '450px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Alamat email Anda"
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
              }}
            />
            <button style={{
              padding: '14px 24px',
              background: 'white',
              color: '#1B5E3B',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Berlangganan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
