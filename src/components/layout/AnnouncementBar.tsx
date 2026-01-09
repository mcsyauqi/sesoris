'use client';

import { useState } from 'react';
import { X, Gift, Truck, Sparkles } from 'lucide-react';

const messages = [
  { icon: Gift, text: 'Great Products, Free Shipping & Easy Returns!' },
  { icon: Truck, text: 'Free Shipping on Orders Over $50' },
  { icon: Sparkles, text: 'New Arrivals Every Week - Shop Now!' },
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage] = useState(0);

  if (!isVisible) return null;

  const { icon: Icon, text } = messages[currentMessage];

  return (
    <div style={{
      background: '#1B5E3B',
      color: 'white',
      padding: '8px 16px',
      fontSize: '13px',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <Icon style={{ width: '14px', height: '14px' }} />
        <span>{text}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        <X style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
}
