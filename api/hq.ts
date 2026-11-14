import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Private owner launchpad served at /hq (rewritten here in vercel.json).
 *
 * Protected with HTTP Basic Auth. The password lives only in the Vercel
 * environment variable HQ_PASSWORD (optionally HQ_USERNAME); if it is not
 * set the page refuses to load (fails closed). The page holds links only,
 * never business data or secrets.
 *
 * Deliberately self-contained with no runtime imports: see the note in
 * create-checkout-session.ts about first-party imports crashing functions.
 */

const HQ_ARTIFACT_URL = 'https://claude.ai/artifact/LcRxuA568pC8e56Wg4dvmi';

interface LinkItem {
  label: string;
  href: string;
  hint: string;
}

interface LinkGroup {
  title: string;
  links: LinkItem[];
}

const GROUPS: LinkGroup[] = [
  {
    title: 'Store & payments',
    links: [
      { label: 'Live site', href: 'https://knurlworks.com.au', hint: 'knurlworks.com.au' },
      { label: 'Stripe dashboard', href: 'https://dashboard.stripe.com', hint: 'Orders, payments, payouts' },
    ],
  },
  {
    title: 'Website',
    links: [
      { label: 'Vercel project', href: 'https://vercel.com/alanahoskings-projects/knurlworks', hint: 'Deploys, logs, environment variables' },
      { label: 'GitHub repo', href: 'https://github.com/alanahosking/Knurlworks', hint: 'Website code' },
      { label: 'Namecheap', href: 'https://ap.www.namecheap.com/domains/list/', hint: 'Domain and DNS' },
      { label: 'Formspree', href: 'https://formspree.io/forms', hint: 'Contact form messages' },
    ],
  },
  {
    title: 'Email & marketing',
    links: [
      { label: 'Gmail', href: 'https://mail.google.com/mail/?authuser=knurlworks@gmail.com#inbox', hint: 'knurlworks@gmail.com (admin@ forwards here)' },
      { label: 'Private Email', href: 'https://privateemail.com', hint: 'admin@knurlworks.com.au (backup copy)' },
      { label: 'MailerLite', href: 'https://dashboard.mailerlite.com', hint: 'Subscribers and campaigns' },
    ],
  },
  {
    title: 'Suppliers',
    links: [
      { label: 'Alibaba messages', href: 'https://message.alibaba.com', hint: 'Supplier chats and quotes' },
      { label: 'AS Colour', href: 'https://www.ascolour.com.au', hint: 'Local blanks' },
    ],
  },
  {
    title: 'Business admin',
    links: [
      { label: 'ATO online services', href: 'https://onlineservices.ato.gov.au/business/', hint: 'Tax and GST' },
      { label: 'ABN Lookup', href: 'https://abr.business.gov.au', hint: 'Check ABN details' },
      { label: 'ASIC Connect', href: 'https://connectonline.asic.gov.au', hint: 'Business name renewal' },
      { label: 'IP Australia', href: 'https://www.ipaustralia.gov.au/trade-marks', hint: 'Trademark application' },
    ],
  },
];

function safeEqual(a: string, b: string): boolean {
  // Constant-time comparison so response timing doesn't leak the password.
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function isAuthorised(header: string | undefined, username: string | undefined, password: string): boolean {
  if (!header || !header.startsWith('Basic ')) return false;
  let decoded = '';
  try {
    decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  } catch {
    return false;
  }
  const sep = decoded.indexOf(':');
  if (sep < 0) return false;
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);
  const userOk = username ? safeEqual(user, username) : true;
  return safeEqual(pass, password) && userOk;
}

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

function checkoutStatus(): { label: string; tone: 'good' | 'warn' | 'bad' } {
  // Reports only the key's mode from its prefix. The key itself is never read out.
  const key = process.env.STRIPE_SECRET_KEY || '';
  if (key.startsWith('sk_live_')) return { label: 'Live payments', tone: 'good' };
  if (key.startsWith('sk_test_')) return { label: 'Test mode (no real money)', tone: 'warn' };
  return { label: 'Not set up', tone: 'bad' };
}

