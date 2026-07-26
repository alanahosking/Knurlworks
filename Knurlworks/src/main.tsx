import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import '@/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
