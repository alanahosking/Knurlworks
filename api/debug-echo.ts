import type { VercelRequest, VercelResponse } from '@vercel/node';
import { products } from '../src/lib/products';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, node: process.version, productCount: products.length });
}
