'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Truck, Sparkles } from 'lucide-react';

const announcements = [
  { icon: Gift, text: 'Great Products, Free Shipping & Easy Returns!' },
  { icon: Sparkles, text: 'New Arrivals Every Week - Shop Now!' },
  { icon: Truck, text: 'Free Shipping on Orders Over $50' },
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) return null;

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="bg-[#1B5E3B] text-white py-2.5 px-4 relative animate-slide-down">
      <div className="container flex items-center justify-center gap-2 text-sm">
        <CurrentIcon className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium">{announcements[currentIndex].text}</span>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
