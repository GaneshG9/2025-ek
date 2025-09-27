
'use client';

import { Header } from '@/components/landing/header';
import { FadeIn } from '@/components/motion/fade-in';
import { PropertySearch, SearchFilters } from '@/components/real-estate/property-search';
import { PropertyListings } from '@/components/landing/property-listings';
import { VideoReels } from '@/components/landing/video-reels';
import { propertyService } from '@/lib/local-database';
import { useState, useMemo, useEffect } from 'react';
import { RealEstateFooter } from '@/components/landing/real-estate-footer';

export default function RealEstatePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    propertyType: 'all',
  });
  
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties from database
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const properties = await propertyService.getPublishedProperties();
        setAllProperties(properties);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, []);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const filteredProperties = useMemo(() => {
    if (!filters.keyword && filters.propertyType === 'all') {
      return allProperties;
    }

    return allProperties.filter(property => {
      const keywordMatch = filters.keyword
        ? [
            property.title,
            property.description,
            property.location?.address,
            ...(property.amenities || []),
          ]
            .join(' ')
            .toLowerCase()
            .includes(filters.keyword.toLowerCase())
        : true;

      const typeMatch = filters.propertyType !== 'all'
        ? property.propertyType?.toLowerCase().includes(filters.propertyType.toLowerCase())
        : true;
      
      return keywordMatch && typeMatch;
    });
  }, [filters, allProperties]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header page="real-estate" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading properties...</p>
          </div>
        </main>
        <RealEstateFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="real-estate" />
      <main className="flex-grow">
        <FadeIn>
          <PropertySearch onSearch={handleSearch} />
        </FadeIn>
        <FadeIn>
          <PropertyListings properties={filteredProperties} title={filters.keyword ? "Search Results" : "Featured Properties"}/>
        </FadeIn>
        <FadeIn>
          <VideoReels />
        </FadeIn>
      </main>
      <RealEstateFooter />
    </div>
  );
}
