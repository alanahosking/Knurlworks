import { SEO } from '@/components/ui/SEO';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { BrandValues } from '@/components/home/BrandValues';
import { Testimonials } from '@/components/home/Testimonials';
import { CTABanner } from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <SEO
        title="Alternative Gymwear for the Underground Lifter"
        description="RIOTWEAR is alternative gymwear for lifters who don't blend in. Heavyweight tees, technical training gear and streetwear built to survive PRs."
        path="/"
      />
      <Hero />
      <FeaturedCollection />
      <BrandValues />
      <Testimonials />
      <CTABanner />
    </>
  );
}
