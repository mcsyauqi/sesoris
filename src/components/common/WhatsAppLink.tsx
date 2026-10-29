'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type Props = {
  intent: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

/** WhatsApp CS link with the current page URL prefilled (correct in SSR HTML and after navigation). */
export function WhatsAppLink({ intent, children, className, target, rel }: Props) {
  const pathname = usePathname();
  return (
    <a href={buildWhatsAppUrl(pathname, intent)} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}
