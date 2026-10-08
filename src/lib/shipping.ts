// Tiny on purpose: client components (announcement bar, value strip) import these
// without pulling the product catalog that checkout.ts depends on.
export const FREE_SHIPPING_MIN = 50;
export const SHIPPING_FEE = 5.99;

// FAQ answers shared by the /faq visible list and its FAQPage JSON-LD, so the two cannot drift.
// They describe the live checkout: US addresses only, one flat rate, no faster paid tier.
export const SHIPPING_TIME_ANSWER = `Orders ship from our US warehouse to US addresses only, and each product page shows its estimated delivery time in days. There is one shipping rate: free on orders over $${FREE_SHIPPING_MIN}, otherwise a flat $${SHIPPING_FEE.toFixed(2)}.`;
export const SHIPPING_COUNTRY_ANSWER = 'Not at the moment. Sesoris ships only to addresses in the United States (all 50 states and Washington, DC), and checkout accepts US addresses only.';
