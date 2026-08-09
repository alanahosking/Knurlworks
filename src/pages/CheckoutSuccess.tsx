import { useEffect } from 'react';
import { SEO } from '@/components/ui/SEO';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title="Order Confirmed"
        description="Your KnurlWorks order is confirmed."
        path="/checkout/success"
      />
      <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="font-display text-balance text-6xl leading-[0.9] sm:text-8xl">You're In.</h1>
        <p className="max-w-md text-muted">
          Payment went through and a receipt is on its way to your inbox. We'll email you again once it ships.
        </p>
        <div className="mt-2 flex gap-4">
          <Button as="link" to="/shop">
            Keep shopping
          </Button>
          <Button as="link" to="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </>
  );
}
