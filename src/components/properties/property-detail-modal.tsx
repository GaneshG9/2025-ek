

'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';
import { MapPin, Mail, Youtube, Instagram, Facebook, Star, Square, Calendar, Navigation, ExternalLink } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { PropertyMap } from '@/components/ui/property-map';
import type { User } from '@/context/auth-context';

export type Property = {
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
};


const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);


export function PropertyDetailModal({
  property,
  onOpenChange,
  user,
}: {
  property: Property | null;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}) {
  if (!property) return null;

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${property.location.lat},${property.location.lng}&zoom=14`;

  const propertyUrl = typeof window !== 'undefined' ? `${window.location.origin}/properties/${property.id}` : '';
  
  const userDetails = user ? `\n\nMy details:\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nPhone: ${user.phone}` : '';
  
  const inquiryMessage = `Hello, I'm interested in the following property:\n
- Property: ${property.title}
- Code: ${property.propertyCode}
- Price: ${property.price}
- Location: ${property.location.address}
- Link: ${propertyUrl}\n
Please provide more information.`;
  
  const siteVisitMessage = `Hello, I would like to book a site visit for the following property:\n
- Property: ${property.title}
- Code: ${property.propertyCode}\n
Please contact me to schedule a convenient time.`;

  const whatsAppMessage = encodeURIComponent(inquiryMessage + userDetails);
  const whatsAppUrl = `https://wa.me/+911234567890?text=${whatsAppMessage}`;

  const emailSubject = encodeURIComponent(`Inquiry about property: ${property.title} (Code: ${property.propertyCode})`);
  const emailBody = encodeURIComponent(inquiryMessage + userDetails + '\n\nThank you.');
  const emailUrl = `mailto:Ekavartaa+RealEstate_Contact@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const siteVisitSubject = encodeURIComponent(`Site Visit Inquiry for Property: ${property.title} (Code: ${property.propertyCode})`);
  const siteVisitBody = encodeURIComponent(siteVisitMessage + userDetails + '\n\nThank you.');
  const siteVisitUrl = `mailto:ekavartaa+RE_sitevisit@gmail.com?subject=${siteVisitSubject}&body=${siteVisitBody}`;

  const shareText = encodeURIComponent(`Check out this property: ${property.title} - ${propertyUrl}`);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`;


  return (
    <Dialog open={!!property} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-2xl">{property.title}</DialogTitle>
          <div className="text-sm text-muted-foreground pt-1">{property.location.address}</div>
        </DialogHeader>
        <div className="overflow-y-auto px-4">
            <div className="space-y-6">
                <Carousel className="w-full">
                    <CarouselContent>
                    {property.imageIds.map((id, index) => {
                        // Handle different image types: direct URLs, uploaded references, or placeholder IDs
                        const isDirectUrl = id.startsWith('http') || id.startsWith('blob:') || id.startsWith('data:');
                        const isUploadedReference = id.startsWith('uploaded_');
                        
                        let imageUrl = '';
                        let imageHint = '';
                        
                        if (isDirectUrl) {
                            imageUrl = id;
                            imageHint = 'uploaded image';
                        } else if (isUploadedReference) {
                            // Extract placeholder reference from uploaded image reference
                            const placeholderMatch = id.match(/_property\d+$/);
                            const placeholderId = placeholderMatch ? placeholderMatch[0].substring(1) : 'property1';
                            const placeholderImage = PlaceHolderImages.find((p) => p.id === placeholderId);
                            imageUrl = placeholderImage?.imageUrl || '';
                            imageHint = `uploaded as ${id.split('_')[1]} (using ${placeholderId} placeholder)`;
                        } else {
                            // Regular placeholder ID
                            const placeholderImage = PlaceHolderImages.find((p) => p.id === id);
                            imageUrl = placeholderImage?.imageUrl || '';
                            imageHint = placeholderImage?.imageHint || '';
                        }
                        
                        return (
                        <CarouselItem key={index}>
                            <Image
                                src={imageUrl}
                                alt={`${property.title} - Image ${index + 1}`}
                                width={800}
                                height={600}
                                className="object-cover aspect-video w-full rounded-lg"
                                data-ai-hint={imageHint}
                            />
                        </CarouselItem>
                        );
                    })}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>

                <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-primary">
                        {property.price}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative px-4 py-2 bg-background rounded-lg leading-none flex items-center space-x-2">
                                <Square className="w-5 h-5 text-primary" />
                                <span className="font-semibold">{property.sqft} sqft</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <p className="text-muted-foreground">{property.location.address}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Property Code</h4>
                    <p className="text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md inline-block">{property.propertyCode}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Description</h4>
                        <p className="text-muted-foreground">
                        {property.description}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {property.highlights && property.highlights.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Highlights</h4>
                            <div className="grid grid-cols-2 gap-2">
                            {property.highlights.map((highlight) => (
                                <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="w-4 h-4 text-primary" />
                                <span>{highlight}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        )}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((amenity) => (
                                <Badge key={amenity} variant="outline">
                                    {amenity}
                                </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Interactive Google Maps */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">Location & Map</h4>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`;
                                    window.open(googleMapsUrl, '_blank');
                                }}
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open in Google Maps
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.location.lat},${property.location.lng}`;
                                    window.open(directionsUrl, '_blank');
                                }}
                            >
                                <Navigation className="w-4 h-4 mr-2" />
                                Get Directions
                            </Button>
                        </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border">
                        <PropertyMap 
                            center={{ 
                                lat: property.location.lat, 
                                lng: property.location.lng 
                            }}
                            zoom={15}
                            address={property.location.address}
                            className="w-full h-80"
                        />
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-medium">Property Address</p>
                                <p className="text-sm text-muted-foreground">{property.location.address}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Coordinates: {property.location.lat.toFixed(6)}, {property.location.lng.toFixed(6)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-4 flex flex-wrap justify-between items-center gap-2 bg-secondary/50 border-t">
             <div className="flex gap-2">
                {property.youtubeUrl && (
                    <Button asChild variant="outline" size="icon">
                        <a href={property.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube">
                            <Youtube className="h-5 w-5 text-red-600" />
                        </a>
                    </Button>
                )}
                {property.instagramUrl && (
                    <Button asChild variant="outline" size="icon">
                        <a href={property.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
                            <Instagram className="h-5 w-5" />
                        </a>
                    </Button>
                )}
                 <Button asChild variant="outline" size="icon">
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                        <Facebook className="h-5 w-5" />
                    </a>
                </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                 <Button asChild>
                    <a href={siteVisitUrl} className="flex items-center gap-2">
                        <Calendar />
                        Book Site Visit
                    </a>
                </Button>
                <Button asChild>
                    <a href={emailUrl} className="flex items-center gap-2">
                        <Mail />
                        Contact Agent
                    </a>
                </Button>
                <Button asChild>
                    <a href={whatsAppUrl} target="_blank" className="flex items-center gap-2">
                        <WhatsAppIcon />
                        Get info on WhatsApp
                    </a>
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
