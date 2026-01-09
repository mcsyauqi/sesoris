export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  price: number;
  compareAtPrice?: number;
  images: { url: string; alt: string }[];
  category: Category;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  content: string;
  rating: number;
  verified: boolean;
}
