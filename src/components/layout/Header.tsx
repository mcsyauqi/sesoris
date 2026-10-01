import { categories } from '@/data/products';
import { HeaderClient } from './HeaderClient';

// Server wrapper: hands the client header plain category data so the
// product catalog never ships in the sitewide client bundle.
export function Header() {
  return (
    <HeaderClient
      categories={categories.map((c) => ({ name: c.name, slug: c.slug, count: c.productCount }))}
    />
  );
}
