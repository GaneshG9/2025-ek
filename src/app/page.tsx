'use client';

import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';
import { PropertyListings } from '@/components/landing/property-listings';
import { SolarVisualizer } from '@/components/landing/solar-visualizer';
import { DigitalMarketing } from '@/components/landing/digital-marketing';
import { propertyService } from '@/lib/local-database';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured properties from database
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const allProperties = await propertyService.getPublishedProperties();
        // Show only first 6 properties as featured
        setProperties(allProperties.slice(0, 6));
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="default" />
      <main className="flex-grow">
        <Hero />

        <FadeIn>
          {loading ? (
            <div className="py-16 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading properties...</p>
            </div>
          ) : (
            <PropertyListings properties={properties} />
          )}
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
