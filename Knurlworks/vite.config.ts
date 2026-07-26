import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages project sites are served from /<repo-name>/, not the domain
  // root. GH_PAGES=true is set by the deploy workflow; local `vite dev` and
  // other hosts (Vercel/Netlify, which serve from the root) are unaffected.
  base: process.env.GH_PAGES ? '/Knurlworks/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    sitemap({
      hostname: 'https://riotwear.example.com',
      dynamicRoutes: ['/', '/about', '/shop'],
    }),
  ],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
