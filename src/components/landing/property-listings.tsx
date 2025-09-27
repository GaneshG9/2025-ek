

'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MapPin, Heart, Tag, Square, ArrowRight, Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { propertyService } from '@/lib/local-database';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { generatePropertyCode } from '@/lib/property-codes';
import { PropertyDetailModal, type Property } from '../properties/property-detail-modal';

interface PropertyListingsProps {
  properties?: Property[];
  title?: string;
}

const initialPropertiesData: Omit<Property, 'propertyCode'>[] = [
  {
    id: 1,
    title: 'Sea Facing Apartment',
    price: '₹12.5 Crore',
    sqft: 3200,
    imageIds: ['property1', 'property2', 'property3'],
    status: 'For Sale',
    category: 'Residential' as const,
    propertyType: 'Apartment' as const,
    description:
      'A stunning sea-facing apartment with breathtaking ocean views. This luxurious home offers 3,200 sqft of elegant living space, complete with modern amenities and a spacious balcony.',
    amenities: ['Clubhouse', 'Pool', 'Gym'],
    highlights: ['Chhatrapati Shivaji Maharaj International Airport: 8km', 'Juhu Market: 1km', 'Jamnabai Narsee School: 2km'],
    location: {
      address: 'Juhu, Mumbai, Maharashtra, India',
      lat: 19.1076,
      lng: 72.8255,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 2,
    title: 'Suburban Family Home',
    price: '₹3.75 Crore',
    sqft: 1800,
    imageIds: ['property2', 'property4', 'property1'],
    status: 'New',
    category: 'Residential' as const,
    propertyType: 'Home' as const,
    description:
      'This charming suburban family home features 1,800 sqft. It includes a beautiful garden, a modern kitchen, and is located in a family-friendly neighborhood with excellent schools.',
    amenities: ['Garden', 'Parking', 'Near Park'],
    highlights: ['Kempegowda International Airport: 35km', 'Koramangala Market: 2km', 'St. John\'s High School: 1km'],
    location: {
      address: 'Koramangala, Bengaluru, Karnataka, India',
      lat: 12.9352,
      lng: 77.6245,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 3,
    title: 'Penthouse with City View',
    price: '₹6 Crore',
    sqft: 1500,
    imageIds: ['property3', 'property1', 'property4'],
    status: 'For Sale',
    category: 'Residential' as const,
    propertyType: 'Apartment' as const,
    description:
      'Experience luxury living in this penthouse with panoramic city views. This 1,500 sqft residence offers a private terrace, floor-to-ceiling windows, and access to exclusive building amenities.',
    amenities: ['Rooftop Terrace', 'Concierge', 'Near Metro'],
    highlights: ['Indira Gandhi International Airport: 15km', 'Galleria Market: 3km', 'The Shri Ram School: 5km'],
    location: {
      address: 'DLF Phase 5, Gurugram, Haryana, India',
      lat: 28.4595,
      lng: 77.0266,
    },
     youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 4,
    title: 'Spacious Farmhouse',
    price: '₹4.9 Crore',
    sqft: 4500,
    imageIds: ['property4', 'property2', 'property3'],
    status: 'Reduced',
    category: 'Residential' as const,
    propertyType: 'Villa' as const,
    description:
      'A sprawling farmhouse set on a vast expanse of lush greenery. With 4,500 sqft of living space, this property is perfect for those seeking tranquility and a connection with a nature, away from the city hustle.',
    amenities: ['Private Land', 'Servant Quarters', 'Gated Community'],
    highlights: ['Dr. Babasaheb Ambedkar International Airport: 8km', 'Sitabuldi Main Market: 1km', 'St. Joseph\'s Convent High School: 2km'],
    location: {
      address: 'Chattarpur, New Delhi, Delhi, India',
      lat: 28.4754,
      lng: 77.1703,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 5,
    title: 'Modern City Loft',
    price: '₹2.1 Crore',
    sqft: 1200,
    imageIds: ['property1', 'property3', 'property2'],
    status: 'For Sale',
    category: 'Residential' as const,
    propertyType: 'Flat' as const,
    description: 'A stylish and modern loft in the heart of the city, perfect for young professionals. Close to all amenities and transport links.',
    amenities: ['24/7 Security', 'Gym', 'Rooftop Access'],
    location: {
        address: 'Bandra, Mumbai, Maharashtra, India',
        lat: 19.0596,
        lng: 72.8407,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 6,
    title: 'Garden Villa',
    price: '₹5.5 Crore',
    sqft: 3500,
    imageIds: ['property2', 'property1', 'property4'],
    status: 'New',
    category: 'Residential' as const,
    propertyType: 'Villa' as const,
    description: 'A beautiful villa surrounded by lush gardens, offering a peaceful and serene living environment. Comes with a private pool.',
    amenities: ['Private Pool', 'Garden', 'Gated Community'],
    location: {
        address: 'Indiranagar, Bengaluru, Karnataka, India',
        lat: 12.9784,
        lng: 77.6408,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 7,
    title: 'Commercial Office Space',
    price: '₹8 Crore',
    sqft: 5000,
    imageIds: ['property3', 'property2', 'property4'],
    status: 'For Sale',
    category: 'Commercial' as const,
    propertyType: 'Plot' as const,
    description: 'A prime commercial office space in a bustling business district, ideal for corporate headquarters or a growing startup.',
    amenities: ['High-Speed Internet', 'Conference Rooms', '24/7 Security'],
    location: {
        address: 'Cyber City, Gurugram, Haryana, India',
        lat: 28.4945,
        lng: 77.0877,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 8,
    title: 'Luxury Duplex',
    price: '₹9.8 Crore',
    sqft: 4200,
    imageIds: ['property1', 'property4', 'property2'],
    status: 'New',
    category: 'Residential' as const,
    propertyType: 'Apartment' as const,
    description: 'An exquisite duplex with modern interiors, a private elevator, and stunning views of the city skyline.',
    amenities: ['Private Elevator', 'Home Theater', 'Smart Home Automation'],
    location: {
        address: 'Worli, Mumbai, Maharashtra, India',
        lat: 19.0176,
        lng: 72.8179,
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  }
];

const tempPropertyTypes = ['Apartment', 'Home', 'Apartment', 'Villa', 'Apartment', 'Villa', 'Plot', 'Apartment'];

const commercialTypes = ['Plot'];
const residentialTypes = ['Apartment', 'Home', 'Villa', 'Flat', 'Rental'];

export const properties: Property[] = initialPropertiesData.map((p, index) => {
    const propertyType = tempPropertyTypes[index % tempPropertyTypes.length] as Property['propertyType'];
    let category: 'Residential' | 'Commercial';
    if (commercialTypes.includes(propertyType)) {
        category = 'Commercial';
    } else if (residentialTypes.includes(propertyType)) {
        category = 'Residential';
    } else {
        category = p.sqft > 4000 ? 'Commercial' : 'Residential';
    }
    
    return {
        ...p,
        propertyType,
        category,
        propertyCode: generatePropertyCode(p.sqft, category, index + 1)
    };
});



export function PropertyListings({ properties: listings = [], title = "Featured Properties" }: PropertyListingsProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [saved, setSaved] = useState<number[]>([]);
  const { user } = useAuth();


  const toggleSave = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };
  
  const handleIconClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="properties" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
            <div className="text-left">
                <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                    {title}
                </h2>
                {title === "Featured Properties" && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Explore our curated selection of premium real estate listings.
                </p>}
            </div>
             <Button asChild variant="outline" className="transition-transform duration-300 ease-in-out hover:scale-105 self-start sm:self-center">
                <Link href="/properties/search">
                    See More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        {listings.length === 0 && (
            <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No properties found matching your criteria.</p>
            </div>
        )}
        <Carousel
            opts={{
                align: "start",
                loop: listings.length > 4, // Only loop if there are enough items to scroll
            }}
            className="w-full"
        >
          <CarouselContent>
            {listings.map((property) => {
                // Handle different image types: direct URLs, uploaded references, or placeholder IDs
                const firstImageId = property.imageIds[0];
                const isDirectUrl = firstImageId?.startsWith('http') || firstImageId?.startsWith('blob:') || firstImageId?.startsWith('data:');
                const isUploadedReference = firstImageId?.startsWith('uploaded_');
                
                let imageUrl = '';
                let imageAlt = '';
                
                let isUploadedImage = false;
                let placeholderImage = null;
                
                if (isDirectUrl) {
                    imageUrl = firstImageId;
                    imageAlt = `${property.title} - Uploaded image`;
                    isUploadedImage = true;
                } else if (isUploadedReference) {
                    // Extract placeholder reference from uploaded image reference
                    const placeholderMatch = firstImageId.match(/_property\d+$/);
                    const placeholderId = placeholderMatch ? placeholderMatch[0].substring(1) : 'property1';
                    placeholderImage = PlaceHolderImages.find((p) => p.id === placeholderId);
                    imageUrl = placeholderImage?.imageUrl || '';
                    imageAlt = `${property.title} - ${firstImageId.split('_')[1]}`;
                    isUploadedImage = true;
                } else {
                    // Regular placeholder ID
                    placeholderImage = PlaceHolderImages.find((p) => p.id === firstImageId);
                    imageUrl = placeholderImage?.imageUrl || '';
                    imageAlt = placeholderImage?.description || `${property.title} image`;
                    isUploadedImage = false;
                }
                
                const isSaved = saved.includes(property.id);
                return (
                <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1 h-full">
                     <Card
                        id={`property-${property.id}`}
                        className="overflow-hidden group transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full"
                        onClick={() => setSelectedProperty(property)}
                    >
                        <CardHeader className="p-0 relative">
                        {imageUrl && (
                            <Image
                            src={imageUrl}
                            alt={imageAlt || `${property.title} image`}
                            width={600}
                            height={400}
                            className="object-cover aspect-[4/3] w-full"
                            data-ai-hint={isUploadedImage ? 'uploaded image' : placeholderImage?.imageHint}
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
                    </div>
                </CarouselItem>
                );
            })}
          </CarouselContent>
          {listings.length > 3 && <>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12" />
          </>}
        </Carousel>
      </div>
      <PropertyDetailModal
        property={selectedProperty}
        user={user}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProperty(null);
          }
        }}
      />
    </section>
  );
}
