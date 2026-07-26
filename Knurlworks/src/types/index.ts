export type ProductCategory = 'tees' | 'hoodies' | 'shorts' | 'leggings' | 'accessories';

export type ProductFit = "men's" | "women's" | 'unisex';

export interface ProductVariant {
  size: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  fit: ProductFit;
  colorway: string;
  swatch: string; // hex value used for a color-dot preview
  description: string;
  tags: string[];
  isNew?: boolean;
  isLimited?: boolean;
  variants: ProductVariant[];
}

export interface CartLine {
  product: Product;
  size: string;
  quantity: number;
}

export type Theme = 'dark' | 'light';
