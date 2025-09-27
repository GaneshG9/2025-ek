
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { propertyService } from '@/lib/local-database';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { generatePropertyCode } from '@/lib/property-codes';
import { MoreHorizontal, ArrowLeft, Plus, Eye, Edit, Trash2, Search, ExternalLink, AlertTriangle, Copy } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PropertyForm, PropertyFormData } from './property-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


export type Property = {
  id: number;
  title: string;
  price: string;
  sqft: number;
  imageIds: string[];
  videoUrls?: string[];
  attachments?: string[];
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
  isVisible: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
  propertyCode: string;
  youtubeUrl?: string;
  instagramUrl?: string;
};

const initialPropertiesData: Partial<Property>[] = [
  {
    id: 1,
    title: 'Sea Facing Apartment',
    price: '₹12.5 Crore',
    sqft: 3200,
    imageIds: ['property1', 'property2', 'property3'],
    videoUrls: [],
    attachments: [],
    status: 'For Sale',
    description: 'A stunning sea-facing apartment with breathtaking ocean views. This luxurious home offers 3,200 sqft of elegant living space, complete with modern amenities and a spacious balcony.',
    amenities: ['Clubhouse', 'Pool', 'Gym'],
    highlights: ['Chhatrapati Shivaji Maharaj International Airport: 8km', 'Juhu Market: 1km', 'Jamnabai Narsee School: 2km'],
    location: { address: 'Juhu, Mumbai, Maharashtra, India', lat: 19.1076, lng: 72.8255 },
    category: 'Residential',
    propertyType: 'Apartment',
    isVisible: true,
    isPublished: true,
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
    description: 'This charming suburban family home features 1,800 sqft. It includes a beautiful garden, a modern kitchen, and is located in a family-friendly neighborhood with excellent schools.',
    amenities: ['Garden', 'Parking', 'Near Park'],
    highlights: ['Kempegowda International Airport: 35km', 'Koramangala Market: 2km', 'St. John\'s High School: 1km'],
    location: { address: 'Koramangala, Bengaluru, Karnataka, India', lat: 12.9352, lng: 77.6245 },
    category: 'Residential',
    propertyType: 'Home',
    isVisible: true,
    isPublished: true,
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
    description: 'Experience luxury living in this penthouse with panoramic city views. This 1,500 sqft residence offers a private terrace, floor-to-ceiling windows, and access to exclusive building amenities.',
    amenities: ['Rooftop Terrace', 'Concierge', 'Near Metro'],
    highlights: ['Indira Gandhi International Airport: 15km', 'Galleria Market: 3km', 'The Shri Ram School: 5km'],
    location: { address: 'DLF Phase 5, Gurugram, Haryana, India', lat: 28.4595, lng: 77.0266 },
    category: 'Residential',
    propertyType: 'Apartment',
    isVisible: true,
    isPublished: true,
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
    description: 'A sprawling farmhouse set on a vast expanse of lush greenery. With 4,500 sqft of living space, this property is perfect for those seeking tranquility and a connection with a nature, away from the city hustle.',
    amenities: ['Private Land', 'Servant Quarters', 'Gated Community'],
    highlights: ['Dr. Babasaheb Ambedkar International Airport: 8km', 'Sitabuldi Main Market: 1km', 'St. Joseph\'s Convent High School: 2km'],
    location: { address: 'Chattarpur, New Delhi, Delhi, India', lat: 28.4754, lng: 77.1703 },
    category: 'Residential',
    propertyType: 'Villa',
    isVisible: true,
    isPublished: true,
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
    description: 'A stylish and modern loft in the heart of the city, perfect for young professionals. Close to all amenities and transport links.',
    amenities: ['24/7 Security', 'Gym', 'Rooftop Access'],
    location: { address: 'Bandra, Mumbai, Maharashtra, India', lat: 19.0596, lng: 72.8407 },
    category: 'Residential',
    propertyType: 'Flat',
    isVisible: true,
    isPublished: true,
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
    description: 'A beautiful villa surrounded by lush gardens, offering a peaceful and serene living environment. Comes with a private pool.',
    amenities: ['Private Pool', 'Garden', 'Gated Community'],
    location: { address: 'Indiranagar, Bengaluru, Karnataka, India', lat: 12.9784, lng: 77.6408 },
    category: 'Residential',
    propertyType: 'Villa',
    isVisible: true,
    isPublished: true,
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
    description: 'A prime commercial office space in a bustling business district, ideal for corporate headquarters or a growing startup.',
    amenities: ['High-Speed Internet', 'Conference Rooms', '24/7 Security'],
    location: { address: 'Cyber City, Gurugram, Haryana, India', lat: 28.4945, lng: 77.0877 },
    category: 'Commercial',
    propertyType: 'Plot',
    isVisible: true,
    isPublished: true,
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
    description: 'An exquisite duplex with modern interiors, a private elevator, and stunning views of the city skyline.',
    amenities: ['Private Elevator', 'Home Theater', 'Smart Home Automation'],
    location: { address: 'Worli, Mumbai, Maharashtra, India', lat: 19.0176, lng: 72.8179 },
    category: 'Residential',
    propertyType: 'Apartment',
    isVisible: true,
    isPublished: true,
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
    description:
      'This charming suburban family home features 1,800 sqft. It includes a beautiful garden, a modern kitchen, and is located in a family-friendly neighborhood with excellent schools.',
    amenities: ['Garden', 'Parking', 'Near Park'],
    highlights: ['Kempegowda International Airport: 35km', 'Koramangala Market: 2km', 'St. John\'s High School: 1km'],
    location: {
      address: 'Koramangala, Bengaluru, Karnataka, India',
      lat: 12.9352,
      lng: 77.6245,
    },
    category: 'Residential',
    propertyType: 'Home',
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
    description:
      'Experience luxury living in this penthouse with panoramic city views. This 1,500 sqft residence offers a private terrace, floor-to-ceiling windows, and access to exclusive building amenities.',
    amenities: ['Rooftop Terrace', 'Concierge', 'Near Metro'],
    highlights: ['Indira Gandhi International Airport: 15km', 'Galleria Market: 3km', 'The Shri Ram School: 5km'],
    location: {
      address: 'DLF Phase 5, Gurugram, Haryana, India',
      lat: 28.4595,
      lng: 77.0266,
    },
    category: 'Residential',
    propertyType: 'Flat',
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
    description:
      'A sprawling farmhouse set on a vast expanse of lush greenery. With 4,500 sqft of living space, this property is perfect for those seeking tranquility and a connection with a nature, away from the city hustle.',
    amenities: ['Private Land', 'Servant Quarters', 'Gated Community'],
    highlights: ['Dr. Babasaheb Ambedkar International Airport: 8km', 'Sitabuldi Main Market: 1km', 'St. Joseph\'s Convent High School: 2km'],
    location: {
      address: 'Chattarpur, New Delhi, Delhi, India',
      lat: 28.4754,
      lng: 77.1703,
    },
    category: 'Residential',
    propertyType: 'Villa',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 9,
    title: 'Mountain View Cabin',
    price: '₹2.8 Crore',
    sqft: 1600,
    imageIds: ['property2', 'property3', 'property4'],
    status: 'For Sale',
    description: 'A cozy mountain cabin with breathtaking views, perfect for weekend getaways or permanent residence.',
    amenities: ['Mountain View', 'Fireplace', 'Hiking Trails'],
    location: { address: 'Manali, Himachal Pradesh, India', lat: 32.2396, lng: 77.1887 },
    category: 'Residential',
    propertyType: 'Home',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 10,
    title: 'Industrial Warehouse',
    price: '₹7.2 Crore',
    sqft: 10000,
    imageIds: ['property4', 'property1', 'property3'],
    status: 'For Sale',
    description: 'Large industrial warehouse space perfect for manufacturing or logistics operations.',
    amenities: ['Loading Dock', 'High Ceiling', 'Security'],
    location: { address: 'Bhiwadi, Maharashtra, India', lat: 28.2095, lng: 76.8343 },
    category: 'Commercial',
    propertyType: 'Plot',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 11,
    title: 'Heritage Haveli',
    price: '₹11 Crore',
    sqft: 7500,
    imageIds: ['property1', 'property2', 'property4'],
    status: 'New',
    description: 'Restored heritage haveli with traditional architecture and modern amenities.',
    amenities: ['Heritage Architecture', 'Courtyard', 'Traditional Decor'],
    location: { address: 'Udaipur, Rajasthan, India', lat: 24.5854, lng: 73.7125 },
    category: 'Residential',
    propertyType: 'Villa',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 12,
    title: 'Beachside Bungalow',
    price: '₹8.5 Crore',
    sqft: 3800,
    imageIds: ['property3', 'property1', 'property2'],
    status: 'Reduced',
    description: 'Stunning beachside bungalow with direct beach access and panoramic ocean views.',
    amenities: ['Beach Access', 'Ocean View', 'Private Beach'],
    location: { address: 'Goa, India', lat: 15.2993, lng: 74.1240 },
    category: 'Residential',
    propertyType: 'Villa',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 13,
    title: 'IT Park Office',
    price: '₹6.5 Crore',
    sqft: 4200,
    imageIds: ['property4', 'property3', 'property1'],
    status: 'For Sale',
    description: 'Modern office space in prime IT park location with state-of-the-art facilities.',
    amenities: ['IT Infrastructure', 'Conference Rooms', 'Cafeteria'],
    location: { address: 'Hinjewadi, Pune, Maharashtra, India', lat: 18.5911, lng: 73.7375 },
    category: 'Commercial',
    propertyType: 'Plot',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 14,
    title: 'Cozy Studio Apartment',
    price: '₹1.5 Crore',
    sqft: 600,
    imageIds: ['property2', 'property4', 'property1'],
    status: 'New',
    description: 'Compact yet comfortable studio apartment perfect for young professionals.',
    amenities: ['Modern Kitchen', 'Gym Access', 'Parking'],
    location: { address: 'Hauz Khas, New Delhi, Delhi, India', lat: 28.5494, lng: 77.1960 },
    category: 'Residential',
    propertyType: 'Flat',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 15,
    title: 'Golf Course Residence',
    price: '₹18 Crore',
    sqft: 8600,
    imageIds: ['property1', 'property3', 'property4'],
    status: 'For Sale',
    description: 'Luxurious residence overlooking the golf course with premium amenities and services.',
    amenities: ['Golf Course View', 'Club Access', 'Concierge'],
    location: { address: 'Noida, UP, India', lat: 28.5355, lng: 77.3910 },
    category: 'Residential',
    propertyType: 'Villa',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
  {
    id: 16,
    title: 'Eco-Friendly Home',
    price: '₹4.1 Crore',
    sqft: 2200,
    imageIds: ['property2', 'property1', 'property3'],
    status: 'New',
    description: 'Sustainable home with solar panels, rainwater harvesting, and energy-efficient design.',
    amenities: ['Solar Panels', 'Rainwater Harvesting', 'Green Building'],
    location: { address: 'Whitefield, Bengaluru, Karnataka, India', lat: 12.9698, lng: 77.7500 },
    category: 'Residential',
    propertyType: 'Home',
    isVisible: true,
    isPublished: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagramUrl: 'https://www.instagram.com',
  },
];




export default function AdminPropertiesPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Search and Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [publishFilter, setPublishFilter] = useState('All');
    const [visibilityFilter, setVisibilityFilter] = useState('All');
    
    // Debounced search for better performance
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    
    // Pagination for better performance
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    
    // Bulk operations
    const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    
    // Storage monitoring
    const [storageWarning, setStorageWarning] = useState<string | null>(null);
    
    // Changes tracking
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Helper function to generate unique IDs
    const generateUniqueId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    // Load properties from database on component mount
    useEffect(() => {
        loadProperties();
    }, []); // Empty dependency array ensures this only runs once on mount

    // Keyboard shortcut for saving changes (Ctrl+S)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's' && hasUnsavedChanges) {
                event.preventDefault();
                saveAllChanges();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [hasUnsavedChanges]);

    // Warn before leaving page with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const loadProperties = async () => {
        try {
            setLoading(true);
            const dbProperties = await propertyService.getAll();
            
            // If no properties exist, initialize with default data
            if (dbProperties.length === 0) {
                for (const property of initialPropertiesData) {
                    const propertyWithCode = {
                        ...property,
                        // Add missing fields for compatibility
                        videoUrls: property.videoUrls || [],
                        attachments: property.attachments || [],
                        isVisible: property.isVisible ?? true,
                        isPublished: property.isPublished ?? true,
                        createdAt: property.createdAt || new Date().toISOString(),
                        updatedAt: property.updatedAt || new Date().toISOString(),
                        propertyCode: generatePropertyCode(property.sqft!, property.category!, property.id!)
                    };
                    await propertyService.create(propertyWithCode);
                }
                // Reload properties after initialization
                const newProperties = await propertyService.getAll();
                setProperties(newProperties);
            } else {
                setProperties(dbProperties);
            }
            setHasUnsavedChanges(false); // Reset changes flag after loading
            checkStorageHealth(); // Check storage after loading
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkStorageHealth = () => {
        if (typeof window === 'undefined') return;
        
        let totalSize = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length;
            }
        }
        
        const sizeMB = totalSize / (1024 * 1024);
        const maxSizeMB = 5; // Typical localStorage limit
        const usagePercent = (sizeMB / maxSizeMB) * 100;
        
        if (usagePercent > 90) {
            setStorageWarning(`Storage critically full (${usagePercent.toFixed(0)}%). Consider cleaning up data.`);
        } else if (usagePercent > 70) {
            setStorageWarning(`Storage getting full (${usagePercent.toFixed(0)}%). Consider optimizing.`);
        } else {
            setStorageWarning(null);
        }
    };

    // Duplicate property function
    const duplicateProperty = async (propertyToDuplicate: Property) => {
        try {
            console.log('📋 Duplicating property:', propertyToDuplicate.title);
            
            // Create a new property with duplicated data
            const newId = Date.now();
            const duplicatedProperty: Property = {
                ...propertyToDuplicate,
                id: newId,
                title: `${propertyToDuplicate.title} (Copy)`,
                propertyCode: generatePropertyCode(propertyToDuplicate.sqft, propertyToDuplicate.category, newId),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                // Reset status flags for the duplicate
                isVisible: true,
                isPublished: false, // New duplicates start as drafts
            };

            // Save to database
            await propertyService.create(duplicatedProperty);
            
            // Update state with the new property
            const updatedProperties = await propertyService.getAll();
            setProperties(updatedProperties);
            setHasUnsavedChanges(false);
            checkStorageHealth();
            
            // Success message
            alert(`✅ Property duplicated successfully!\n\n📋 Original: ${propertyToDuplicate.title}\n📋 Copy: ${duplicatedProperty.title}\n🆔 New Code: ${duplicatedProperty.propertyCode}\n\n💡 The duplicate has been created as a draft. You can edit and publish it when ready.`);
            console.log(`✅ Property duplicated: ${duplicatedProperty.title} (${duplicatedProperty.propertyCode})`);
            
        } catch (error) {
            console.error('❌ Error duplicating property:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`❌ Error duplicating property: ${errorMessage}\n\nPlease try again.`);
        }
    };

    // Save all pending changes
    const saveAllChanges = async () => {
        if (!hasUnsavedChanges) {
            alert('No changes to save');
            return;
        }

        setIsSaving(true);
        try {
            console.log('💾 Starting to save all changes...');
            
            // Save all current properties to the database
            const currentProperties = properties;
            let savedCount = 0;
            
            for (const property of currentProperties) {
                await propertyService.update(property.id.toString(), property);
                savedCount++;
                console.log(`✅ Saved property: ${property.title} (${property.propertyCode})`);
            }
            
            setHasUnsavedChanges(false);
            checkStorageHealth();
            
            // Show detailed success message
            const message = `✅ All changes saved successfully!\n\n📊 Summary:\n• Updated ${savedCount} properties\n• Storage optimized\n• Database synchronized\n\n⏰ Saved at: ${new Date().toLocaleTimeString()}`;
            alert(message);
            console.log('💾 All changes saved to database successfully');
            
        } catch (error) {
            console.error('❌ Error saving changes:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`❌ Error saving changes: ${errorMessage}\n\nPlease try again or refresh the page.`);
        } finally {
            setIsSaving(false);
        }
    };

    // Filter and search properties
    useEffect(() => {
        let filtered = [...properties];

        // Search filter
        if (debouncedSearchQuery) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                property.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                property.location.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                property.propertyCode.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
        }        // Status filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter(property => property.status === statusFilter);
        }

        // Category filter
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(property => property.category === categoryFilter);
        }

        // Publish filter
        if (publishFilter !== 'All') {
            const isPublished = publishFilter === 'Published';
            filtered = filtered.filter(property => property.isPublished === isPublished);
        }

        // Visibility filter
        if (visibilityFilter !== 'All') {
            const isVisible = visibilityFilter === 'Visible';
            filtered = filtered.filter(property => property.isVisible === isVisible);
        }

        setFilteredProperties(filtered);
    }, [properties, debouncedSearchQuery, statusFilter, categoryFilter, publishFilter, visibilityFilter]);

    // Paginated properties for better performance
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProperties.slice(startIndex, endIndex);
    }, [filteredProperties, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const handleAddClick = useCallback(() => {
        setEditingProperty(null);
        setIsFormOpen(true);
    }, []);

    const handleEditClick = useCallback((property: Property) => {
        setEditingProperty(property);
        setIsFormOpen(true);
    }, []);

    const handleDeleteClick = useCallback((property: Property) => {
        setPropertyToDelete(property);
    }, []);

    const confirmDelete = async () => {
        if (propertyToDelete) {
            try {
                await propertyService.delete(propertyToDelete.id.toString());
                setProperties(properties.filter(p => p.id !== propertyToDelete.id));
                setPropertyToDelete(null);
            } catch (error) {
                console.error('Error deleting property:', error);
            }
        }
    };

    const handleFormSubmit = async (data: PropertyFormData) => {
        try {
            if (editingProperty) {
                // Update existing property
                const updatedPropertyData = {
                    ...editingProperty,
                    ...data,
                    sqft: Number(data.sqft),
                    amenities: data.amenities.split(',').map(a => a.trim()),
                    highlights: data.highlights?.split(',').map(h => h.trim()),
                    location: { ...editingProperty.location, address: data.location },
                    propertyCode: generatePropertyCode(Number(data.sqft), data.category, editingProperty.id),
                    imageIds: data.imageIds && data.imageIds.length > 0 ? data.imageIds : editingProperty.imageIds
                };

                await propertyService.update(editingProperty.id.toString(), updatedPropertyData);
                console.log('✅ Property updated successfully!');
            } else {
                // Add new property
                const newId = Date.now(); // Use timestamp as unique ID
                const newProperty: Property = {
                    id: newId,
                    title: data.title,
                    price: data.price,
                    sqft: Number(data.sqft),
                    description: data.description,
                    status: data.status,
                    category: data.category,
                    propertyType: data.propertyType,
                    amenities: data.amenities.split(',').map(a => a.trim()),
                    highlights: data.highlights?.split(',').map(h => h.trim()),
                    location: {
                        address: data.location,
                        lat: 28.6139, // Placeholder coordinates - you can integrate with geocoding API later
                        lng: 77.2090,
                    },
                    imageIds: data.imageIds && data.imageIds.length > 0 ? data.imageIds : ['property1', 'property2', 'property3'],
                    videoUrls: data.videoUrls || [],
                    attachments: data.attachments || [],
                    propertyCode: generatePropertyCode(Number(data.sqft), data.category, newId),
                    youtubeUrl: data.youtubeUrl,
                    instagramUrl: data.instagramUrl,
                    isVisible: true, // Default to visible
                    isPublished: false, // Default to unpublished (needs admin approval)
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                await propertyService.create(newProperty);
                console.log('✅ Property created successfully!', newProperty.propertyCode);
            }
            
            // Update state directly instead of reloading
            const updatedProperties = await propertyService.getAll();
            setProperties(updatedProperties);
            setHasUnsavedChanges(false); // Reset changes flag after save
            checkStorageHealth(); // Check storage after adding/updating property
            
            // Close form and reset state
            setIsFormOpen(false);
            setEditingProperty(null);
            
            // Show success message
            alert(editingProperty ? 'Property updated successfully!' : 'Property added successfully!');
            
        } catch (error) {
            console.error('❌ Error saving property:', error);
            alert('Error saving property. Please try again.');
        }
    };

    // Toggle visibility function
    const toggleVisibility = async (propertyId: number) => {
        try {
            const property = properties.find(p => p.id === propertyId);
            if (property) {
                const updatedProperty = { ...property, isVisible: !property.isVisible };
                await propertyService.update(propertyId.toString(), updatedProperty);
                
                // Update state directly instead of reloading
                setProperties(prevProperties => 
                    prevProperties.map(p => p.id === propertyId ? updatedProperty : p)
                );
                setHasUnsavedChanges(true);
                
                console.log(`Property ${propertyId} visibility toggled to ${updatedProperty.isVisible}`);
            }
        } catch (error) {
            console.error('Error toggling visibility:', error);
            alert('Error updating property visibility.');
        }
    };

    // Toggle publish status function
    const togglePublished = async (propertyId: number) => {
        try {
            const property = properties.find(p => p.id === propertyId);
            if (property) {
                const updatedProperty = { ...property, isPublished: !property.isPublished };
                await propertyService.update(propertyId.toString(), updatedProperty);
                
                // Update state directly instead of reloading
                setProperties(prevProperties => 
                    prevProperties.map(p => p.id === propertyId ? updatedProperty : p)
                );
                setHasUnsavedChanges(true);
                
                console.log(`Property ${propertyId} publish status toggled to ${updatedProperty.isPublished}`);
            }
        } catch (error) {
            console.error('Error toggling publish status:', error);
            alert('Error updating property publish status.');
        }
    };

    // Bulk operations
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedProperties([]);
        } else {
            setSelectedProperties(filteredProperties.map(p => p.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectProperty = (propertyId: number) => {
        if (selectedProperties.includes(propertyId)) {
            setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
        } else {
            setSelectedProperties([...selectedProperties, propertyId]);
        }
    };

    const bulkToggleVisibility = async () => {
        try {
            const updatedProperties = [...properties];
            
            for (const propertyId of selectedProperties) {
                const propertyIndex = updatedProperties.findIndex(p => p.id === propertyId);
                if (propertyIndex !== -1) {
                    const updatedProperty = { 
                        ...updatedProperties[propertyIndex], 
                        isVisible: !updatedProperties[propertyIndex].isVisible 
                    };
                    updatedProperties[propertyIndex] = updatedProperty;
                    await propertyService.update(propertyId.toString(), updatedProperty);
                }
            }
            
            // Update state once with all changes
            setProperties(updatedProperties);
            setHasUnsavedChanges(true);
            setSelectedProperties([]);
            setSelectAll(false);
            alert(`Visibility toggled for ${selectedProperties.length} properties`);
        } catch (error) {
            console.error('Error in bulk visibility toggle:', error);
        }
    };

    const bulkTogglePublished = async () => {
        try {
            const updatedProperties = [...properties];
            
            for (const propertyId of selectedProperties) {
                const propertyIndex = updatedProperties.findIndex(p => p.id === propertyId);
                if (propertyIndex !== -1) {
                    const updatedProperty = { 
                        ...updatedProperties[propertyIndex], 
                        isPublished: !updatedProperties[propertyIndex].isPublished 
                    };
                    updatedProperties[propertyIndex] = updatedProperty;
                    await propertyService.update(propertyId.toString(), updatedProperty);
                }
            }
            
            // Update state once with all changes
            setProperties(updatedProperties);
            setHasUnsavedChanges(true);
            setSelectedProperties([]);
            setSelectAll(false);
            alert(`Publish status toggled for ${selectedProperties.length} properties`);
        } catch (error) {
            console.error('Error in bulk publish toggle:', error);
        }
    };

    const bulkDelete = async () => {
        if (confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
            try {
                for (const propertyId of selectedProperties) {
                    await propertyService.delete(propertyId.toString());
                }
                
                // Update state by removing deleted properties
                setProperties(prevProperties => 
                    prevProperties.filter(p => !selectedProperties.includes(p.id))
                );
                setHasUnsavedChanges(false); // Reset changes flag after delete
                setSelectedProperties([]);
                setSelectAll(false);
                alert(`${selectedProperties.length} properties deleted successfully`);
            } catch (error) {
                console.error('Error in bulk delete:', error);
                alert('Error deleting properties.');
            }
        }
    };

    // Database reset function
    const resetDatabase = async () => {
        if (confirm('Are you sure you want to reset the database? This will clear all existing properties and reload the default properties.')) {
            try {
                // Clear localStorage
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('local_db_properties');
                }
                
                // Reload the page to reinitialize with default properties
                window.location.reload();
            } catch (error) {
                console.error('Error resetting database:', error);
                alert('Error resetting database.');
            }
        }
    };

    // Bulk duplicate selected properties
    const bulkDuplicateProperties = async () => {
        if (selectedProperties.length === 0) {
            toast({
                title: "No Properties Selected",
                description: "Please select properties to duplicate.",
                variant: "destructive",
            });
            return;
        }

        const selectedCount = selectedProperties.length;
        if (!confirm(`Are you sure you want to duplicate ${selectedCount} selected properties?`)) {
            return;
        }

        try {
            const duplicatedProperties = [];
            for (const propertyId of selectedProperties) {
                const property = properties.find(p => p.id === propertyId);
                if (property) {
                    const duplicatedProperty = {
                        ...property,
                        id: generateUniqueId(),
                        title: `${property.title} - Copy`,
                        propertyCode: `PROP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                        isVisible: true,
                        isPublished: false, // Duplicates start as drafts
                    };
                    duplicatedProperties.push(duplicatedProperty);
                }
            }

            // Save all duplicated properties
            for (const duplicatedProperty of duplicatedProperties) {
                await propertyService.create(duplicatedProperty);
            }

            // Refresh the properties list
            const updatedProperties = await propertyService.getAll();
            setProperties(updatedProperties);
            setFilteredProperties(updatedProperties);
            setSelectedProperties([]);
            setHasUnsavedChanges(false);

            toast({
                title: "Properties Duplicated",
                description: `Successfully duplicated ${duplicatedProperties.length} properties.`,
            });
        } catch (error) {
            console.error('Error duplicating properties:', error);
            toast({
                title: "Duplication Error",
                description: "Failed to duplicate selected properties.",
                variant: "destructive",
            });
        }
    };

    // Storage cleanup function
    const cleanupStorage = async () => {
        if (confirm('Clean up storage to free space? This will remove old data and optimize storage usage.')) {
            try {
                // Get storage usage info
                let totalSize = 0;
                for (const key in localStorage) {
                    if (localStorage.hasOwnProperty(key)) {
                        totalSize += localStorage[key].length;
                    }
                }
                
                console.log(`📊 Current storage usage: ${(totalSize / 1024).toFixed(2)} KB`);
                
                // Clean up non-essential data
                const keysToClean = ['local_db_analytics', 'local_db_messages', 'local_db_notifications'];
                let cleanedSize = 0;
                
                keysToClean.forEach(key => {
                    const item = localStorage.getItem(key);
                    if (item) {
                        cleanedSize += item.length;
                        localStorage.removeItem(key);
                    }
                });
                
                // Limit properties to 8 most recent
                const propertiesKey = 'local_db_properties';
                const existingData = JSON.parse(localStorage.getItem(propertiesKey) || '[]');
                
                if (existingData.length > 8) {
                    const sortedData = existingData
                        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 8);
                    
                    localStorage.setItem(propertiesKey, JSON.stringify(sortedData));
                    
                    // Update state with cleaned data
                    const updatedProperties = await propertyService.getAll();
                    setProperties(updatedProperties);
                }
                
                console.log(`🧹 Cleaned up ${(cleanedSize / 1024).toFixed(2)} KB of storage`);
                alert('Storage cleanup completed! Properties limited to 8 most recent entries.');
                checkStorageHealth(); // Refresh storage health status
                
            } catch (error) {
                console.error('Error cleaning storage:', error);
                alert('Error cleaning storage.');
            }
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Button 
                    variant="outline" 
                    onClick={() => router.push('/admin')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
                
                <div className="flex-1 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            Property Management
                            {hasUnsavedChanges && (
                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                    Unsaved Changes
                                </span>
                            )}
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your property listings • {properties.length} {properties.length === 1 ? 'property' : 'properties'}
                            {typeof window !== 'undefined' && (() => {
                                let totalSize = 0;
                                for (const key in localStorage) {
                                    if (localStorage.hasOwnProperty(key)) {
                                        totalSize += localStorage[key].length;
                                    }
                                }
                                const sizeKB = (totalSize / 1024).toFixed(1);
                                const maxSizeKB = 5120; // ~5MB typical localStorage limit
                                const usagePercent = ((totalSize / 1024) / maxSizeKB * 100).toFixed(0);
                                return ` • Storage: ${sizeKB}KB (${usagePercent}% used)`;
                            })()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            onClick={loadProperties}
                            className="flex items-center gap-2"
                        >
                            🔄 Refresh
                        </Button>
                        <Button 
                            variant={hasUnsavedChanges ? "default" : "outline"}
                            onClick={saveAllChanges}
                            disabled={!hasUnsavedChanges || isSaving}
                            className={`flex items-center gap-2 ${hasUnsavedChanges ? 'bg-green-600 hover:bg-green-700 text-white' : 'text-gray-500'}`}
                            title={hasUnsavedChanges ? "Save all pending changes (Ctrl+S)" : "No changes to save"}
                        >
                            {isSaving ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    💾 Save Changes
                                    {hasUnsavedChanges && (
                                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                                            !
                                        </span>
                                    )}
                                </>
                            )}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={cleanupStorage}
                            className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
                        >
                            🧹 Cleanup
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={resetDatabase}
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                        >
                            🔄 Reset DB
                        </Button>
                        <Button onClick={handleAddClick}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Property
                        </Button>
                    </div>
                </div>
            </div>

            {/* Storage Warning */}
            {storageWarning && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                        <p className="text-yellow-700 text-sm">{storageWarning}</p>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={cleanupStorage}
                            className="ml-auto text-xs"
                        >
                            Clean Storage
                        </Button>
                    </div>
                </div>
            )}

            <div className="bg-background border rounded-lg p-4 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search properties by title, code, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="All">All Status</option>
                            <option value="For Sale">For Sale</option>
                            <option value="New">New</option>
                            <option value="Reduced">Reduced</option>
                            <option value="Sold">Sold</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="All">All Categories</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>

                        <select
                            value={publishFilter}
                            onChange={(e) => setPublishFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="All">All Publish Status</option>
                            <option value="Published">Published</option>
                            <option value="Unpublished">Unpublished</option>
                        </select>

                        <select
                            value={visibilityFilter}
                            onChange={(e) => setVisibilityFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="All">All Visibility</option>
                            <option value="Visible">Visible</option>
                            <option value="Hidden">Hidden</option>
                        </select>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedProperties.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {selectedProperties.length} properties selected
                            </span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={bulkToggleVisibility}>
                                    Toggle Visibility
                                </Button>
                                <Button size="sm" variant="outline" onClick={bulkTogglePublished}>
                                    Toggle Publish
                                </Button>
                                <Button size="sm" variant="default" onClick={bulkDuplicateProperties}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate Selected
                                </Button>
                                <Button size="sm" variant="destructive" onClick={bulkDelete}>
                                    Delete Selected
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Properties Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </TableHead>
                                <TableHead>Property</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead>View</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedProperties.map((property) => (
                                <TableRow key={property.id}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedProperties.includes(property.id)}
                                            onChange={() => handleSelectProperty(property.id)}
                                            className="rounded"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                                                <img
                                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                                    alt={property.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium">{property.title}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {property.sqft} sqft • {property.location.address.substring(0, 30)}...
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono">
                                            {property.propertyCode}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={property.category === 'Residential' ? 'default' : 'secondary'}>
                                            {property.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{property.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            property.status === 'New' ? 'default' :
                                            property.status === 'For Sale' ? 'secondary' :
                                            property.status === 'Reduced' ? 'destructive' : 'outline'
                                        }>
                                            {property.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant={property.isVisible ? "default" : "outline"}
                                            onClick={() => toggleVisibility(property.id)}
                                        >
                                            {property.isVisible ? "👁️ Visible" : "🙈 Hidden"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant={property.isPublished ? "default" : "outline"}
                                            onClick={() => togglePublished(property.id)}
                                        >
                                            {property.isPublished ? "📢 Published" : "📝 Draft"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(`/properties?highlight=${property.id}`, '_blank')}
                                            className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600"
                                            title="View on website"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEditClick(property)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateProperty(property)} className="text-blue-600">
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleVisibility(property.id)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    {property.isVisible ? 'Hide' : 'Show'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    onClick={() => window.open(`/properties?highlight=${property.id}`, '_blank')}
                                                    className="text-blue-600"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    View on Website
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    onClick={() => handleDeleteClick(property)}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProperties.length)} of {filteredProperties.length} properties
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                if (pageNum > totalPages) return null;
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={currentPage === pageNum ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(pageNum)}
                                        className="w-8 h-8 p-0"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {filteredProperties.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No properties found matching your criteria.</p>
                </div>
            )}

            {/* Keep the old card layout as backup */}
            <div className="space-y-4 hidden">
                {properties.map((property) => (
                    <Card key={property.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Property Image */}
                            <div className="relative">
                                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <img 
                                        src={`https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Badge 
                                    className={`absolute top-2 left-2 ${
                                        property.status === 'New' ? 'bg-green-500' : 
                                        property.status === 'Reduced' ? 'bg-orange-500' : 
                                        property.status === 'For Sale' ? 'bg-blue-500' : 'bg-gray-500'
                                    }`}
                                >
                                    {property.status}
                                </Badge>
                            </div>

                            {/* Property Details */}
                            <div className="lg:col-span-2 space-y-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{property.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{property.propertyCode}</p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-green-600">{property.price}</span>
                                    <span className="text-sm text-gray-500">{property.sqft} sq ft</span>
                                    <Badge variant="outline">{property.propertyType}</Badge>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {property.description}
                                </p>

                                {/* Amenities */}
                                {property.amenities && property.amenities.length > 0 && (
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Amenities</p>
                                        <div className="flex flex-wrap gap-1">
                                            {property.amenities.slice(0, 4).map((amenity, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {amenity}
                                                </Badge>
                                            ))}
                                            {property.amenities.length > 4 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{property.amenities.length - 4} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Location Highlights */}
                                {property.highlights && property.highlights.length > 0 && (
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nearby Highlights</p>
                                        <div className="space-y-1">
                                            {property.highlights.slice(0, 2).map((highlight, index) => (
                                                <p key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                                    {highlight}
                                                </p>
                                            ))}
                                            {property.highlights.length > 2 && (
                                                <p className="text-xs text-gray-500">
                                                    +{property.highlights.length - 2} more locations
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <Button 
                                    onClick={() => handleEditClick(property)} 
                                    className="w-full"
                                    size="sm"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Property
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    size="sm"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                </Button>
                                
                                <Button 
                                    variant="destructive" 
                                    onClick={() => handleDeleteClick(property)}
                                    className="w-full"
                                    size="sm"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>

                                {property.youtubeUrl && (
                                    <Button 
                                        variant="outline" 
                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                                        size="sm"
                                        onClick={() => window.open(property.youtubeUrl, '_blank')}
                                    >
                                        📹 Video Tour
                                    </Button>
                                )}

                                {property.instagramUrl && (
                                    <Button 
                                        variant="outline" 
                                        className="w-full bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200"
                                        size="sm"
                                        onClick={() => window.open(property.instagramUrl, '_blank')}
                                    >
                                        📸 More Photos
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] w-[95vw] sm:w-full">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            {editingProperty ? '✏️ Edit Property' : '✨ Add New Property'}
                        </DialogTitle>
                    </DialogHeader>
                    <PropertyForm 
                        property={editingProperty} 
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!propertyToDelete} onOpenChange={(open) => !open && setPropertyToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this property?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the property
                        &quot;{propertyToDelete?.title}&quot;.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setPropertyToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
