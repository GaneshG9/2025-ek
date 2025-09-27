import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';
import { PropertyListings } from '@/components/landing/property-listings';
import { SolarVisualizer } from '@/components/landing/solar-visualizer';
import { DigitalMarketing } from '@/components/landing/digital-marketing';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="default" />
      <main className="flex-grow">
        <Hero />

        <FadeIn>
          <PropertyListings />
        </FadeIn>

        <FadeIn>
          <SolarVisualizer />
        </FadeIn>

        <FadeIn>
          <DigitalMarketing />
        </FadeIn>

      </main>
      <Footer />
    </div>
  );
}
