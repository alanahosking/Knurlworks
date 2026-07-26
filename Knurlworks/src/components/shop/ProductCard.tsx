import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from '@/components/ui/ProductArt';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const availableSizes = product.variants.filter((v) => v.inStock);

  const handleAdd = () => {
    if (!selectedSize) {
      setShowSizes(true);
      return;
    }
    addItem(product, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-alt">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProductArt category={product.category} swatch={product.swatch} className="h-full w-full" />
        </div>

        <div className="absolute left-0 top-0 flex flex-col gap-1.5 p-3">
          {product.isNew && <Badge tone="accent">New</Badge>}
          {product.isLimited && <Badge tone="accent-2">Limited</Badge>}
          {product.compareAtPrice && <Badge tone="muted">Sale</Badge>}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-bg/95 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {showSizes ? (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Select size for ${product.name}`}>
              {availableSizes.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  aria-pressed={selectedSize === v.size}
                  className={`border px-2.5 py-1 font-mono text-[0.65rem] uppercase transition-colors ${
                    selectedSize === v.size
                      ? 'border-accent bg-accent text-[#0e0e0f]'
                      : 'border-line text-fg hover:border-fg'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          ) : null}
          <button
            onClick={handleAdd}
            className="w-full bg-fg py-2.5 font-mono text-xs font-semibold uppercase tracking-widest2 text-bg transition-colors hover:bg-accent hover:text-[#0e0e0f]"
          >
            {justAdded ? 'Added ✓' : showSizes && !selectedSize ? 'Pick a size' : 'Add to cart'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">{product.colorway}</p>
          <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        </div>
        <div className="shrink-0 text-right font-mono text-sm">
          {product.compareAtPrice && (
            <span className="mr-1.5 text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
          <span className={product.compareAtPrice ? 'text-accent-2' : ''}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </motion.article>
  );
}
