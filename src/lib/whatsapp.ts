import { SUPPORT_WHATSAPP_NUMBER } from '@/data/brand-facts';

export const WA_SITE_ORIGIN = 'https://www.sesoris.com';
export const WA_SITE_HOST = 'www.sesoris.com';

/** Absolute page URL (origin + pathname, no query string or hash). */
export function waPageUrl(pathname: string | null | undefined): string {
  const clean = (pathname || '/').split(/[?#]/)[0] || '/';
  return `${WA_SITE_ORIGIN}${clean.startsWith('/') ? clean : `/${clean}`}`;
}

/**
 * Builds a wa.me link whose prefilled text says which site and page the chat
 * came from, followed by the CTA's own intent.
 */
export function buildWhatsAppUrl(pathname: string | null | undefined, intent: string, extra?: string): string {
  const lines = [`Hi Sesoris, I'm from ${WA_SITE_HOST}. Page: ${waPageUrl(pathname)}. ${intent}`.trim()];
  if (extra && extra.trim()) lines.push('', extra.trim());
  return `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
