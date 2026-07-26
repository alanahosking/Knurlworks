import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartLine, Product } from '@/types';

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeLine: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'riotwear-cart';

function readStoredLines(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredLines);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = (product: Product, size: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id && l.size === size ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setIsOpen(true);
  };

  const removeLine = (productId: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.product.id === productId && l.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeLine(productId, size);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.product.id === productId && l.size === size ? { ...l, quantity } : l)),
    );
  };

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  );
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeLine,
    updateQuantity,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
