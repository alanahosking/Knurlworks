import { SEO } from '@/components/ui/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How KnurlWorks collects, uses, stores, and protects your personal information."
        path="/privacy-policy"
      />

      <div className="container-wide py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted">KnurlWorks — Last updated: 16/08/2026</p>

          <div className="mt-10 flex flex-col gap-10 text-base leading-relaxed text-fg">
            <p>
              KnurlWorks respects your privacy. This policy explains what personal information we collect, why, how
              we store and use it, and how you can access, correct, or complain about it. We've written it with
              reference to the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).
            </p>

            <section>
              <h2 className="font-display text-2xl">The personal information we collect</h2>
              <p className="mt-4 text-muted">Depending on how you interact with us, we may collect:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">Contact details — name, email, phone number, shipping and billing address</li>
                <li className="list-disc">Order information — items purchased, order value, order history</li>
                <li className="list-disc">
                  Payment information — handled directly by Stripe, our payment processor. We do not store your full
                  card details on our servers.
                </li>
                <li className="list-disc">Account and marketing preferences — if you sign up to our mailing list via MailerLite</li>
                <li className="list-disc">
                  Website usage data — pages visited, device and browser type, IP address, collected via standard
                  analytics tools
                </li>
                <li className="list-disc">Communications — anything you send us via email, contact forms, or social media</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl">Why we collect it</h2>
              <p className="mt-4 text-muted">We collect and use your personal information to:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">process and deliver your orders</li>
                <li className="list-disc">manage payments and refunds</li>
                <li className="list-disc">respond to enquiries and provide customer support</li>
                <li className="list-disc">send marketing emails and drop announcements, where you've opted in</li>
                <li className="list-disc">improve our website, products, and customer experience</li>
                <li className="list-disc">meet our legal and tax obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl">How we disclose your information</h2>
              <p className="mt-4 text-muted">
                We don't sell your personal information. We share it only with the third parties who help us run
                KnurlWorks:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">
                  Stripe — to process payments securely (Stripe's own privacy policy applies to how it handles your
                  payment data)
                </li>
                <li className="list-disc">MailerLite — to send marketing emails, if you've subscribed</li>
                <li className="list-disc">Shipping and delivery providers — to get your order to you</li>
                <li className="list-disc">Government or regulatory bodies — where required by law</li>
              </ul>
              <p className="mt-4 text-muted">
                Some of these providers may store or process data outside Australia. Where that happens, we take
                reasonable steps to ensure your information is handled consistently with the APPs.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">How we store and protect your information</h2>
              <p className="mt-4 text-muted">
                We store personal information using reputable third-party platforms (including Stripe and MailerLite)
                that maintain their own security standards, and we take reasonable technical and organisational steps
                to protect information held on our own systems from misuse, loss, and unauthorised access. No online
                system is 100% secure, but we work to keep your data safe and will notify affected individuals and
                the OAIC if we experience an eligible data breach under the Notifiable Data Breaches scheme.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Cookies and tracking</h2>
              <p className="mt-4 text-muted">
                Our website may use cookies and similar technologies to remember your preferences, understand site
                traffic, and improve your shopping experience. You can control or disable cookies through your
                browser settings, though some site features may not work as well as a result.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Marketing communications</h2>
              <p className="mt-4 text-muted">
                If you subscribe to our mailing list, we'll send you drop announcements, promotions, and brand
                updates. You can unsubscribe at any time using the link at the bottom of any email, or by contacting
                us directly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Accessing and correcting your information</h2>
              <p className="mt-4 text-muted">
                You can ask us for a copy of the personal information we hold about you, or ask us to correct it if
                it's wrong or out of date. Contact us at{' '}
                <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                  admin@knurlworks.com.au
                </a>{' '}
                and we'll respond within a reasonable timeframe. In some cases, we may need to verify your identity
                first.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Making a complaint</h2>
              <p className="mt-4 text-muted">
                If you think we've mishandled your personal information, contact us first at{' '}
                <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                  admin@knurlworks.com.au
                </a>{' '}
                so we can try to resolve it. If you're not satisfied with our response, you can lodge a complaint
                with the{' '}
                <a
                  href="https://www.oaic.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Office of the Australian Information Commissioner (OAIC)
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Changes to this policy</h2>
              <p className="mt-4 text-muted">
                We may update this policy from time to time as our business or the law changes. The current version
                will always be available on our website, with the "last updated" date at the top.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Contact us</h2>
              <p className="mt-4 text-muted">
                Questions about this policy or your personal information? Email us at{' '}
                <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                  admin@knurlworks.com.au
                </a>
                .
              </p>
            </section>

            <p className="border-t border-line pt-6 text-sm text-muted">
              This policy is drafted with reference to the Privacy Act 1988 (Cth), the 13 Australian Privacy
              Principles, and OAIC guidance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
