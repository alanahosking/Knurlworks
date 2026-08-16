import { SEO } from '@/components/ui/SEO';

export default function ReturnsPolicy() {
  return (
    <>
      <SEO
        title="Returns & Refunds Policy"
        description="Your rights under Australian Consumer Law, plus KnurlWorks' returns, refunds, and change-of-mind policy."
        path="/returns-policy"
      />

      <div className="container-wide py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-balance text-5xl leading-[0.95] sm:text-6xl">
            Returns &amp; Refunds Policy
          </h1>
          <p className="mt-4 text-sm text-muted">KnurlWorks — Last updated: 16/08/2026</p>

          <div className="mt-10 flex flex-col gap-10 text-base leading-relaxed text-fg">
            <p>
              We want you in gear that fits right and holds up. This policy explains your rights under Australian
              Consumer Law (ACL) and what we offer on top of that.
            </p>

            <section>
              <h2 className="font-display text-2xl">Your rights under Australian Consumer Law</h2>
              <p className="mt-4 text-muted">
                Our goods come with guarantees that can't be excluded under the ACL. You're entitled to a repair,
                replacement, or refund for a major failure, and compensation for any other reasonably foreseeable
                loss or damage. You're also entitled to have goods repaired or replaced if they fail to be of
                acceptable quality and the failure doesn't amount to a major failure.
              </p>
              <p className="mt-4 text-muted">A product has a major failure if it:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">has a problem that would have stopped you buying it if you'd known about it</li>
                <li className="list-disc">is significantly different from the description, sample, or demonstration model</li>
                <li className="list-disc">
                  is substantially unfit for its normal purpose and can't easily be fixed within a reasonable time
                </li>
                <li className="list-disc">is unsafe</li>
              </ul>
              <p className="mt-4 text-muted">
                If a product has a major failure, you choose the remedy: a full refund, a replacement, or
                compensation for the drop in value. For a minor failure, we'll choose to repair, replace, or refund
                it within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Faulty, damaged, or not-as-described items</h2>
              <p className="mt-4 text-muted">
                If your KnurlWorks piece arrives faulty, damaged in transit, or doesn't match what was listed on the
                site, contact us at{' '}
                <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                  admin@knurlworks.com.au
                </a>{' '}
                within 30 days of delivery with your order number and photos of the issue. We'll sort a free repair,
                replacement, or full refund, whichever you'd prefer for a major fault, and we'll cover the cost of
                return shipping in these cases.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Change of mind</h2>
              <p className="mt-4 text-muted">
                We get it, sizing in activewear is tricky. As a goodwill option (not a legal requirement), we accept
                change-of-mind returns if:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">you contact us within 30 days of delivery</li>
                <li className="list-disc">the item is unworn, unwashed, and in its original condition with tags attached</li>
                <li className="list-disc">you cover the cost of return postage</li>
              </ul>
              <p className="mt-4 text-muted">
                Change-of-mind returns are refunded to your original payment method or offered as store credit, your
                choice, once we've received and checked the item. Sale items marked as final are excluded from
                change-of-mind returns unless faulty.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">What we can't offer a remedy for</h2>
              <p className="mt-4 text-muted">
                Consistent with the ACL, we're not required to offer a refund, repair, or replacement if you:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-disc">simply changed your mind outside our change-of-mind window</li>
                <li className="list-disc">
                  misused the product or damaged it through wear and tear, incorrect washing, or not following the
                  care label
                </li>
                <li className="list-disc">knew about a fault before buying (e.g. a marked-down seconds item)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl">How to start a return</h2>
              <ol className="mt-4 flex flex-col gap-2 pl-5 text-muted marker:text-accent">
                <li className="list-decimal">
                  Email{' '}
                  <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                    admin@knurlworks.com.au
                  </a>{' '}
                  with your order number, the item(s), and the reason for return
                </li>
                <li className="list-decimal">We'll confirm eligibility and send return instructions</li>
                <li className="list-decimal">Post the item back in its original condition (unless faulty, see above)</li>
                <li className="list-decimal">
                  Once received and checked, we'll process your refund, replacement, or store credit within 5–10
                  business days
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-2xl">Refund method</h2>
              <p className="mt-4 text-muted">
                Refunds are issued to the original payment method through Stripe. Processing times depend on your
                bank or card provider, typically 3–10 business days after we process the refund on our end.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">Contact</h2>
              <p className="mt-4 text-muted">
                Questions about an order? Reach us at{' '}
                <a href="mailto:admin@knurlworks.com.au" className="text-accent hover:underline">
                  admin@knurlworks.com.au
                </a>
                . If you believe we haven't met our obligations under the ACL, you can also raise it with the{' '}
                <a
                  href="https://www.accc.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  ACCC
                </a>{' '}
                or your state or territory consumer protection agency.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
