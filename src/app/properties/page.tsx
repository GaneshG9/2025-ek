'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/landing/header';
import { PropertyListings } from '@/components/landing/property-listings';
import { Footer } from '@/components/landing/footer';
import { FadeIn } from '@/components/motion/fade-in';
import { propertyService } from '@/lib/local-database';

interface Property {
  id: number;
  title: string;
  price: string;
  sqft: number;
  imageIds: string[];
  status: string;
  description: string;
  amenities: string[];
  highlights?: string[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  category: 'Residential' | 'Commercial';
  propertyType: 'Plot' | 'Flat' | 'Rental' | 'Apartment' | 'Villa' | 'Home';
  propertyCode: string;
  youtubeUrl?: string;
  instagramUrl?: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
    
    // Auto-refresh properties every 30 seconds to get latest updates from admin
    const interval = setInterval(() => {
      loadProperties();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle highlighting property from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get('highlight');
    
    if (highlightId && properties.length > 0) {
      // Scroll to the property card and highlight it
      setTimeout(() => {
        const propertyElement = document.getElementById(`property-${highlightId}`);
        if (propertyElement) {
          propertyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          propertyElement.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            propertyElement.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
          }, 3000);
        }
      }, 500);
    }
  }, [properties]);

  const loadProperties = async () => {
    try {
      const dbProperties = await propertyService.getAll();
      // Filter to show only published and visible properties on public website
      const publicProperties = dbProperties.filter(property => 
        (property.isPublished ?? true) && (property.isVisible ?? true)
      );
      setProperties(publicProperties);
      console.log(`🔄 Properties refreshed: ${publicProperties.length}/${dbProperties.length} properties loaded (published & visible only)`);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header page="default" />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading properties...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="default" />
      <main className="flex-grow pt-16">
        <FadeIn>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Properties ({properties.length})</h1>
              <button
                onClick={loadProperties}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Refresh properties"
              >
                🔄 Refresh
              </button>
            </div>
            <PropertyListings properties={properties} />
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
