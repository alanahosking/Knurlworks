import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="container-wide border-b border-line py-16 md:py-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow mb-6"
      >
        Our story
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl text-balance font-display text-5xl leading-[0.95] sm:text-7xl"
      >
        We Made the Gymwear We Couldn't Find on the Rack.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 max-w-xl text-base leading-relaxed text-muted"
      >
        RIOTWEAR started in a shared garage gym, not a boardroom. Every big activewear brand looked the same:
        clean logos, soft pastels, gear built for a studio class. We wanted something with more edge — clothing
        that could take a chalk hand, a dropped plate, and a night out afterward.
      </motion.p>
    </section>
  );
}
