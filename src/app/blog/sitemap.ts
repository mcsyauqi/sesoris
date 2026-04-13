import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export const revalidate = 3600;

const baseUrl = 'https://www.sesoris.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
}
