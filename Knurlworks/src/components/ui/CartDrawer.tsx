import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeLine, subtotal } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/60"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-line bg-bg"
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-2xl">Your Bag</h2>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1 text-fg hover:text-accent"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted">
                  <ShoppingBag size={32} aria-hidden="true" />
                  <p className="font-mono text-sm uppercase tracking-widest2">Bag's empty</p>
                  <p className="max-w-[220px] text-sm">Go pick a fight with the shop page.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => (
                    <li key={`${line.product.id}-${line.size}`} className="flex gap-4">
                      <div
                        className="h-20 w-16 shrink-0"
                        style={{ backgroundColor: line.product.swatch, opacity: 0.35 }}
                        aria-hidden="true"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug">{line.product.name}</p>
                          <button
                            onClick={() => removeLine(line.product.id, line.size)}
                            aria-label={`Remove ${line.product.name}, size ${line.size} from cart`}
                            className="shrink-0 text-muted hover:text-accent-2"
                          >
                            <X size={16} aria-hidden="true" />
                          </button>
                        </div>
                        <p className="eyebrow mt-1">Size {line.size}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 border border-line">
                            <button
                              onClick={() => updateQuantity(line.product.id, line.size, line.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1.5 hover:text-accent"
                            >
                              <Minus size={13} aria-hidden="true" />
                            </button>
                            <span className="font-mono text-xs" aria-live="polite">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(line.product.id, line.size, line.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1.5 hover:text-accent"
                            >
                              <Plus size={13} aria-hidden="true" />
                            </button>
                          </div>
                          <span className="font-mono text-sm">{formatPrice(line.product.price * line.quantity)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-line px-6 py-5">
                <div className="mb-4 flex items-center justify-between font-mono text-sm">
                  <span className="uppercase tracking-widest2 text-muted">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button variant="primary" className="w-full">
                  Checkout
                </Button>
                <p className="mt-3 text-center text-xs text-muted">Shipping and taxes calculated at checkout.</p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
