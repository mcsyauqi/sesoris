// Run: npx tsx scripts/check-product-dims.ts  (fails loudly if the card dimension parser regresses)
import assert from 'node:assert';
import { shortDimensions } from '../src/lib/product-dims';
import { products } from '../src/data/products';
import type { Product } from '../src/types';

const p = (value: string) => ({ specifications: [{ label: 'Dimensions', value }] }) as unknown as Product;
assert.equal(shortDimensions(p('14 x 21 x 2.5 in. (355.6 x 533.4 x 63.5 mm), W x D x H')), '14 × 21 × 2.5 in.');
assert.equal(shortDimensions(p('15.35 x 10.24 x 12.60 in.')), '15.35 × 10.24 × 12.60 in.');
assert.equal(shortDimensions(p('30 x 20 cm')), null);
const shown = products.filter((x) => shortDimensions(x)).length;
console.log(`product-dims ok, ${shown}/${products.length} catalog cards show dimensions`);
