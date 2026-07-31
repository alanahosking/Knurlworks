const MAILCHIMP_HOST = 'https://knurlworks.us17.list-manage.com';
const MAILCHIMP_U = 'dc4fe24d455d9825b957de7e9';
const MAILCHIMP_ID = 'a67bbea78f';
const MAILCHIMP_FORM_ID = '00eec3e1f0';

interface MailchimpResponse {
  result: 'success' | 'error';
  msg: string;
}

/**
 * Mailchimp's /subscribe endpoint has no CORS headers, so a normal fetch()
 * POST from the browser is blocked. JSONP (a <script> tag hitting the
 * post-json variant) is the standard workaround -- it's what Mailchimp's
 * own generated embed code uses under the hood.
 */
export function subscribeToMailchimp(email: string): Promise<MailchimpResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `mcJSONP_${Date.now()}`;
    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
    };

    (window as unknown as Record<string, (data: MailchimpResponse) => void>)[callbackName] = (data) => {
      cleanup();
      if (data.result === 'success') resolve(data);
      else reject(new Error(data.msg || 'Mailchimp rejected the submission.'));
    };

    const params = new URLSearchParams({
      u: MAILCHIMP_U,
      id: MAILCHIMP_ID,
      f_id: MAILCHIMP_FORM_ID,
      EMAIL: email,
      c: callbackName,
      [`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`]: '',
    });

    const script = document.createElement('script');
    script.src = `${MAILCHIMP_HOST}/subscribe/post-json?${params.toString()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('Could not reach Mailchimp.'));
    };
    document.body.appendChild(script);
  });
}
