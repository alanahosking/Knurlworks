# RIOTWEAR

Alternative gymwear for lifters who don't blend in. A production-ready, fully responsive marketing + shop site built with React, TypeScript, and Tailwind CSS.

**Live pages:** Home · About · Shop (with cart, filtering, and sorting)

---

## Design direction

RIOTWEAR leans into gym-and-streetwear "alt" culture rather than the soft-pastel look of mainstream activewear brands:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0E0E0F` (dark) / `#F2F0EA` (light) | Page background |
| `--color-accent` | `#C9FF3D` toxic lime | Primary CTAs, active states |
| `--color-accent-2` | `#FF4B2B` blood orange | Sale tags, alerts |
| Display type | Anton | Condensed, poster-style headlines |
| Body type | Inter | Long-form readability |
| Utility type | IBM Plex Mono | Prices, tags, labels — a clothing-tag / spec-sheet voice |

**Signature elements:**
- A repeating **hazard-stripe** divider (`.hazard-stripe`) marks deliberate section breaks — echoing warning tape from a loading dock or gym floor.
- Products are rendered as **mono-line tech-pack schematics** (`ProductArt.tsx`) tinted with each item's colorway, instead of stock photography — the same drafting language used on real cut sheets. Swap in real product photography later by replacing `<ProductArt />` with an `<img>` in `ProductCard.tsx` and `Hero.tsx`.
- A rotating **"No Restock" stamp** badge on the homepage hero reinforces the limited-drop model.

## Tech stack

- **React 18 + TypeScript** — component architecture, strict typing
- **Vite** — dev server & production bundler
- **Tailwind CSS** — utility-first styling, custom design tokens
- **React Router v6** — client-side routing (Home / About / Shop / 404)
- **Framer Motion** — subtle scroll/entrance animations, respects `prefers-reduced-motion`
- **React Helmet Async** — per-page SEO meta tags
- **Lucide React** — icon set

## Project structure

```
riotwear/
├── index.html                  # SEO meta, JSON-LD, theme flash-prevention script
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── main.tsx                # Providers + router bootstrap
│   ├── App.tsx                 # Route definitions
│   ├── index.css               # Design tokens, dark/light themes, base styles
│   ├── types/index.ts           # Shared TypeScript types
│   ├── lib/
│   │   ├── products.ts         # Mock product catalog
│   │   └── utils.ts            # cn(), formatPrice(), slugify()
│   ├── context/
│   │   ├── ThemeContext.tsx    # Dark/light mode, persisted + system-aware
│   │   └── CartContext.tsx     # Cart state, persisted to localStorage
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Layout, AnnouncementBar, SkipLink
│   │   ├── ui/                 # Button, Badge, SectionHeading, Skeleton,
│   │   │                       # ThemeToggle, CartDrawer, ErrorBoundary, SEO, ProductArt
│   │   ├── home/                # Hero, FeaturedCollection, BrandValues, Testimonials, CTABanner
│   │   ├── about/                # AboutHero, Timeline, Values
│   │   └── shop/                # ProductCard, FilterBar
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Shop.tsx             # Simulated async fetch, loading/error/empty states
│       └── NotFound.tsx
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Features checklist

- ✅ Fully responsive (mobile-first, tested down to 320px)
- ✅ Dark mode / light mode with system-preference detection + persistence, no flash-of-wrong-theme
- ✅ Semantic HTML (`header`, `nav`, `main`, `footer`, `article`, `figure`, landmark roles)
- ✅ WCAG-conscious: skip link, visible focus rings, `aria-live` regions, labelled controls, `prefers-reduced-motion` support, AA-checked light-mode accent contrast
- ✅ SEO: per-page `<title>`/meta via React Helmet, canonical URLs, Open Graph + Twitter cards, JSON-LD `ClothingStore` schema, `robots.txt`, auto-generated `sitemap.xml` on build
- ✅ Loading states: skeleton cards while the shop "fetches" its catalog
- ✅ Error handling: React error boundary (app-level crashes) + a dedicated fetch-failure/retry state on the Shop page + empty-state messaging when filters return nothing
- ✅ Reusable component library (Button, Badge, ProductCard, SectionHeading, etc.)
- ✅ Client-side cart (add/remove/update quantity, persisted, slide-out drawer)
- ✅ Subtle, purposeful motion (scroll reveals, hover states, one signature stamp animation) — nothing gratuitous

## Getting started

### Prerequisites
- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+ (or pnpm/yarn if you prefer — adjust commands accordingly)

### Install

```bash
cd riotwear
npm install
```

### Run in development

```bash
npm run dev
```

Visit **http://localhost:5173**. Vite's dev server includes hot module replacement — edits appear instantly.

### Type-check & lint

```bash
npm run lint       # ESLint (TypeScript + React Hooks + jsx-a11y rules)
```

### Production build

```bash
npm run build
```

This runs `tsc -b` (type-checking) followed by `vite build`, and also generates `sitemap.xml` from the configured routes. Output goes to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

## Deployment

The build output in `dist/` is a static site and can be hosted anywhere that serves static files. Because this is a single-page app with client-side routing, your host needs to rewrite all unknown paths to `index.html`.

### Vercel
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Vercel handles SPA rewrites automatically for Vite projects.

### Netlify
1. Push the repo, then **Add new site → Import an existing project**.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Add a `public/_redirects` file containing:
   ```
   /*  /index.html  200
   ```
   so client-side routes don't 404 on refresh.

### Static host / your own server (e.g. Nginx, S3+CloudFront)
1. Run `npm run build` locally or in CI.
2. Upload the contents of `dist/` to your host/bucket.
3. Configure a catch-all rewrite to `index.html` for any path that isn't a real file (SPA fallback). For Nginx:
   ```
   location / {
     try_files $uri /index.html;
   }
   ```

### Before going live
- Replace the placeholder domain `https://riotwear.example.com` in `index.html`, `vite.config.ts` (sitemap `hostname`), `public/robots.txt`, and `src/components/ui/SEO.tsx`.
- Add a real Open Graph image at `public/og-cover.jpg` (1200×630 recommended) — the meta tag referencing it is already in `index.html`.
- Swap the mock catalog in `src/lib/products.ts` for real product data (and a real backend/checkout — the cart is currently client-side only and does not process payments).
- Replace the illustrated `ProductArt` schematics with real product photography once available, or keep them as the brand's signature look.

## Notes on the mock catalog & checkout

This build ships with realistic sample product data (12 SKUs) and a fully working cart (add, remove, adjust quantity, persisted across reloads) so the shop experience can be reviewed end-to-end. There is **no real payment processing** — the "Checkout" button in the cart drawer is a placeholder for wiring up a provider such as Stripe Checkout or Shopify's Storefront API.

## License

This codebase is provided as-is for the commissioning client's use.
