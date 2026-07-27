import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCcw, PackageX } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';
import { FilterBar, type SortOption } from '@/components/shop/FilterBar';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { products as catalog } from '@/lib/products';
import type { Product } from '@/types';

type LoadState = 'loading' | 'success' | 'error';

// Simulates an async product fetch (e.g. from a commerce API) so the page
// can demonstrate real loading and error states rather than static data.
function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      // Reject roughly 1 in 40 loads to exercise the error/retry path.
      if (Math.random() < 0.025) {
        reject(new Error('Network request failed'));
        return;
      }
      resolve(catalog);
    }, 550);
  });
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<LoadState>('loading');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const category = (searchParams.get('category') as Product['category'] | 'all') || 'all';
  const fit = (searchParams.get('fit') as Product['fit'] | 'all') || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'featured';

  const load = useCallback(() => {
    setState('loading');
    fetchProducts()
      .then((data) => {
        setAllProducts(data);
        setState('success');
      })
      .catch(() => setState('error'));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visibleProducts = useMemo(() => {
    let list = allProducts;
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (fit !== 'all') list = list.filter((p) => p.fit === fit);

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'new') sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return sorted;
  }, [allProducts, category, fit, sort]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'featured') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <SEO
        title="Shop Alternative Gymwear"
        description="Browse RIOTWEAR's full catalog of heavyweight tees, hoodies, shorts and leggings for men, women, and unisex fits."
        path="/shop"
      />

      <div className="container-wide py-12 md:py-16">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4">Full catalog</p>
          <h1 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">The Shop</h1>
        </div>

        <FilterBar
          category={category}
          fit={fit}
          sort={sort}
          resultCount={visibleProducts.length}
          onCategoryChange={(v) => updateParam('category', v)}
          onFitChange={(v) => updateParam('fit', v)}
          onSortChange={(v) => updateParam('sort', v)}
        />

        <div className="pt-12">
          {state === 'loading' && (
            <div
              className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
              aria-busy="true"
              aria-live="polite"
            >
              <span className="sr-only">Loading products…</span>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center gap-5 border border-line py-20 text-center" role="alert">
              <PackageX size={32} className="text-accent-2" aria-hidden="true" />
              <div>
                <p className="font-display text-2xl">Couldn't load the shop.</p>
                <p className="mt-2 text-sm text-muted">The catalog request failed. Check your connection and try again.</p>
              </div>
              <Button onClick={load} variant="secondary" className="gap-2">
                <RefreshCcw size={14} aria-hidden="true" />
                Retry
              </Button>
            </div>
          )}

          {state === 'success' && visibleProducts.length === 0 && (
            <div className="flex flex-col items-center gap-4 border border-line py-20 text-center">
              <PackageX size={32} className="text-muted" aria-hidden="true" />
              <div>
                <p className="font-display text-2xl">Nothing here.</p>
                <p className="mt-2 text-sm text-muted">No products match these filters yet. Try a different combination.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
              >
                Clear filters
              </Button>
            </div>
          )}

          {state === 'success' && visibleProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
