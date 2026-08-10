import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const FREE_SHIPPING_THRESHOLD = 99;
const FLAT_SHIPPING_FEE = 11.99;

/**
 * Minimal, server-trusted subset of src/lib/products.ts (id, name, price,
 * valid sizes) used only to validate/price incoming cart lines.
 *
 * Inlined rather than imported — even a same-directory local import
 * combined with the stripe import crashes the deployed function
 * ("exports is not defined in ES module scope"), confirmed by isolating
 * each import individually and together in api/debug-echo.ts. A single
 * self-contained file with zero first-party imports is the only
 * combination that reliably works. Keep in sync with src/lib/products.ts
 * whenever prices or sizes change there.
 *
 * Note: src/lib/products.ts's sizes() helper gives every product a variant
 * entry for all 6 standard sizes (XS-XXL) regardless of stock — inStock
 * only affects display, not which sizes are valid to check out with —
 * except p11 and p12, which pass a shorter custom size list.
 */
interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  sizes: string[];
}

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const checkoutProducts: CheckoutProduct[] = [
  { id: 'p01', name: 'Riot Tape Heavyweight Tee', price: 48, sizes: STANDARD_SIZES },
  { id: 'p02', name: 'Static Mesh Training Tee', price: 42, sizes: STANDARD_SIZES },
  { id: 'p03', name: 'Corrosion Oversized Hoodie', price: 92, sizes: STANDARD_SIZES },
  { id: 'p04', name: 'Voltage Cropped Hoodie', price: 84, sizes: STANDARD_SIZES },
  { id: 'p05', name: 'Deadlift Reinforced Shorts', price: 56, sizes: STANDARD_SIZES },
  { id: 'p06', name: 'Static Mesh Layer Shorts', price: 52, sizes: STANDARD_SIZES },
  { id: 'p07', name: 'Fracture Seamless Leggings', price: 68, sizes: STANDARD_SIZES },
  { id: 'p08', name: 'Riot Tape Leggings', price: 64, sizes: STANDARD_SIZES },
  { id: 'p09', name: 'Undercut Stringer Tank', price: 36, sizes: STANDARD_SIZES },
  { id: 'p10', name: 'Salvage Quarter-Zip', price: 78, sizes: STANDARD_SIZES },
  { id: 'p11', name: 'Chalk Line Lifting Belt', price: 74, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'p12', name: 'Static Terry Gym Towel', price: 22, sizes: ['One Size'] },
];

interface CheckoutLine {
  productId: string;
  size: string;
  quantity: number;
}

function isCheckoutLine(value: unknown): value is CheckoutLine {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.productId === 'string' &&
    typeof v.size === 'string' &&
    typeof v.quantity === 'number' &&
    Number.isInteger(v.quantity) &&
    v.quantity >= 1 &&
    v.quantity <= 20
  );
}

/**
 * A plain HTML <form> POST (not a fetch() + client-side redirect) so the
 * browser performs a native navigation the whole way through. The previous
 * fetch-then-`window.location.href` version got silently blocked by some
 * ad-blocker/privacy extensions, which specifically flag delayed,
 * JS-triggered redirects to third-party domains — a real HTTP redirect
 * from a form submission doesn't trigger that heuristic.
 *
 * Because the browser navigates away regardless of outcome, errors can't
 * be returned as JSON for inline display — instead we redirect back to
 * `returnTo` with a `checkout_error` query param, which CartDrawer reads
 * on mount.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body as { lines?: unknown; returnTo?: unknown } | undefined;
  const returnTo = typeof body?.returnTo === 'string' && body.returnTo.startsWith('/') ? body.returnTo : '/';

  const fail = (message: string) => {
    res.redirect(303, `${returnTo}?checkout_error=${encodeURIComponent(message)}`);
  };

  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return fail('Method not allowed');
    }

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      return fail('Checkout is not configured (missing STRIPE_SECRET_KEY)');
    }

    let rawLines: unknown;
    try {
      rawLines = typeof body?.lines === 'string' ? JSON.parse(body.lines) : undefined;
    } catch {
      return fail('Invalid cart');
    }
    if (!Array.isArray(rawLines) || rawLines.length === 0 || !rawLines.every(isCheckoutLine)) {
      return fail('Invalid cart');
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let subtotal = 0;

    for (const line of rawLines) {
      const product = checkoutProducts.find((p) => p.id === line.productId);
      if (!product) {
        return fail(`Unknown product: ${line.productId}`);
      }
      if (!product.sizes.includes(line.size)) {
        return fail(`Invalid size "${line.size}" for ${product.name}`);
      }

      subtotal += product.price * line.quantity;
      lineItems.push({
        quantity: line.quantity,
        price_data: {
          currency: 'aud',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: `${product.name} — ${line.size}`,
          },
        },
      });
    }

    const shippingAmount = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : Math.round(FLAT_SHIPPING_FEE * 100);
    const origin = (req.headers.origin as string | undefined) ?? `https://${req.headers.host}`;

    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['AU'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: 'aud' },
            display_name: shippingAmount === 0 ? 'Free shipping' : 'Standard shipping',
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    if (!session.url) {
      return fail('Could not create checkout session');
    }

    return res.redirect(303, session.url);
  } catch (err) {
    console.error('create-checkout-session crashed', err);
    const message = err instanceof Error ? err.message : String(err);
    return fail(`Server error: ${message}`);
  }
}
