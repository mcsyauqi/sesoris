import { NextRequest, NextResponse } from 'next/server';

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

export function middleware(request: NextRequest) {
  const destination = explicit301Redirects[request.nextUrl.pathname];
  if (!destination) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    '/blog/entrance-shoe-storage-ideas',
    '/blog/entrance-shoe-storage-ideas-transform-home-first-impression-2026',
    '/blog/ideas-for-shoe-storage-in-entryway',
    '/blog/ideas-for-shoe-storage-in-garage',
    '/blog/bathroom-closet-organization-ideas-transform-storage-space-2026',
  ],
};
