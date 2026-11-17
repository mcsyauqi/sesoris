import { NextRequest, NextResponse } from 'next/server';
import legacyBlog301Map from '../data/legacy-blog-301-map.json';

const explicit301Redirects: Record<string, string> = {
  '/blog/entrance-shoe-storage-ideas':
    '/blog/small-entryway-shoe-storage-ideas-smart-solutions-tiny-spaces-2026',
  '/blog/entrance-shoe-storage-ideas-transform-home-first-impression-2026':
    '/blog/small-entryway-shoe-storage-ideas-smart-solutions-tiny-spaces-2026',
  '/blog/ideas-for-shoe-storage-in-entryway':
    '/blog/small-entryway-shoe-storage-ideas-smart-solutions-tiny-spaces-2026',
  '/blog/ideas-for-shoe-storage-in-garage': '/blog/shoe-storage-ideas-garage',
  '/blog/bathroom-closet-organization-ideas-transform-storage-space-2026':
    '/blog/bathroom-closet-organization-systems',
};

// Removed Indonesian articles that have a clear live English equivalent
// (2026-11-17). Exact slug -> slug, 301. These slugs are excluded from the
// generic `/blog` fallback in next.config.ts, because config redirects run
// before middleware and would otherwise answer with a 308 to /blog.
for (const [from, to] of Object.entries(legacyBlog301Map as Record<string, string>)) {
  explicit301Redirects[`/blog/${from}`] = `/blog/${to}`;
}

export function middleware(request: NextRequest) {
  const destination = explicit301Redirects[request.nextUrl.pathname];
  if (!destination) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Single-segment blog paths only; the lookup above is exact-match, so live
  // articles fall straight through to NextResponse.next().
  matcher: ['/blog/:slug'],
};
