import { motion } from 'framer-motion';

const commitments = [
  'We design in men\u2019s, women\u2019s, and unisex blocks — never one pattern stretched three ways.',
  'Every heavyweight tee and hoodie is sample-tested by our own lifting group before it goes into production.',
  'We run limited batches. When a drop sells out, it\u2019s archived, not reprinted at a lower quality.',
  'No stock photography. Every product on this site is drafted the way our pattern makers actually see it.',
];

export function Values() {
  return (
    <section className="border-y border-line bg-bg-alt py-20 md:py-28" aria-label="What we stand for">
      <div className="container-wide grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-balance font-display text-4xl leading-[0.95] sm:text-5xl"
        >
          What We Won't Compromise On.
        </motion.h2>
        <ul className="flex flex-col gap-6">
          {commitments.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 border-b border-line pb-6 text-base leading-relaxed last:border-b-0"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
