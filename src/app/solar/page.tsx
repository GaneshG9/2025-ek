import { Header } from '@/components/landing/header';
import { SolarVisualizer } from '@/components/landing/solar-visualizer';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';
import { SolarProcess } from '@/components/landing/solar-process';
import { WhySolar } from '@/components/landing/why-solar';

export default function SolarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="solar" />
      <main className="flex-grow pt-16">
        <FadeIn>
          <SolarVisualizer />
        </FadeIn>
        <FadeIn>
          <WhySolar />
        </FadeIn>
        <FadeIn>
          <SolarProcess />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
