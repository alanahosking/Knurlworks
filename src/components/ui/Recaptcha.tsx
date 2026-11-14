import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { loadRecaptcha, RECAPTCHA_SITE_KEY } from '@/lib/recaptcha';

export interface RecaptchaHandle {
  reset: () => void;
}

interface RecaptchaProps {
  /** Called with the token when solved, or null when it expires or errors. */
  onChange: (token: string | null) => void;
}

/** reCAPTCHA tokens are single use, so call `reset()` after every submit attempt. */
export const Recaptcha = forwardRef<RecaptchaHandle, RecaptchaProps>(function Recaptcha({ onChange }, ref) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null) window.grecaptcha?.reset(widgetIdRef.current);
      onChangeRef.current(null);
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    // A fresh child per render: grecaptcha refuses to render twice into the same element.
    const holder = document.createElement('div');
    container.appendChild(holder);

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled) return;
        // The compact widget (164px) fits narrow footer columns; the normal one needs 304px.
        const size = container.offsetWidth > 0 && container.offsetWidth < 304 ? 'compact' : 'normal';
        widgetIdRef.current = grecaptcha.render(holder, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: theme === 'light' ? 'light' : 'dark',
          size,
          callback: (token) => onChangeRef.current(token),
          'expired-callback': () => onChangeRef.current(null),
          'error-callback': () => onChangeRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      widgetIdRef.current = null;
      holder.remove();
      onChangeRef.current(null);
    };
  }, [theme]);

  return (
    <div>
      <div ref={containerRef} />
      {loadFailed && (
        <p className="text-xs text-accent-2" role="alert">
          Couldn't load the human check. Disable any blockers for this page and refresh.
        </p>
      )}
    </div>
  );
});
