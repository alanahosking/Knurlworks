import { SEO } from '@/components/ui/SEO';
import { Button } from '@/components/ui/Button';
import { focusSignup } from '@/lib/signup';

/** Shown on /shop while the catalogue is closed. See SHOP_OPEN in lib/config.ts. */
export function ShopComingSoon() {
  return (
    <>
      <SEO
        title="Shop Coming Soon"
        description="The KnurlWorks shop is almost open. Join the mailing list to be first in line for our first pump covers, oversized gym shirts built heavy."
        path="/shop"
      />
      <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="eyebrow">The Shop</p>
        <h1 className="font-display text-balance text-6xl leading-[0.9] sm:text-8xl">Coming Soon.</h1>
        <p className="max-w-md text-muted">
          Our first pump covers (oversized gym shirts) are almost here. Join the mailing list and you'll be first in line.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Button onClick={focusSignup}>Join the mailing list</Button>
          <Button as="link" to="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </>
  );
}
