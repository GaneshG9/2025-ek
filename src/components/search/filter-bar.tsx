
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { type Filters } from '@/app/properties/search/page';
import { Combobox } from '../ui/combobox';


interface FilterBarProps {
    filters: Filters;
    onFilterChange: (newFilters: Partial<Filters>) => void;
    onReset: () => void;
    locations: string[];
}

export function FilterBar({ filters, onFilterChange, onReset, locations }: FilterBarProps) {
    
    const handleValueChange = (key: keyof Filters, value: string | number) => {
        onFilterChange({ [key]: value });
    }
    
    const locationOptions = locations.map(loc => ({ value: loc, label: loc }));

    return (
        <div className="bg-muted p-1 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 items-center">
                <div className="lg:col-span-2">
                    <Combobox
                        options={locationOptions}
                        value={filters.location}
                        onChange={(value) => handleValueChange('location', value)}
                        placeholder="Search city, area, or district..."
                    />
                </div>
                 <div>
                    <Select 
                        value={filters.category} 
                        onValueChange={(value: Filters['category']) => handleValueChange('category', value)}
                    >
                        <SelectTrigger aria-label="Category" className="h-9">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Residential">Residential</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Select 
                        value={filters.propertyType} 
                        onValueChange={(value: Filters['propertyType']) => handleValueChange('propertyType', value)}
                    >
                        <SelectTrigger aria-label="Property Type" className="h-9">
                            <SelectValue placeholder="All Types" />
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
                 <div className="flex gap-1">
                    <Select 
                        value={filters.status}
                        onValueChange={(value: Filters['status']) => handleValueChange('status', value)}
                    >
                        <SelectTrigger aria-label="Status" className="h-9">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="For Sale">For Sale</SelectItem>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Reduced">Reduced</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={onReset} className="h-9 w-9">
                        <RotateCcw className="h-4 w-4" />
                        <span className="sr-only">Reset Filters</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
