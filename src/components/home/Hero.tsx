import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SHOP_OPEN } from '@/lib/config';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-wide grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-[10vw] leading-[0.95] sm:text-5xl md:text-6xl"
          >
            Strength looks good on you.
            <br />
            <span className="text-accent font-bold">We just make sure your clothes do too.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted"
          >
            This is KnurlWorks™.
            <br />
            Built for the lift. Cut for the lifter.
            <br />
            Gymwear for people who want to feel as strong on the outside as they are on the inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button as="link" to="/shop">
              {SHOP_OPEN ? 'Shop' : 'Coming Soon'}
            </Button>
            <Button as="link" to="/about" variant="secondary">
              Our story
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="aspect-[3/4] overflow-hidden border border-line bg-bg-alt"
          >
            <img
              src="/images/classic-tee-back.webp"
              alt="Back of the KnurlWorks Classic Tee in washed charcoal, with the KnurlWorks wordmark across the shoulders"
              width={900}
              height={1200}
              fetchPriority="high"
              className="h-full w-full origin-[50%_45%] scale-[1.25] object-contain object-bottom"
            />
          </motion.div>

          {/* Signature element: rotating stamp, the site's recurring mark. Sits in the top third of the sample photo as a teaser. */}
          <div className="pointer-events-none absolute inset-x-0 top-[18%] flex -translate-y-1/2 justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.4, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-accent bg-bg text-center shadow-lg sm:h-[11.25rem] sm:w-[11.25rem]"
            >
              <span className="max-w-[8.125rem] font-mono text-[1rem] font-bold uppercase leading-tight tracking-widest2 text-accent sm:text-[1.0625rem]">
                {SHOP_OPEN ? 'Limited Runs' : 'Coming Soon'}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="hazard-stripe" />
    </section>
  );
}
