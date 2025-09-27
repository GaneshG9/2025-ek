

'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MapPin, Heart, Tag, Square, Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo, lazy, Suspense } from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/context/auth-context';
import { generatePropertyCode } from '@/lib/property-codes';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { PropertyCardSkeleton } from '../ui/property-skeleton';
import type { Filters } from '@/app/properties/search/page';
import type { Property } from '../properties/property-detail-modal';

// Lazy load the property modal for better performance
const PropertyDetailModal = lazy(() => import('../properties/property-detail-modal').then(mod => ({ default: mod.PropertyDetailModal })));


// Minimal fallback data for development - should be replaced with real data
const initialPropertiesData: Omit<Property, 'propertyCode' | 'category'>[] = [
  {
    id: 1,
    title: 'Sample Property - Add Real Properties in Admin',
    price: '₹0 Lakh',
    sqft: 0,
    imageIds: ['property1'],
    status: 'For Sale',
    description: 'This is a sample property. Please add your real properties through the admin panel.',
    amenities: ['Admin Panel Access Required'],
    highlights: ['Go to /admin to add properties'],
    location: {
      address: 'Sample Location - Please Add Real Properties',
      lat: 28.6139,
      lng: 77.2090,
    },
    propertyType: 'Apartment',
  }
];

const commercialTypes = ['Plot'];
const residentialTypes = ['Apartment', 'Home', 'Villa', 'Flat', 'Rental'];

export const properties: Property[] = initialPropertiesData.map((p, index) => {
    const propertyType = p.propertyType as Property['propertyType'];
    let category: 'Residential' | 'Commercial';
    if (commercialTypes.includes(propertyType)) {
        category = 'Commercial';
    } else if (residentialTypes.includes(propertyType)) {
        category = 'Residential';
    } else {
        // Fallback for types not explicitly defined
        category = p.sqft > 4000 ? 'Commercial' : 'Residential';
    }
    
    return {
        ...p,
        category,
        propertyCode: generatePropertyCode(p.sqft, category, index + 1)
    };
});

const parsePrice = (price: string): number => {
    const numericString = price.replace(/[^0-9.]/g, '');
    const value = parseFloat(numericString);
    if (price.toLowerCase().includes('crore')) {
        return value * 10000000;
    }
    if (price.toLowerCase().includes('lakh')) {
        return value * 100000;
    }
    return value;
}


export function SearchResults({ filters, properties: propProperties }: { filters: Filters; properties: any[] }) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const { user } = useAuth();
  
  // Use properties from database or fallback to mock data for development
  const allProperties = propProperties.length > 0 ? propProperties : properties;
  
  const filteredProperties = useMemo(() => {
    const maxPrice = (filters.price / 100) * 200000000; // Max price of 20 crore

    return allProperties.filter(p => {
        const priceValue = parsePrice(p.price);

        // Global search across all fields
        if (filters.query) {
          const searchableText = [
            p.title,
            p.description,
            p.location?.address,
            p.propertyType,
            p.status,
            p.category,
            p.propertyCode,
            ...(p.amenities || []),
            ...(p.highlights || []),
            p.price
          ].filter(Boolean).join(' ').toLowerCase();
          
          if (!searchableText.includes(filters.query.toLowerCase())) {
            return false;
          }
        }

        const locationMatch = filters.location ? p.location?.address.toLowerCase().includes(filters.location.toLowerCase()) : true;
        const categoryMatch = filters.category !== 'all' ? p.category === filters.category : true;
        const typeMatch = filters.propertyType !== 'all' ? p.propertyType === filters.propertyType : true;
        const statusMatch = filters.status !== 'all' ? p.status === filters.status : true;
        const priceMatch = filters.price === 100 ? true : priceValue <= maxPrice;

        return locationMatch && categoryMatch && typeMatch && statusMatch && priceMatch;
    });
  }, [filters, allProperties]);


  const toggleSave = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => 
      prev.includes(propertyId.toString()) 
        ? prev.filter(id => id !== propertyId.toString()) 
        : [...prev, propertyId.toString()]
    );
  };
  
  const handleIconClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-8">
        {filteredProperties.length > 0 ? (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProperties.map((property) => {
                        const image = PlaceHolderImages.find(
                        (p) => p.id === property.imageIds[0]
                        );
                        const isSaved = saved.includes(property.id.toString());
                        return (
                            <Card
                                key={property.id}
                                className="overflow-hidden group transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full"
                                onClick={() => setSelectedProperty(property)}
                            >
                                <CardHeader className="p-0 relative">
                                {image && (
                                    <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    width={600}
                                    height={400}
                                    className="object-cover aspect-[4/3] w-full"
                                    data-ai-hint={image.imageHint}
                                    priority={false}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    />
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full" onClick={(e) => toggleSave(property.id, e)}>
                                    <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-current' : 'text-foreground'}`} />
                                    </Button>
                                </div>
                                <div className="absolute top-2 left-2">
                                    <Badge
                                    variant={
                                        property.status === 'New' ? 'default' : 'secondary'
                                    }
                                    >
                                    {property.status}
                                    </Badge>
                                </div>
                                </CardHeader>
                                <CardContent className="p-3 space-y-2 flex-grow">
                                <h3 className="text-base font-semibold mb-1 truncate group-hover:text-primary">
                                    {property.title}
                                </h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> <span className="truncate">{property.location.address}</span>
                                </p>
                                <div className="flex justify-between items-center pt-1">
                                    <p className="text-lg font-bold text-primary">
                                        {property.price}
                                    </p>
                                    {property.instagramUrl && (
                                        <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive" onClick={(e) => handleIconClick(e, property.instagramUrl!)}>
                                            <Instagram />
                                        </Button>
                                    )}
                                </div>
                                </CardContent>
                                <CardFooter className="p-3 bg-muted/50 flex justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Tag className="w-3 h-3" />
                                    <span className="font-mono">{property.propertyCode}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Square className="w-3 h-3" />
                                    <span>{property.sqft} sqft</span>
                                </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
                <div className="mt-12">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No properties found matching your criteria.</p>
            </div>
        )}
      <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
        <PropertyDetailModal
          property={selectedProperty}
          user={user}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProperty(null);
            }
          }}
        />
      </Suspense>
    </div>
  );
}
