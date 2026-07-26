// GitHub Pages has no server-side rewrites. When someone hits a deep link
// like /gymwear-brand/shop directly (or refreshes on it), GitHub looks for
// a real file at that path, doesn't find one, and serves 404.html instead.
// By making 404.html an exact copy of index.html, the SPA still boots and
// React Router reads the real URL from the browser and renders the right
// page. This is a no-op on hosts with real rewrites (Vercel/Netlify).
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const source = resolve(dist, 'index.html');
const target = resolve(dist, '404.html');

if (!existsSync(source)) {
  console.error('[postbuild] dist/index.html not found — did the build step run first?');
  process.exit(1);
}

copyFileSync(source, target);
console.log('[postbuild] Copied index.html -> 404.html for GitHub Pages SPA fallback.');
