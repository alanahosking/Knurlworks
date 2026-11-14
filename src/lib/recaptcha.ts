/**
 * Google reCAPTCHA v2 ("I'm not a robot") for the newsletter form.
 *
 * The site key is MailerLite's own public key for forms hosted on their
 * platform (it is printed in the form's HTML embed code and is not secret).
 * MailerLite verifies the token server-side when we submit the signup.
 *
 * The Google script is loaded lazily, only once someone interacts with the
 * signup form, so it does not run on every page view.
 */
export const RECAPTCHA_SITE_KEY = '6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD';

export interface RecaptchaRenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

export interface Grecaptcha {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loader: Promise<Grecaptcha> | null = null;

export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loader) return loader;

  loader = new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) {
        loader = null;
        reject(new Error('reCAPTCHA did not initialise.'));
        return;
      }
      grecaptcha.ready(() => resolve(grecaptcha));
    };
    script.onerror = () => {
      loader = null;
      reject(new Error('Could not load reCAPTCHA.'));
    };
    document.head.appendChild(script);
  });

  return loader;
}
