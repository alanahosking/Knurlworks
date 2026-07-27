import { SEO } from '@/components/ui/SEO';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="This page doesn't exist. Head back to RIOTWEAR's home page or shop."
        path="/404"
      />
      <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-display text-balance text-6xl leading-[0.9] sm:text-8xl">Rack's Empty.</h1>
        <p className="max-w-md text-muted">
          Whatever you were looking for isn't on this bar. It might've been archived — nothing here restocks.
        </p>
        <div className="mt-2 flex gap-4">
          <Button as="link" to="/">
            Back home
          </Button>
          <Button as="link" to="/shop" variant="secondary">
            Shop drops
          </Button>
        </div>
      </div>
    </>
  );
}
