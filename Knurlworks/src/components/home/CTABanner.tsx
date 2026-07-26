import { Button } from '@/components/ui/Button';

export function CTABanner() {
  return (
    <section className="border-t border-line bg-fg text-bg">
      <div className="container-wide flex flex-col items-center gap-8 py-20 text-center md:py-24">
        <p className="eyebrow text-bg/60">No restocks. Ever.</p>
        <h2 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">
          When It's Gone,
          <br />
          It's Gone.
        </h2>
        <Button as="link" to="/shop" variant="primary" className="bg-bg text-fg hover:bg-accent hover:text-[#0e0e0f]">
          Shop before it's archived
        </Button>
      </div>
    </section>
  );
}
