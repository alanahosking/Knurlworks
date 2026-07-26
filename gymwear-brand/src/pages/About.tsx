import { SEO } from '@/components/ui/SEO';
import { AboutHero } from '@/components/about/AboutHero';
import { Timeline } from '@/components/about/Timeline';
import { Values } from '@/components/about/Values';
import { CTABanner } from '@/components/home/CTABanner';

export default function About() {
  return (
    <>
      <SEO
        title="About RIOTWEAR"
        description="RIOTWEAR started in a garage gym and grew into alternative gymwear for lifters who train loud. Read our story, our timeline, and what we won't compromise on."
        path="/about"
      />
      <AboutHero />
      <Timeline />
      <Values />
      <CTABanner />
    </>
  );
}
