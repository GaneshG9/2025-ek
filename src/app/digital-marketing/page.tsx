import { Header } from '@/components/landing/header';
import { DigitalMarketing } from '@/components/landing/digital-marketing';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';
import { DigitalMarketingHero } from '@/components/landing/digital-marketing-hero';

export default function DigitalMarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="digital-marketing" />
      <main className="flex-grow pt-16">
        <FadeIn>
          <DigitalMarketingHero />
        </FadeIn>
        <FadeIn>
          <DigitalMarketing />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
