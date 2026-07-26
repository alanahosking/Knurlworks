import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FeaturedCollection() {
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="container-wide py-20 md:py-28" aria-label="Featured collection">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Just landed"
          title="This Week's Damage"
          description="Fresh cuts before they're gone for good. We don't restock — once a batch sells, it's archived."
        />
        <Link
          to="/shop"
          className="group flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest2 text-fg hover:text-accent"
        >
          View full shop
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
