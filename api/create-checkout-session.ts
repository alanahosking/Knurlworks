import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { checkoutProducts } from './_checkout-products';

const FREE_SHIPPING_THRESHOLD = 99;
const FLAT_SHIPPING_FEE = 11.99;

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res.status(500).json({ error: 'Checkout is not configured (missing STRIPE_SECRET_KEY)' });
    }

    const rawLines = (req.body as { lines?: unknown } | undefined)?.lines;
    if (!Array.isArray(rawLines) || rawLines.length === 0 || !rawLines.every(isCheckoutLine)) {
      return res.status(400).json({ error: 'Invalid cart' });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let subtotal = 0;

    for (const line of rawLines) {
      const product = checkoutProducts.find((p) => p.id === line.productId);
      if (!product) {
        return res.status(400).json({ error: `Unknown product: ${line.productId}` });
      }
      if (!product.sizes.includes(line.size)) {
        return res.status(400).json({ error: `Invalid size "${line.size}" for ${product.name}` });
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
      return res.status(500).json({ error: 'Could not create checkout session' });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session crashed', err);
    // TEMPORARY: surfacing the real error message while we're still testing
    // (no real traffic on this endpoint yet). Revert to a generic message
    // before going live.
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: `Server error: ${message}` });
  }
}
