import { SEO } from '@/components/ui/SEO';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { SHOP_OPEN } from '@/lib/config';

export default function Home() {
  return (
    <>
      <SEO
        title="Alternative Gymwear for the Underground Lifter"
        description="KnurlWorks is alternative gymwear for lifters who don't blend in. Heavyweight tees, technical training gear and streetwear built to survive PRs."
        path="/"
      />
      <Hero />
      {SHOP_OPEN && <FeaturedCollection />}
    </>
  );
}
