import { SEO } from '@/components/ui/SEO';
import { Button } from '@/components/ui/Button';

export default function CheckoutCancel() {
  return (
    <>
      <SEO
        title="Checkout Cancelled"
        description="Your KnurlWorks checkout was cancelled. Your bag is still here."
        path="/checkout/cancel"
      />
      <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="eyebrow">Checkout cancelled</p>
        <h1 className="font-display text-balance text-6xl leading-[0.9] sm:text-8xl">Still In Your Bag.</h1>
        <p className="max-w-md text-muted">
          Nothing was charged. Your bag's still packed whenever you're ready to finish up.
        </p>
        <div className="mt-2 flex gap-4">
          <Button as="link" to="/shop">
            Back to shop
          </Button>
          <Button as="link" to="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </>
  );
}
