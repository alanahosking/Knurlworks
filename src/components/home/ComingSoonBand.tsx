import { Button } from '@/components/ui/Button';
import { focusSignup } from '@/lib/signup';

/** Home page stand-in for the product previews while the shop is closed. */
export function ComingSoonBand() {
  return (
    <section className="container-wide py-20 text-center md:py-28" aria-label="Shop coming soon">
      <p className="eyebrow mb-4">The Shop</p>
      <h2 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">Coming Soon.</h2>
      <p className="mx-auto mt-5 max-w-md text-muted">
        Our first designs are almost here. Join the mailing list and you'll be first in line.
      </p>
      <div className="mt-8">
        <Button onClick={focusSignup}>Join the mailing list</Button>
      </div>
    </section>
  );
}
