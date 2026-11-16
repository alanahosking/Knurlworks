import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Recaptcha, type RecaptchaHandle } from '@/components/ui/Recaptcha';
import { loadRecaptcha } from '@/lib/recaptcha';
import { subscribeToMailerLite } from '@/lib/mailerlite';

const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Two-step signup: pressing Join checks the email, then shows the human check.
  // Ticking the box finishes the signup, so there is no second click.
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);

  const submit = async (token: string) => {
    setError('');
    setSubmitting(true);
    try {
      await subscribeToMailerLite(email, token);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.');
      // Tokens are single use, so a failed attempt needs a fresh tick.
      captchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter a real email — the list only takes those.');
      return;
    }
    if (!showCaptcha) {
      // Step 2: the human check appears now, and ticking it completes the signup.
      setError('');
      setShowCaptcha(true);
      return;
    }
    if (!captchaToken) {
      setError('Tick "I\'m not a robot" to finish joining.');
      return;
    }
    void submit(captchaToken);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (!token) return;
    if (!isValidEmail(email)) {
      setError('Enter a real email — the list only takes those.');
      captchaRef.current?.reset();
      return;
    }
    void submit(token);
  };

  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="hazard-stripe" />
      <div className="container-wide grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Gymwear for the ones who train loud and dress louder. Built in small batches, worn hard. Classics come back, new designs are limited.
          </p>
          <div className="mt-6">
            <a
              href="https://www.instagram.com/knurlworks?igsh=MWVsMWkwcDNkNzhkdg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KnurlWorks on Instagram"
              className="inline-flex text-accent transition-transform hover:scale-110 hover:text-fg"
            >
              <Instagram size={36} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Shop">
          <h2 className="eyebrow mb-4">Shop</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Tees & Pump Covers</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Accessories</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="eyebrow mb-4">Company</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><a href="#" className="hover:text-accent">Size guide</a></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">
            Subscribe to our mailing list to stay up to date with all the latest news and restocks
          </h2>
          {submitted ? (
            <p className="text-sm text-accent" role="status">You're on the list. Watch your inbox.</p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex border border-line focus-within:border-accent">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Preload Google's script on first interaction (nothing is shown yet), so the
                  // human check appears instantly after Join.
                  onFocus={() => void loadRecaptcha().catch(() => undefined)}
                  placeholder="you@email.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'footer-email-error' : undefined}
                  disabled={submitting}
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="shrink-0 bg-fg px-4 font-body text-xs font-semibold uppercase text-bg hover:bg-accent hover:text-[#0e0e0f] disabled:pointer-events-none disabled:opacity-50"
                >
                  {submitting ? '...' : 'Join'}
                </button>
              </div>
              {showCaptcha && (
                <>
                  <p className="text-xs text-fg" role="status">
                    One more step: tick the box to finish joining.
                  </p>
                  <Recaptcha ref={captchaRef} onChange={handleCaptchaChange} />
                </>
              )}
              {error && (
                <p id="footer-email-error" role="alert" className="text-xs text-accent-2">
                  {error}
                </p>
              )}
              <p className="text-xs text-muted">By joining you agree to receive KnurlWorks emails. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
      <div className="container-wide flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} KnurlWorks™. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-accent">Privacy</Link>
          <Link to="/returns-policy" className="hover:text-accent">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
