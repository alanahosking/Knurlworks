/**
 * Minimal, server-trusted subset of src/lib/products.ts (id, name, price,
 * valid sizes) used only to validate/price incoming cart lines.
 *
 * Duplicated rather than imported from src/lib/products.ts because Vercel's
 * Function builder crashes ("exports is not defined in ES module scope")
 * when a function imports anything from outside the api/ directory —
 * confirmed by isolating the import in api/debug-echo.ts. Keep this in sync
 * with src/lib/products.ts whenever prices or sizes change there.
 *
 * Note: src/lib/products.ts's sizes() helper gives every product a variant
 * entry for all 6 standard sizes (XS-XXL) regardless of stock — inStock
 * only affects display, not which sizes are valid to check out with —
 * except p11 and p12, which pass a shorter custom size list.
 */
export interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  sizes: string[];
}

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const checkoutProducts: CheckoutProduct[] = [
  { id: 'p01', name: 'Riot Tape Heavyweight Tee', price: 48, sizes: STANDARD_SIZES },
  { id: 'p02', name: 'Static Mesh Training Tee', price: 42, sizes: STANDARD_SIZES },
  { id: 'p03', name: 'Corrosion Oversized Hoodie', price: 92, sizes: STANDARD_SIZES },
  { id: 'p04', name: 'Voltage Cropped Hoodie', price: 84, sizes: STANDARD_SIZES },
  { id: 'p05', name: 'Deadlift Reinforced Shorts', price: 56, sizes: STANDARD_SIZES },
  { id: 'p06', name: 'Static Mesh Layer Shorts', price: 52, sizes: STANDARD_SIZES },
  { id: 'p07', name: 'Fracture Seamless Leggings', price: 68, sizes: STANDARD_SIZES },
  { id: 'p08', name: 'Riot Tape Leggings', price: 64, sizes: STANDARD_SIZES },
  { id: 'p09', name: 'Undercut Stringer Tank', price: 36, sizes: STANDARD_SIZES },
  { id: 'p10', name: 'Salvage Quarter-Zip', price: 78, sizes: STANDARD_SIZES },
  { id: 'p11', name: 'Chalk Line Lifting Belt', price: 74, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'p12', name: 'Static Terry Gym Towel', price: 22, sizes: ['One Size'] },
];