function renderPage(): string {
  const stripe = checkoutStatus();
  const env = process.env.VERCEL_ENV === 'production' ? 'Production' : process.env.VERCEL_ENV === 'preview' ? 'Preview' : 'Local';
  const groups = GROUPS.map(
    (g) => `<section>
      <h2>${esc(g.title)}</h2>
      <div class="grid">${g.links
        .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer"><b>${esc(l.label)}</b><span>${esc(l.hint)}</span></a>`)
        .join('')}</div>
    </section>`,
  ).join('');

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>KnurlWorks HQ</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
  :root { --bg: #0E0E0F; --surface: #17171A; --ink: #F2F0EA; --muted: #A09B91; --line: #2C2C31; --accent: #B89687; --good: #7DD884; --warn: #F0B54A; --bad: #FF6A4D; color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 15px/1.5 Inter, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .wrap { max-width: 980px; margin: 0 auto; padding: max(24px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) 48px max(16px, env(safe-area-inset-left)); }
  .knurl { height: 10px; background: repeating-linear-gradient(45deg, rgba(242,240,234,.12) 0 1px, transparent 1px 7px), repeating-linear-gradient(-45deg, rgba(242,240,234,.12) 0 1px, transparent 1px 7px); }
  header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
  h1 { font: 700 34px/1 Jost, Futura, "Century Gothic", sans-serif; letter-spacing: .12em; text-transform: uppercase; margin: 0; }
  h1 span { color: var(--accent); }
  h2 { font: 600 12px "IBM Plex Mono", ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
  .status { display: flex; gap: 8px; flex-wrap: wrap; font: 12px "IBM Plex Mono", ui-monospace, monospace; }
  .pill { border: 1px solid var(--line); border-radius: 4px; padding: 3px 8px; color: var(--muted); }
  .pill.good { border-color: var(--good); color: var(--good); }
  .pill.warn { border-color: var(--warn); color: var(--warn); }
  .pill.bad { border-color: var(--bad); color: var(--bad); }
  .hq { display: grid; gap: 6px; padding: 22px; border: 1px solid var(--accent); border-radius: 8px; background: var(--surface); color: var(--ink); text-decoration: none; margin-bottom: 28px; }
  .hq b { font: 700 22px Jost, Futura, sans-serif; letter-spacing: .06em; text-transform: uppercase; }
  .hq span { color: var(--muted); }
  .hq:hover, .grid a:hover { border-color: var(--ink); }
  section { margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px; }
  .grid a { display: grid; align-content: start; gap: 2px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 6px; color: var(--ink); text-decoration: none; min-width: 0; }
  .grid a span { font-size: 13px; color: var(--muted); overflow-wrap: anywhere; }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  footer { color: var(--muted); font-size: 12px; border-top: 1px solid var(--line); padding-top: 14px; }
</style>
</head>
<body>
<div class="knurl" aria-hidden="true"></div>
<div class="wrap">
  <header>
    <h1>KnurlWorks <span>HQ</span></h1>
    <div class="status">
      <span class="pill">${esc(env)}</span>
      <span class="pill ${stripe.tone}">Checkout: ${esc(stripe.label)}</span>
    </div>
  </header>
  <a class="hq" href="${HQ_ARTIFACT_URL}" target="_blank" rel="noopener noreferrer">
    <b>Open workstation</b>
    <span>Tasks, suppliers and pricing, files, business details and decisions</span>
  </a>
  ${groups}
  <footer>Private page. To lock it again, close the browser or clear saved passwords for this site.</footer>
</div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  );

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method not allowed');
  }

  const password = process.env.HQ_PASSWORD;
  if (!password) {
    return res.status(503).send('HQ is not set up yet. Add HQ_PASSWORD in Vercel environment variables.');
  }

  const header = typeof req.headers.authorization === 'string' ? req.headers.authorization : undefined;
  if (!isAuthorised(header, process.env.HQ_USERNAME, password)) {
    // Small delay slows down password guessing.
    await new Promise((r) => setTimeout(r, 600));
    res.setHeader('WWW-Authenticate', 'Basic realm="KnurlWorks HQ", charset="UTF-8"');
    return res.status(401).send('Password required.');
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(renderPage());
}
