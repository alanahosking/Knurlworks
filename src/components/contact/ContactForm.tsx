import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdaqvwzv';

const foundUsOptions = ['Instagram', 'Google search', 'Friend or referral', 'TikTok', 'Other'];

interface FormState {
  name: string;
  contactNumber: string;
  email: string;
  details: string;
  foundUs: string;
}

const initialState: FormState = {
  name: '',
  contactNumber: '',
  email: '',
  details: '',
  foundUs: '',
};

const fieldClass =
  'w-full border border-line bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent';

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contactNumber.trim() || !form.details.trim()) {
      setError('Name, contact number, and enquiry details are required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Enter a real email address.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          contactNumber: form.contactNumber,
          email: form.email,
          message: form.details,
          foundUs: form.foundUs || 'Not specified',
          _subject: `New enquiry from ${form.name} via knurlworks.com.au`,
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree rejected the submission');
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong sending that — try again, or email us directly at admin@knurlworks.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-line bg-bg-alt p-8 text-center"
        role="status"
      >
        <p className="font-display text-2xl">Enquiry Sent.</p>
        <p className="mt-2 text-sm text-muted">We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="eyebrow">* = required field</p>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-widest2">
          Name*
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={update('name')}
          className={fieldClass}
          aria-required="true"
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-number" className="font-mono text-xs uppercase tracking-widest2">
          Contact number*
        </label>
        <input
          id="contact-number"
          type="tel"
          value={form.contactNumber}
          onChange={update('contactNumber')}
          className={fieldClass}
          aria-required="true"
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-widest2">
          Email address*
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={update('email')}
          className={fieldClass}
          aria-required="true"
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-details" className="font-mono text-xs uppercase tracking-widest2">
          Enquiry details*
        </label>
        <textarea
          id="contact-details"
          rows={5}
          value={form.details}
          onChange={update('details')}
          className={fieldClass}
          aria-required="true"
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-found-us" className="font-mono text-xs uppercase tracking-widest2">
          Found us by
        </label>
        <select
          id="contact-found-us"
          value={form.foundUs}
          onChange={update('foundUs')}
          className={fieldClass}
          disabled={submitting}
        >
          <option value="">Please choose</option>
          {foundUsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="text-xs text-accent-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-fit items-center justify-center bg-accent px-7 py-4 font-mono text-xs font-medium uppercase tracking-widest2 text-[#0e0e0f] transition-all duration-200 hover:bg-fg disabled:pointer-events-none disabled:opacity-50"
      >
        {submitting ? 'Sending…' : 'Submit your enquiry'}
      </button>
    </form>
  );
}
