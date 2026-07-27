import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-wide grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            Est. underground — season 04
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-[15vw] leading-[0.86] sm:text-7xl md:text-8xl"
          >
            TRAIN
            <br />
            <span className="text-accent">LOUD.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted"
          >
            Gymwear for lifters who don't dress for the mirror photo, they dress for the ones who show up early
            and leave last. Heavyweight fabric, hazard-cut graphics, zero apologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button as="link" to="/shop">
              Shop the drop
            </Button>
            <Button as="link" to="/about" variant="secondary">
              Our story
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="absolute inset-6 flex items-center justify-center border border-line bg-bg-alt"
          >
            <svg viewBox="0 0 240 240" className="h-3/4 w-3/4" role="img" aria-label="Riot tape heavyweight tee schematic">
              <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" className="text-fg">
                <path d="M70 60 L100 40 L140 40 L170 60 L200 50 L215 85 L190 100 L180 90 L180 210 L60 210 L60 90 L50 100 L25 85 L55 60Z" />
                <path d="M100 40 C100 55 140 55 140 40" />
              </g>
              <path
                d="M45 120 L215 120"
                stroke="rgb(var(--color-accent))"
                strokeWidth="16"
                strokeDasharray="18 14"
                opacity="0.85"
              />
            </svg>
          </motion.div>

          {/* Signature element: rotating hazard stamp — the site's recurring mark */}
          <motion.div
            initial={{ opacity: 0, scale: 1.4, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute -right-3 -top-3 flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-bg text-center"
          >
            <span className="font-mono text-[0.6rem] font-bold uppercase leading-tight tracking-widest2 text-accent">
              No Restock
            </span>
          </motion.div>
        </div>
      </div>

      <div className="hazard-stripe" />
    </section>
  );
}
