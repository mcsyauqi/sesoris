'use client';
import { useState } from 'react';
import Link from 'next/link';
import { widgetCardStyle, widgetTitleStyle, widgetButtonRowStyle, widgetResultStyle } from '../tool-ui';
import { getProductBySlug } from '@/data/products';

const ROOMS = [
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bath', label: 'Bathroom' },
  { id: 'living', label: 'Living room' },
] as const;

const SIZES = [
  { id: 'small', label: 'Small (under 100 sq ft)' },
  { id: 'medium', label: 'Medium (100-160 sq ft)' },
  { id: 'large', label: 'Large (over 160 sq ft)' },
] as const;

const BUDGETS = [
  { id: 'low', label: 'Under $20', max: 20 },
  { id: 'mid', label: '$20 - $60', max: 60 },
  { id: 'high', label: 'Over $60', max: Infinity },
] as const;

// Real catalog picks per room, ordered space-saving first (small rooms get the top of the list)
const ROOM_PICKS: Record<string, string[]> = {
  bedroom: ['foldable-storage-bins', 'multi-purpose-storage-pouch', 'rak-dinding-floating-shelf-set', 'rak-sepatu-minimalis-5-tingkat'],
  kitchen: ['stainless-steel-2-tier-dish-rack', 'portable-blender', 'smart-water-bottle', 'electric-wine-opener'],
  bath: ['mesh-zipper-pouches-set', 'hanging-travel-organizer', 'travel-toiletry-bag', 'aromatherapy-diffuser'],
  living: ['gantungan-kunci-dinding-magnetik', 'rak-dinding-floating-shelf-set', 'ceramic-plant-pot-set', 'rak-buku-minimalis-industrial'],
};

const ROOM_TIPS: Record<string, string> = {
  small: 'For a small room, prioritize wall-mounted and foldable storage so the floor stays clear.',
  medium: 'A medium room fits a mix of wall storage and one or two freestanding organizers.',
  large: 'A large room can handle bigger freestanding pieces like shelving units and multi-tier racks.',
};

export default function ToolWidget() {
  const [room, setRoom] = useState('');
  const [size, setSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ picks: { name: string; slug: string; price: number }[]; tip: string } | null>(null);
  const [error, setError] = useState('');

  const generate = () => {
    if (!room || !size || !budget) {
      setError('Answer all 3 questions first.');
      setResult(null);
      return;
    }
    setError('');
    const maxPrice = BUDGETS.find((b) => b.id === budget)!.max;
    const all = ROOM_PICKS[room].map((slug) => getProductBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
    let picks = all.filter((p) => p.price <= maxPrice);
    if (picks.length === 0) picks = all; // ponytail: no catalog item over $60, show best matches instead of nothing
    setResult({
      picks: picks.slice(0, 3).map((p) => ({ name: p.name, slug: p.slug, price: p.price })),
      tip: ROOM_TIPS[size],
    });
  };

  const reset = () => {
    setRoom(''); setSize(''); setBudget(''); setResult(null); setError('');
  };

  const questionBox: React.CSSProperties = { marginBottom: '16px', padding: '12px', background: '#fff', border: '1px solid #E9ECEF', borderRadius: '8px' };
  const qTitle: React.CSSProperties = { fontWeight: 600, margin: '0 0 8px 0' };
  const optLabel: React.CSSProperties = { display: 'block', padding: '6px 0', cursor: 'pointer' };

  return (
    <section style={widgetCardStyle}>
      <h2 style={widgetTitleStyle}>Quiz</h2>
      <div style={questionBox}>
        <p style={qTitle}>1. Which room do you want to organize first?</p>
        {ROOMS.map((r) => (
          <label key={r.id} style={optLabel}>
            <input type="radio" name="room" checked={room === r.id} onChange={() => setRoom(r.id)} /> {r.label}
          </label>
        ))}
      </div>
      <div style={questionBox}>
        <p style={qTitle}>2. How big is the room?</p>
        {SIZES.map((s) => (
          <label key={s.id} style={optLabel}>
            <input type="radio" name="size" checked={size === s.id} onChange={() => setSize(s.id)} /> {s.label}
          </label>
        ))}
      </div>
      <div style={questionBox}>
        <p style={qTitle}>3. What is your budget?</p>
        {BUDGETS.map((b) => (
          <label key={b.id} style={optLabel}>
            <input type="radio" name="budget" checked={budget === b.id} onChange={() => setBudget(b.id)} /> {b.label}
          </label>
        ))}
      </div>
      <div style={widgetButtonRowStyle}>
        <button type="button" className="btn btn-primary" onClick={generate}>Generate</button>
        <button type="button" className="btn btn-outline" onClick={reset}>Reset</button>
      </div>
      {(result || error) && (
        <div style={widgetResultStyle}>
          {error && <p style={{ color: '#B02A37', textAlign: 'center', margin: 0 }}>{error}</p>}
          {result && (
            <div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B5E3B', textAlign: 'center', margin: '0 0 4px 0' }}>
                Recommended for you
              </p>
              <p style={{ color: '#444', textAlign: 'center', margin: '0 0 12px 0' }}>{result.tip}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {result.picks.map((p) => (
                  <li key={p.slug} style={{ padding: '8px 0', borderTop: '1px solid #E9ECEF', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <Link href={`/product/${p.slug}`} style={{ color: '#1B5E3B', fontWeight: 500 }}>{p.name}</Link>
                    <span style={{ color: '#444' }}>${p.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
