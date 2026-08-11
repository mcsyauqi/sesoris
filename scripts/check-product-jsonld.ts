#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { products } from '../src/data/products';
import { buildProductSchema } from '../src/lib/product-schema';

type ProductSchema = ReturnType<typeof buildProductSchema>;
type Offer = {
  price?: unknown;
  priceValidUntil?: unknown;
  availability?: unknown;
};

const today = new Date().toISOString().slice(0, 10);
const productRoute = path.join(process.cwd(), 'src', 'app', 'product', '[slug]', 'page.tsx');
const shopRoute = path.join(process.cwd(), 'src', 'app', 'shop', 'page.tsx');
const categoryRoute = path.join(process.cwd(), 'src', 'app', 'category', '[slug]', 'page.tsx');

const productRouteSource = fs.readFileSync(productRoute, 'utf8');
const shopRouteSource = fs.readFileSync(shopRoute, 'utf8');
const categoryRouteSource = fs.readFileSync(categoryRoute, 'utf8');

assert.match(productRouteSource, /buildProductSchema/);
assert.doesNotMatch(shopRouteSource, /['"]@type['"]\s*:\s*['"]Product['"]/);
assert.doesNotMatch(categoryRouteSource, /['"]@type['"]\s*:\s*['"]Product['"]/);

for (const product of products) {
  const schema = buildProductSchema(product) as ProductSchema;
  const offer = schema.offers as Offer;
  const expectedAvailability = product.inStock
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';
  const validUntil = String(offer.priceValidUntil ?? '');

  assert.equal(schema['@type'], 'Product', `${product.slug}: schema type must be Product`);
  assert.equal(typeof offer.price, 'number', `${product.slug}: offer price must be numeric`);
  assert.ok(Number.isFinite(offer.price), `${product.slug}: offer price must be finite`);
  assert.ok(Number(offer.price) > 0, `${product.slug}: offer price must be greater than zero`);
  assert.match(validUntil, /^\d{4}-\d{2}-\d{2}$/, `${product.slug}: invalid priceValidUntil`);
  assert.ok(validUntil >= today, `${product.slug}: priceValidUntil ${validUntil} is expired (today=${today})`);
  assert.equal(offer.availability, expectedAvailability, `${product.slug}: availability does not match inStock`);
}

console.log(`OK — ${products.length} product offers validated from shared rendered schema data (today=${today}).`);
console.log('OK — shop and category routes contain no Product JSON-LD objects.');
