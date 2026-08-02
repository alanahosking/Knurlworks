import { motion } from 'framer-motion';

const paragraphs = [
  'KnurlWorks started with a simple frustration: I didn’t want to leave my personality at the gym door.',
  'I was tired of choosing between clothes that performed and clothes that actually looked like me. I wanted something with edge, with a little attitude, that still moved the way I needed it to move when the weight got heavy. Not just another gym girl in another basic set. Someone who trained hard and still looked like herself doing it.',
  'Affordability matters just as much to me as design. Quality gymwear shouldn’t be a luxury, and it definitely shouldn’t be the reason someone skips the gym. Ugly, uncomfortable, or overpriced clothing is one more barrier between a person and the workout that could change their day, or their life. I didn’t want to add to that.',
  'Because the truth is, feeling confident is sometimes the hardest part of showing up. Not the lifting itself, not the reps, but walking in and feeling like you belong there. That’s what I wanted to create. Gymwear that meets you wherever you’re starting from and helps you feel a little stronger and a little more yourself, every time you put it on.',
  'Whether you’re chasing a new PR or just trying to move today, KnurlWorks is here to help you feel as strong as you already are, inside and out.',
];

export function Manifesto() {
  return (
    <section className="container-wide py-20 md:py-28" aria-label="Our story">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-balance font-display text-4xl leading-[0.95] sm:text-5xl"
      >
        Our Story
      </motion.h2>

      <div className="mt-8 flex max-w-2xl flex-col gap-6">
        {paragraphs.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
            className="text-base leading-relaxed text-muted"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
