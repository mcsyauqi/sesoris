'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { FREE_SHIPPING_MIN } from '@/lib/shipping';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="announce">
      <div className="announce-inner">
        <span>
          Free shipping on US orders over ${FREE_SHIPPING_MIN}, sent from our US warehouse.{' '}
          <Link href="/shipping">Shipping details</Link>
        </span>
      </div>
      <button className="announce-close" onClick={() => setIsVisible(false)} aria-label="Dismiss announcement">
        <X width={16} height={16} />
      </button>
    </aside>
  );
}
