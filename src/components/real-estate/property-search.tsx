
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface SearchFilters {
    keyword: string;
    propertyType: string;
}

interface PropertySearchProps {
    onSearch: (filters: SearchFilters) => void;
}

export function PropertySearch({ onSearch }: PropertySearchProps) {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'property1');
    const [keyword, setKeyword] = useState('');
    const [propertyType, setPropertyType] = useState<string>('all');
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword) params.set('location', keyword);
        if (propertyType !== 'all') params.set('propertyType', propertyType);
        
        router.push(`/properties/search?${params.toString()}`);
    }

    return (
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover absolute inset-0 z-0"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative z-20 container mx-auto px-4 md:px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Dream Property</h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Search for properties by location, type, or keywords to find your perfect match.
                </p>
                <div className="max-w-3xl mx-auto bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div className="sm:col-span-2">
                            <Input
                                type="text"
                                placeholder="Enter keyword, location, city..."
                                className="h-12 text-base"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Select value={propertyType} onValueChange={setPropertyType}>
                                <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Plot">Plot</SelectItem>
                                    <SelectItem value="Flat">Flat</SelectItem>
                                    <SelectItem value="Rental">Rental</SelectItem>
                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                    <SelectItem value="Villa">Villa</SelectItem>
                                    <SelectItem value="Home">Home</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="lg" className="h-12 text-base w-full" onClick={handleSearch}>
                            <Search className="w-5 h-5 mr-2" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
