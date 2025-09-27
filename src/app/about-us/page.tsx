import { Header } from '@/components/landing/header';
import { AboutUs } from '@/components/landing/about-us';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="default" />
      <main className="flex-grow pt-16">
        <FadeIn>
          <AboutUs />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
