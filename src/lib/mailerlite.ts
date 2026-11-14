const MAILERLITE_ACCOUNT = '2547598';
const MAILERLITE_FORM = '194507601986192746';

interface MailerLiteResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, unknown>;
}

/** Pulls the first human-readable message out of MailerLite's nested `errors` object. */
function firstErrorMessage(errors: unknown): string | undefined {
  if (typeof errors === 'string') return errors;
  if (Array.isArray(errors)) {
    for (const item of errors) {
      const found = firstErrorMessage(item);
      if (found) return found;
    }
  } else if (errors && typeof errors === 'object') {
    for (const value of Object.values(errors)) {
      const found = firstErrorMessage(value);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * MailerLite's subscribe endpoint sends Access-Control-Allow-Origin: *,
 * so unlike Mailchimp's classic embed it can be called with a normal
 * fetch() -- no JSONP script-tag workaround needed.
 *
 * The form has reCAPTCHA enabled, so the solved token goes along as
 * `g-recaptcha-response`. `ml-submit` and `anticsrf` are the same fields
 * MailerLite's own embed code sends.
 */
export async function subscribeToMailerLite(email: string, captchaToken: string): Promise<void> {
  const params = new URLSearchParams({
    'fields[email]': email,
    'ml-submit': '1',
    anticsrf: 'true',
    'g-recaptcha-response': captchaToken,
  });
  const response = await fetch(
    `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT}/forms/${MAILERLITE_FORM}/subscribe?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('MailerLite rejected the submission.');
  }

  const data = (await response.json()) as MailerLiteResponse;
  if (!data.success) {
    throw new Error(data.message || firstErrorMessage(data.errors) || 'MailerLite rejected the submission.');
  }
}
