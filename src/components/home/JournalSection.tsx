import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getAllPosts, type BlogPost } from '@/lib/blog';

function PostCard({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <div className="post-card-img">
        <Image
          src={post.image}
          alt=""
          fill
          sizes={lead ? '(max-width: 900px) 92vw, 56vw' : '(max-width: 900px) 92vw, 180px'}
        />
      </div>
      <div>
        <div className="post-card-meta">
          <b>{post.category}</b>
          <span>{post.readTime}</span>
        </div>
        <h3 className="post-card-title" style={{ marginTop: 6 }}>{post.title}</h3>
        {lead && <p className="post-card-excerpt" style={{ marginTop: 8 }}>{post.excerpt}</p>}
      </div>
    </Link>
  );
}

export function JournalSection() {
  const [lead, ...rest] = getAllPosts().slice(0, 3);
  if (!lead) return null;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">Guides from the blog</h2>
            <p className="section-lede">New organizing guides every day, from pantry layouts to small-closet fixes.</p>
          </div>
          <Link href="/blog" className="text-link">
            All articles <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="journal-grid">
          <div className="journal-lead"><PostCard post={lead} lead /></div>
          <div className="journal-side">
            {rest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
