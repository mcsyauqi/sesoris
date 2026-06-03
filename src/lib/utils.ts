export function formatPrice(price: number): string {
  // Product prices are stored as USD values (e.g., 19.99, 49.99).
  // Legacy data may store large IDR amounts (>= 1000); divide by 16,000 to convert.
  const usd = price >= 1000 ? price / 16000 : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd);
}

export function toUsdPrice(price: number): number {
  // Legacy: if price is IDR (>= 1000), convert to USD.
  if (price >= 1000) return Math.round((price / 16000) * 100) / 100;
  return Math.round(price * 100) / 100;
}

// Kept for backwards compatibility with imports; returns USD now.
export function toIdrPrice(price: number): number {
  return toUsdPrice(price);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}
