import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitch } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a real email — the list only takes those.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="hazard-stripe" />
      <div className="container-wide grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl">
            RIOT<span className="text-accent">WEAR</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Gymwear for the ones who train loud and dress louder. Built in small batches, worn hard, never restocked twice.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" aria-label="RIOTWEAR on Instagram" className="text-fg hover:text-accent">
              <Instagram size={19} aria-hidden="true" />
            </a>
            <a href="#" aria-label="RIOTWEAR on YouTube" className="text-fg hover:text-accent">
              <Youtube size={19} aria-hidden="true" />
            </a>
            <a href="#" aria-label="RIOTWEAR on Twitch" className="text-fg hover:text-accent">
              <Twitch size={19} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Shop">
          <h2 className="eyebrow mb-4">Shop</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All products</Link></li>
            <li><Link to="/shop?category=tees" className="hover:text-accent">Tees</Link></li>
            <li><Link to="/shop?category=hoodies" className="hover:text-accent">Hoodies</Link></li>
            <li><Link to="/shop?category=leggings" className="hover:text-accent">Leggings</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="eyebrow mb-4">Company</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><a href="#" className="hover:text-accent">Shipping &amp; returns</a></li>
            <li><a href="#" className="hover:text-accent">Size guide</a></li>
            <li><a href="#" className="hover:text-accent">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">Get the drops first</h2>
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
                  placeholder="you@email.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'footer-email-error' : undefined}
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-fg px-4 font-mono text-xs font-semibold uppercase text-bg hover:bg-accent hover:text-[#0e0e0f]"
                >
                  Join
                </button>
              </div>
              {error && (
                <p id="footer-email-error" role="alert" className="text-xs text-accent-2">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="container-wide flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} RIOTWEAR. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-accent">Privacy</a>
          <a href="#" className="hover:text-accent">Terms</a>
        </div>
      </div>
    </footer>
  );
}
