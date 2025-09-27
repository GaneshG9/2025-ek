'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { SparklesCore } from '@/components/ui/sparkles';
import { Youtube, Facebook, Instagram } from 'lucide-react';

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-full">
            <div>
              <h1 className="text-5xl font-headline font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white py-2">
                Ekavarta
              </h1>
              <p className="mt-4 max-w-3xl text-2xl text-foreground/80 md:text-3xl">
                One Life One Vision One Future
              </p>
              <p className="mt-6 max-w-2xl text-lg text-foreground/70 md:text-xl">
                We deal in residential & commercial properties, deliver complete solar solutions for homes and businesses, and provide digital marketing services to help you grow and succeed.
              </p>
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="#contact">Explore Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-foreground border-border/50 hover:bg-accent hover:text-accent-foreground">
                  <Link href="/properties">Learn More</Link>
                </Button>
              </div>
              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                <Button asChild variant="ghost" size="icon" className="text-foreground/70 hover:text-primary hover:bg-transparent">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <Youtube className="h-6 w-6" />
                    </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-foreground/70 hover:text-primary hover:bg-transparent">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="h-6 w-6" />
                    </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-foreground/70 hover:text-primary hover:bg-transparent">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="h-6 w-6" />
                    </a>
                </Button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
