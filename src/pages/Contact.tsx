import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/ui/SEO';
import { ContactForm } from '@/components/contact/ContactForm';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with KnurlWorks — email admin@knurlworks.com.au or send us an enquiry directly."
        path="/contact"
      />

      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">Contact Us</h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
              Questions about an order, sizing, or a drop you missed? Send us an enquiry and we'll get back to you,
              or email us directly.
            </p>

            <motion.a
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              href="mailto:admin@knurlworks.com.au"
              className="mt-8 inline-flex items-center gap-3 border border-line px-5 py-3 font-mono text-sm text-fg hover:border-accent hover:text-accent"
            >
              <Mail size={18} aria-hidden="true" />
              admin@knurlworks.com.au
            </motion.a>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
