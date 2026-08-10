import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { checkoutProducts } from './_checkout-products';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, node: process.version, hasStripe: typeof Stripe, productCount: checkoutProducts.length });
}
