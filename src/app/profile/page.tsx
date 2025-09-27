
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { User, Mail, Phone, Home, Heart, Eye, Handshake, BedDouble, Bath, Square } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

const savedProperties = [
    {
        id: 1,
        title: 'Sea Facing Apartment',
        price: '₹12.5 Crore',
        beds: 4,
        baths: 5,
        sqft: 3200,
        imageId: 'property1',
        status: 'For Sale',
    },
    {
        id: 3,
        title: 'Penthouse with City View',
        price: '₹6 Crore',
        beds: 2,
        baths: 2,
        sqft: 1500,
        imageId: 'property3',
        status: 'For Sale',
    },
];

const recentlyViewed = [
    {
        id: 2,
        title: 'Suburban Family Home',
        price: '₹3.75 Crore',
        beds: 3,
        baths: 2,
        sqft: 1800,
        imageId: 'property2',
        status: 'New',
    },
    {
        id: 4,
        title: 'Spacious Farmhouse',
        price: '₹4.9 Crore',
        beds: 5,
        baths: 4,
        sqft: 4500,
        imageId: 'property4',
        status: 'Reduced',
    },
];

const dealStatuses = [
    {
        id: 1,
        title: 'Sea Facing Apartment',
        status: 'Offer Accepted',
        progress: 75,
        nextStep: 'Finalize paperwork'
    }
]

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const avatarImage = PlaceHolderImages.find((p) => p.id === 'avatar1');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);


    if (loading || !user) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Header page="default" />
                <main className="flex-grow flex items-center justify-center">
                    <Spinner className="w-10 h-10" />
                </main>
                <Footer />
            </div>
        );
    }


    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header page="default" />
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader className="text-center">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                                        {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="User Avatar" data-ai-hint={avatarImage.imageHint} />}
                                        <AvatarFallback className="text-3xl">
                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-3xl">{user.firstName} {user.lastName}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-lg">
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-6 h-6 text-muted-foreground" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-6 h-6 text-muted-foreground" />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Home className="w-6 h-6 text-muted-foreground" />
                                        <span>{savedProperties.length} properties saved</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-2">
                             <Tabs defaultValue="saved">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="saved"><Heart className="w-4 h-4 mr-2"/>Saved Properties</TabsTrigger>
                                    <TabsTrigger value="viewed"><Eye className="w-4 h-4 mr-2"/>Recently Viewed</TabsTrigger>
                                    <TabsTrigger value="deals"><Handshake className="w-4 h-4 mr-2"/>Deal Status</TabsTrigger>
                                </TabsList>
                                <TabsContent value="saved" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Your Saved Properties</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {savedProperties.map(property => {
                                                const image = PlaceHolderImages.find(p => p.id === property.imageId);
                                                return (
                                                    <div key={property.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                                                        {image && <Image src={image.imageUrl} alt={property.title} width={100} height={100} className="rounded-md object-cover" />}
                                                        <div className="flex-grow">
                                                            <h3 className="font-semibold">{property.title}</h3>
                                                            <p className="text-primary font-bold">{property.price}</p>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span className="flex items-center gap-1"><BedDouble className="w-4 h-4"/> {property.beds}</span>
                                                                <span className="flex items-center gap-1"><Bath className="w-4 h-4"/> {property.baths}</span>
                                                                <span className="flex items-center gap-1"><Square className="w-4 h-4"/> {property.sqft} sqft</span>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm">View</Button>
                                                    </div>
                                                );
                                            })}
                                            {savedProperties.length === 0 && <p className="text-muted-foreground">You haven't saved any properties yet.</p>}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="viewed" className="mt-4">
                                   <Card>
                                        <CardHeader>
                                            <CardTitle>Recently Viewed Properties</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {recentlyViewed.map(property => {
                                                const image = PlaceHolderImages.find(p => p.id === property.imageId);
                                                return (
                                                    <div key={property.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                                                        {image && <Image src={image.imageUrl} alt={property.title} width={100} height={100} className="rounded-md object-cover" />}
                                                        <div className="flex-grow">
                                                            <h3 className="font-semibold">{property.title}</h3>
                                                            <p className="text-primary font-bold">{property.price}</p>
                                                        </div>
                                                        <Button variant="outline" size="sm">View</Button>
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="deals" className="mt-4">
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Your Active Deals</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {dealStatuses.map(deal => (
                                                <div key={deal.id}>
                                                    <h3 className="font-semibold">{deal.title}</h3>
                                                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                                                        <span>{deal.status}</span>
                                                        <span>Next: {deal.nextStep}</span>
                                                    </div>
                                                    <div className="w-full bg-muted rounded-full h-2.5">
                                                        <div className="bg-primary h-2.5 rounded-full" style={{width: `${deal.progress}%`}}></div>
                                                    </div>
                                                </div>
                                            ))}
                                            {dealStatuses.length === 0 && <p className="text-muted-foreground">You have no active deals.</p>}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
