'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
    Save, 
    Settings, 
    Globe, 
    Palette, 
    Mail, 
    Phone, 
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Upload,
    Eye,
    EyeOff
} from "lucide-react";
import toast from 'react-hot-toast';

interface SiteSettings {
    // General Settings
    siteName: string;
    siteDescription: string;
    siteKeywords: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    
    // Social Media
    facebookUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    youtubeUrl: string;
    
    // SEO Settings
    googleAnalyticsId: string;
    googleMapsApiKey: string;
    metaTitle: string;
    metaDescription: string;
    
    // Theme Settings
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
    
    // Features
    enableContactForm: boolean;
    enableNewsletter: boolean;
    enableBlog: boolean;
    enableTestimonials: boolean;
    maintenanceMode: boolean;
}

export function SiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>({
        siteName: 'Your Business Website',
        siteDescription: 'Real Estate, Solar Solutions & Digital Marketing Services',
        siteKeywords: 'real estate, solar, digital marketing, properties, renewable energy',
        contactEmail: 'info@yourbusiness.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Business St, City, State 12345',
        
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        youtubeUrl: '',
        
        googleAnalyticsId: '',
        googleMapsApiKey: '',
        metaTitle: 'Your Business - Real Estate, Solar & Digital Marketing',
        metaDescription: 'Leading provider of real estate services, solar solutions, and digital marketing strategies.',
        
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        logoUrl: '/logo-light.png',
        faviconUrl: '/favicon.ico',
        
        enableContactForm: true,
        enableNewsletter: true,
        enableBlog: false,
        enableTestimonials: true,
        maintenanceMode: false
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);

    const updateSetting = (key: keyof SiteSettings, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
        setHasChanges(true);
    };

    const handleSave = () => {
        // Here you would typically save to your database/API
        console.log('Saving settings:', settings);
        setHasChanges(false);
        toast.success('Settings saved successfully!');
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all settings to default values?')) {
            // Reset to default values
            setSettings({
                siteName: 'Your Business Website',
                siteDescription: 'Real Estate, Solar Solutions & Digital Marketing Services',
                siteKeywords: 'real estate, solar, digital marketing, properties, renewable energy',
                contactEmail: 'info@yourbusiness.com',
                contactPhone: '+1 (555) 123-4567',
                address: '123 Business St, City, State 12345',
                
                facebookUrl: '',
                twitterUrl: '',
                instagramUrl: '',
                linkedinUrl: '',
                youtubeUrl: '',
                
                googleAnalyticsId: '',
                googleMapsApiKey: '',
                metaTitle: 'Your Business - Real Estate, Solar & Digital Marketing',
                metaDescription: 'Leading provider of real estate services, solar solutions, and digital marketing strategies.',
                
                primaryColor: '#3B82F6',
                secondaryColor: '#10B981',
                logoUrl: '/logo-light.png',
                faviconUrl: '/favicon.ico',
                
                enableContactForm: true,
                enableNewsletter: true,
                enableBlog: false,
                enableTestimonials: true,
                maintenanceMode: false
            });
            setHasChanges(true);
            toast.success('Settings reset to default values');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Site Settings</h2>
                    <p className="text-muted-foreground">Configure your website settings and preferences</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset}>
                        Reset to Default
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        disabled={!hasChanges}
                        className={hasChanges ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {hasChanges ? 'Save Changes' : 'Saved'}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        SEO
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Design
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                    </TabsTrigger>
                    <TabsTrigger value="features" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Features
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="siteName">Site Name</Label>
                                <Input
                                    id="siteName"
                                    value={settings.siteName}
                                    onChange={(e) => updateSetting('siteName', e.target.value)}
                                    placeholder="Your Business Name"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="siteDescription">Site Description</Label>
                                <Textarea
                                    id="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={(e) => updateSetting('siteDescription', e.target.value)}
                                    placeholder="Brief description of your business"
                                    rows={3}
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="siteKeywords">Keywords</Label>
                                <Input
                                    id="siteKeywords"
                                    value={settings.siteKeywords}
                                    onChange={(e) => updateSetting('siteKeywords', e.target.value)}
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Comma-separated list of relevant keywords
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Mode</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={settings.maintenanceMode}
                                    onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                                />
                                <div>
                                    <Label>Enable Maintenance Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        When enabled, visitors will see a maintenance page
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO Settings */}
                <TabsContent value="seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Engine Optimization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="metaTitle">Meta Title</Label>
                                <Input
                                    id="metaTitle"
                                    value={settings.metaTitle}
                                    onChange={(e) => updateSetting('metaTitle', e.target.value)}
                                    placeholder="Page title for search engines"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="metaDescription">Meta Description</Label>
                                <Textarea
                                    id="metaDescription"
                                    value={settings.metaDescription}
                                    onChange={(e) => updateSetting('metaDescription', e.target.value)}
                                    placeholder="Description for search engines"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics & APIs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                                <Input
                                    id="googleAnalyticsId"
                                    value={settings.googleAnalyticsId}
                                    onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                                    placeholder="GA4-XXXXXXXXX"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                                <div className="relative">
                                    <Input
                                        id="googleMapsApiKey"
                                        type={showApiKey ? "text" : "password"}
                                        value={settings.googleMapsApiKey}
                                        onChange={(e) => updateSetting('googleMapsApiKey', e.target.value)}
                                        placeholder="Your Google Maps API Key"
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-2 top-0 h-full px-2"
                                        onClick={() => setShowApiKey(!showApiKey)}
                                    >
                                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Required for map functionality in property listings
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Design Settings */}
                <TabsContent value="design" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Colors</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="primaryColor">Primary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="primaryColor"
                                            type="color"
                                            value={settings.primaryColor}
                                            onChange={(e) => updateSetting('primaryColor', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={settings.primaryColor}
                                            onChange={(e) => updateSetting('primaryColor', e.target.value)}
                                            placeholder="#3B82F6"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="secondaryColor"
                                            type="color"
                                            value={settings.secondaryColor}
                                            onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={settings.secondaryColor}
                                            onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                                            placeholder="#10B981"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Logo & Assets</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="logoUrl">Logo URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="logoUrl"
                                        value={settings.logoUrl}
                                        onChange={(e) => updateSetting('logoUrl', e.target.value)}
                                        placeholder="/logo.png"
                                    />
                                    <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="faviconUrl">Favicon URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="faviconUrl"
                                        value={settings.faviconUrl}
                                        onChange={(e) => updateSetting('faviconUrl', e.target.value)}
                                        placeholder="/favicon.ico"
                                    />
                                    <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Contact Settings */}
                <TabsContent value="contact" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="contactEmail">Email Address</Label>
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => updateSetting('contactEmail', e.target.value)}
                                    placeholder="contact@yourbusiness.com"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="contactPhone">Phone Number</Label>
                                <Input
                                    id="contactPhone"
                                    value={settings.contactPhone}
                                    onChange={(e) => updateSetting('contactPhone', e.target.value)}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="address">Business Address</Label>
                                <Textarea
                                    id="address"
                                    value={settings.address}
                                    onChange={(e) => updateSetting('address', e.target.value)}
                                    placeholder="123 Business St, City, State 12345"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-2">
                                    <Facebook className="h-4 w-4 text-blue-600" />
                                    <Input
                                        value={settings.facebookUrl}
                                        onChange={(e) => updateSetting('facebookUrl', e.target.value)}
                                        placeholder="https://facebook.com/yourbusiness"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Twitter className="h-4 w-4 text-blue-400" />
                                    <Input
                                        value={settings.twitterUrl}
                                        onChange={(e) => updateSetting('twitterUrl', e.target.value)}
                                        placeholder="https://twitter.com/yourbusiness"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Instagram className="h-4 w-4 text-pink-600" />
                                    <Input
                                        value={settings.instagramUrl}
                                        onChange={(e) => updateSetting('instagramUrl', e.target.value)}
                                        placeholder="https://instagram.com/yourbusiness"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-blue-700" />
                                    <Input
                                        value={settings.linkedinUrl}
                                        onChange={(e) => updateSetting('linkedinUrl', e.target.value)}
                                        placeholder="https://linkedin.com/company/yourbusiness"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Youtube className="h-4 w-4 text-red-600" />
                                    <Input
                                        value={settings.youtubeUrl}
                                        onChange={(e) => updateSetting('youtubeUrl', e.target.value)}
                                        placeholder="https://youtube.com/@yourbusiness"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Features Settings */}
                <TabsContent value="features" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Features</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Contact Form</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Enable contact forms on your website
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.enableContactForm}
                                        onCheckedChange={(checked) => updateSetting('enableContactForm', checked)}
                                    />
                                </div>
                                
                                <Separator />
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Newsletter Signup</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Allow visitors to subscribe to newsletter
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.enableNewsletter}
                                        onCheckedChange={(checked) => updateSetting('enableNewsletter', checked)}
                                    />
                                </div>
                                
                                <Separator />
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Blog Section</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Enable blog functionality
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.enableBlog}
                                        onCheckedChange={(checked) => updateSetting('enableBlog', checked)}
                                    />
                                </div>
                                
                                <Separator />
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Customer Testimonials</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Display customer testimonials
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.enableTestimonials}
                                        onCheckedChange={(checked) => updateSetting('enableTestimonials', checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}