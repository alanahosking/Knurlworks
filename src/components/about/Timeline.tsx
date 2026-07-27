import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const milestones = [
  {
    year: '2019',
    title: 'A garage gym, a screen printer',
    copy: 'Three lifters started printing hazard-tape graphics on blank tees for their own training crew. No brand name yet, just a shared group chat.',
  },
  {
    year: '2021',
    title: 'First real drop',
    copy: '48 heavyweight tees, sold out from a single Instagram story in under a day. RIOTWEAR became a name because people kept asking for one.',
  },
  {
    year: '2023',
    title: 'Women\u2019s block launches',
    copy: 'Built from separate patterns, not shrunk men\u2019s cuts. Cropped hoodies and seamless leggings designed with women who compete, not just train.',
  },
  {
    year: '2026',
    title: 'Still small on purpose',
    copy: 'Every drop is limited and never restocked. We\u2019d rather sell out than sit in a warehouse discount bin.',
  },
];

export function Timeline() {
  return (
    <section className="container-wide py-20 md:py-28" aria-label="Brand timeline">
      <SectionHeading eyebrow="How we got here" title="A Short, Loud History" />
      <ol className="mt-14 flex flex-col">
        {milestones.map((m, i) => (
          <motion.li
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-8 last:border-b sm:grid-cols-[120px_1fr]"
          >
            <span className="font-display text-3xl text-accent sm:text-4xl">{m.year}</span>
            <div>
              <h3 className="font-display text-2xl leading-tight">{m.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{m.copy}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
