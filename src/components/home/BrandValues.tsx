import { motion } from 'framer-motion';
import { Flame, Ruler, Recycle, Users } from 'lucide-react';

const values = [
  {
    icon: Flame,
    title: 'Built for the set, not the selfie',
    copy: 'Every seam is stress-tested under a bar, not just a ring light. Fabric that survives your last rep.',
  },
  {
    icon: Ruler,
    title: 'Cut for real bodies',
    copy: 'Separate blocks for men\u2019s and women\u2019s fits, plus true unisex sizing. No shrink-to-fit guessing.',
  },
  {
    icon: Recycle,
    title: 'Small batches, zero waste',
    copy: 'We drop limited runs and stop. No overproduction sitting in a warehouse waiting for a discount code.',
  },
  {
    icon: Users,
    title: 'Made with the people who wear it',
    copy: 'Every graphic starts as a sketch from someone in our lifting group chat. This brand is a group project.',
  },
];

export function BrandValues() {
  return (
    <section className="border-y border-line bg-bg-alt py-20 md:py-28" aria-label="Why KnurlWorks">
      <div className="container-wide grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-4"
          >
            <value.icon size={26} className="text-accent" aria-hidden="true" />
            <h3 className="font-display text-xl leading-tight">{value.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{value.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
