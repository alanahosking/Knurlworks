const MAILERLITE_ACCOUNT = '2547598';
const MAILERLITE_FORM = '194507601986192746';

interface MailerLiteResponse {
  success: boolean;
  message?: string;
}

/**
 * MailerLite's subscribe endpoint sends Access-Control-Allow-Origin: *,
 * so unlike Mailchimp's classic embed it can be called with a normal
 * fetch() -- no JSONP script-tag workaround needed.
 */
export async function subscribeToMailerLite(email: string): Promise<void> {
  const params = new URLSearchParams({ 'fields[email]': email });
  const response = await fetch(
    `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT}/forms/${MAILERLITE_FORM}/subscribe?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('MailerLite rejected the submission.');
  }

  const data = (await response.json()) as MailerLiteResponse;
  if (!data.success) {
    throw new Error(data.message || 'MailerLite rejected the submission.');
  }
}
