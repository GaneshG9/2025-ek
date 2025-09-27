

'use client';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { SearchResults } from '@/components/search/search-results';
import { FadeIn } from '@/components/motion/fade-in';
import { FilterBar } from '@/components/search/filter-bar';
import { useState, useMemo, useEffect } from 'react';
import { propertyService } from '@/lib/local-database';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

export interface Filters {
  query: string;
  location: string;
  category: 'all' | 'Residential' | 'Commercial';
  propertyType: 'all' | 'Plot' | 'Flat' | 'Rental' | 'Apartment' | 'Villa' | 'Home';
  status: 'all' | 'For Sale' | 'New' | 'Reduced';
  price: number;
}


export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    
    const [filters, setFilters] = useState<Filters>({
        query: initialQuery,
        location: '',
        category: 'all',
        propertyType: 'all',
        status: 'all',
        price: 100
    });
    
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load properties from database
    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const allProperties = await propertyService.getPublishedProperties();
                setProperties(allProperties);
            } catch (error) {
                console.error('Error loading properties:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadProperties();
    }, []);

    // Update query from URL params
    useEffect(() => {
        const urlQuery = searchParams.get('q') || '';
        if (urlQuery !== filters.query) {
            setFilters(prev => ({ ...prev, query: urlQuery }));
        }
    }, [searchParams]);
    
    const uniqueLocations = useMemo(() => {
        const locations = properties.map(p => p.location?.address).filter(Boolean);
        return [...new Set(locations)];
    }, [properties]);

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleReset = () => {
        setFilters({
            query: '',
            location: '',
            category: 'all',
            propertyType: 'all',
            status: 'all',
            price: 100
        });
    };

    const handleSearch = () => {
        // The SearchResults component will handle the filtering based on current filters
        // This function is for explicit search button clicks
    };

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
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header page="real-estate" />
      
      {/* Enhanced Search Hero Section */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Property</h1>
            <p className="text-muted-foreground">Search through our comprehensive database of properties</p>
          </div>
          
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, location, amenities, property code, or any keyword..."
                value={filters.query}
                onChange={(e) => handleFilterChange({ query: e.target.value })}
                className="pl-12 pr-20 h-14 text-lg"
              />
              <Button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onReset={handleReset}
            locations={uniqueLocations}
          />
        </div>
      </div>
      
      <main className="flex-grow">
        <FadeIn>
          <div className="container mx-auto px-4 md:px-6 py-8">
            <SearchResults filters={filters} properties={properties} />
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
