import { SEO } from '@/components/ui/SEO';
import { Manifesto } from '@/components/about/Manifesto';

export default function About() {
  return (
    <>
      <SEO
        title="About KnurlWorks"
        description="KnurlWorks is alternative gymwear for lifters who train loud. Read our story and what we won't compromise on."
        path="/about"
      />
      <Manifesto />
    </>
  );
}
