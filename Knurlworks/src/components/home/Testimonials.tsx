import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const quotes = [
  {
    quote: 'First tee I own that still looks new after leg day sweat and a hundred washes. The hazard tape print hasn\u2019t cracked once.',
    name: 'D. Osei',
    role: 'Powerlifting coach, 4 years training',
  },
  {
    quote: 'I lift at 5am and look like I\u2019m going clubbing after. That\u2019s exactly the vibe I wanted from gym clothes.',
    name: 'M. Alvarez',
    role: 'Competitive bodybuilder',
  },
  {
    quote: 'The Voltage hoodie is the only cropped piece that doesn\u2019t ride up mid-set. Finally, someone tested it on an actual back squat.',
    name: 'R. Chen',
    role: 'CrossFit athlete',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28" aria-label="Community feedback">
      <div className="container-wide">
        <SectionHeading eyebrow="From the rack" title="The Group Chat Says" align="center" className="mx-auto" />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-6 border border-line p-7"
            >
              <blockquote className="text-balance text-lg leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{q.name}</p>
                <p className="mt-1 text-xs text-muted">{q.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
