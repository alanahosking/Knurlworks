import { motion } from 'framer-motion';

const beliefs = [
  {
    heading: 'This is for the woman who trains with intention.',
    body: 'The one who shows up before the sun does. Who chalks her hands, sets her feet, and pulls something heavy off the ground because she said she would. Who doesn’t need an audience, but wouldn’t mind catching her reflection mid-set and thinking, damn, I look like I belong here. Because she does.',
  },
  {
    heading: 'We believe strength isn’t loud. It’s certain.',
    body: 'You don’t have to grit your teeth and grind through every day to be strong. Some days it’s quiet. Some days it’s just showing up when you didn’t feel like it. Some days it’s a max lift, and some days it’s just getting through the warm up. Strength isn’t a mood. It’s a standard you hold yourself to, whether anyone’s watching or not.',
  },
  {
    heading: 'We believe your clothes should keep up with you.',
    body: 'Every seam, every cut, every fabric choice starts with the same question: does this move the way she moves? Does it hold up under the bar, under the pace, under the pressure? And does it still fit like it was made for her, not just her workout?',
    punch: 'Function first. Fit that flatters, always. No apologies for wanting both.',
  },
  {
    heading: 'We believe confidence is not the same as arrogance.',
    body: 'You can be proud of what your body does and how it looks doing it. You can walk into a room like you own it and still be kind to the person next to you. Determined doesn’t mean cold. Powerful doesn’t mean unkind. We’re building for women who are all of it at once, strong and soft, focused and fun, serious about the work and unserious about everything else.',
  },
  {
    heading: 'We believe in bad bitch energy, unapologetically.',
    body: 'Not as a costume. As a baseline. The kind of energy that doesn’t need to explain itself. That knows its own worth without needing anyone to confirm it. That trains hard because it wants to, not because it has to prove anything to anybody.',
  },
];

export function Manifesto() {
  return (
    <section className="container-wide py-20 md:py-28" aria-label="Our manifesto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-balance font-display text-4xl leading-[0.95] sm:text-5xl"
      >
        We started KnurlWorks because we were tired of choosing.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-muted"
      >
        Tired of picking between clothes that performed and clothes that looked good. Tired of gym wear that
        either hid our bodies or forgot what we were actually there to do: lift, push, sweat, break records,
        break a personal best, break the assumption that strong and beautiful are two different things.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-4 max-w-2xl font-display text-2xl leading-tight text-accent"
      >
        They&rsquo;re not. They never were.
      </motion.p>

      <ul className="mt-16 flex flex-col">
        {beliefs.map((belief, i) => (
          <motion.li
            key={belief.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-t border-line py-10 last:border-b"
          >
            <h3 className="max-w-2xl text-balance font-display text-2xl leading-tight sm:text-3xl">
              {belief.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{belief.body}</p>
            {belief.punch && (
              <p className="mt-4 max-w-2xl font-display text-xl leading-tight text-accent">{belief.punch}</p>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
