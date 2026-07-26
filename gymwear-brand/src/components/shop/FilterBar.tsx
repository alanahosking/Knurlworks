import { categories, fits } from '@/lib/products';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'new';

interface FilterBarProps {
  category: Product['category'] | 'all';
  fit: Product['fit'] | 'all';
  sort: SortOption;
  resultCount: number;
  onCategoryChange: (value: Product['category'] | 'all') => void;
  onFitChange: (value: Product['fit'] | 'all') => void;
  onSortChange: (value: SortOption) => void;
}

export function FilterBar({
  category,
  fit,
  sort,
  resultCount,
  onCategoryChange,
  onFitChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-line pb-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            aria-pressed={category === c.value}
            className={cn(
              'border px-4 py-2 font-mono text-xs uppercase tracking-widest2 transition-colors',
              category === c.value
                ? 'border-accent bg-accent text-[#0e0e0f]'
                : 'border-line text-fg hover:border-fg',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="eyebrow">Fit</span>
          <div className="flex gap-1.5" role="group" aria-label="Filter by fit">
            {fits.map((f) => (
              <button
                key={f.value}
                onClick={() => onFitChange(f.value)}
                aria-pressed={fit === f.value}
                className={cn(
                  'px-3 py-1.5 font-mono text-xs uppercase tracking-widest2 transition-colors',
                  fit === f.value ? 'text-accent underline underline-offset-4' : 'text-muted hover:text-fg',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden font-mono text-xs text-muted sm:block" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'item' : 'items'}
          </p>
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-line bg-transparent px-3 py-2 font-mono text-xs uppercase tracking-widest2 text-fg outline-none focus-visible:border-accent"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
