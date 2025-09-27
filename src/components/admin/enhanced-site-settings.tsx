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
import { Badge } from "@/components/ui/badge";
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
    EyeOff,
    Bot,
    Zap,
    Database,
    Shield,
    Webhook,
    Brain,
    MessageSquare,
    BarChart3,
    Key,
    Lock,
    Workflow,
    Server,
    Cloud,
    Cpu,
    Network
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
    
    // AI Integrations
    n8nWebhookUrl: string;
    n8nApiKey: string;
    openaiApiKey: string;
    chatbotEnabled: boolean;
    autoLeadProcessing: boolean;
    smartPropertyAnalysis: boolean;
    
    // Automation Settings
    emailAutomation: boolean;
    smsNotifications: boolean;
    leadScoringEnabled: boolean;
    
    // Security Settings
    twoFactorAuth: boolean;
    apiRateLimit: number;
    corsOrigins: string;
}

export function EnhancedSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>({
        siteName: 'Real Estate & Solar CRM',
        siteDescription: 'Professional real estate, solar energy, and digital marketing solutions',
        siteKeywords: 'real estate, solar energy, digital marketing, property management',
        contactEmail: 'admin@yourwebsite.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Business Street, City, State, ZIP',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        youtubeUrl: '',
        googleAnalyticsId: '',
        googleMapsApiKey: '',
        metaTitle: 'Professional Business Solutions',
        metaDescription: 'Leading provider of real estate, solar energy, and digital marketing services',
        n8nWebhookUrl: '',
        n8nApiKey: '',
        openaiApiKey: '',
        chatbotEnabled: false,
        autoLeadProcessing: false,
        smartPropertyAnalysis: false,
        emailAutomation: true,
        smsNotifications: false,
        leadScoringEnabled: false,
        twoFactorAuth: false,
        apiRateLimit: 100,
        corsOrigins: 'https://yourwebsite.com'
    });

    const [showApiKeys, setShowApiKeys] = useState(false);

    const handleSave = () => {
        try {
            localStorage.setItem('siteSettings', JSON.stringify(settings));
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings');
        }
    };

    const handleInputChange = (field: keyof SiteSettings, value: string | boolean | number) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="ai-integrations" className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        AI & Automation
                    </TabsTrigger>
                    <TabsTrigger value="webhooks" className="flex items-center gap-2">
                        <Webhook className="h-4 w-4" />
                        Webhooks & APIs
                    </TabsTrigger>
                    <TabsTrigger value="social" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Social Media
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        SEO & Analytics
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* General Settings Tab */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Basic Site Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="siteName">Site Name *</Label>
                                    <Input
                                        id="siteName"
                                        value={settings.siteName}
                                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                                        placeholder="Your Business Name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contactEmail">Contact Email *</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={settings.contactEmail}
                                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                        placeholder="admin@yourwebsite.com"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="siteDescription">Site Description</Label>
                                <Textarea
                                    id="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                    placeholder="Describe your business and services"
                                    className="mt-1 min-h-[80px]"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="contactPhone">Contact Phone</Label>
                                    <Input
                                        id="contactPhone"
                                        value={settings.contactPhone}
                                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="siteKeywords">SEO Keywords</Label>
                                    <Input
                                        id="siteKeywords"
                                        value={settings.siteKeywords}
                                        onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                                        placeholder="keyword1, keyword2, keyword3"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="address">Business Address</Label>
                                <Textarea
                                    id="address"
                                    value={settings.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Full business address with city, state, and ZIP code"
                                    className="mt-1 min-h-[60px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Integrations Tab */}
                <TabsContent value="ai-integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="h-5 w-5" />
                                AI-Powered Automation
                                <Badge variant="outline" className="ml-2">Advanced</Badge>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Connect AI services to automate lead processing, content generation, and customer interactions.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* N8N Integration */}
                            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Workflow className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-900 dark:text-blue-300">n8n Workflow Automation</h3>
                                    <Badge variant="secondary">Recommended</Badge>
                                </div>
                                <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                                    Connect your n8n instance for advanced workflow automation, lead routing, and data processing.
                                </p>
                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="n8nWebhookUrl">n8n Webhook URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="n8nWebhookUrl"
                                                value={settings.n8nWebhookUrl}
                                                onChange={(e) => handleInputChange('n8nWebhookUrl', e.target.value)}
                                                placeholder="https://your-n8n-instance.com/webhook/..."
                                                className="mt-1 flex-1"
                                            />
                                            <Button 
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="mt-1 whitespace-nowrap"
                                                onClick={() => window.open('/admin/integrations/n8n', '_blank')}
                                            >
                                                📚 Setup Guide
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Your n8n webhook endpoint for receiving form submissions and events
                                        </p>
                                    </div>
                                    <div>
                                        <Label htmlFor="n8nApiKey">n8n API Key</Label>
                                        <div className="relative">
                                            <Input
                                                id="n8nApiKey"
                                                type={showApiKeys ? "text" : "password"}
                                                value={settings.n8nApiKey}
                                                onChange={(e) => handleInputChange('n8nApiKey', e.target.value)}
                                                placeholder="n8n_api_key_here"
                                                className="mt-1 pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-1 h-8 w-8 px-0"
                                                onClick={() => setShowApiKeys(!showApiKeys)}
                                            >
                                                {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* OpenAI Integration */}
                            <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Brain className="h-5 w-5 text-green-600" />
                                    <h3 className="font-semibold text-green-900 dark:text-green-300">OpenAI Integration</h3>
                                </div>
                                <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                                    Enable AI-powered content generation, chat support, and property analysis.
                                </p>
                                <div>
                                    <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                                    <div className="relative">
                                        <Input
                                            id="openaiApiKey"
                                            type={showApiKeys ? "text" : "password"}
                                            value={settings.openaiApiKey}
                                            onChange={(e) => handleInputChange('openaiApiKey', e.target.value)}
                                            placeholder="sk-..."
                                            className="mt-1 pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-1 h-8 w-8 px-0"
                                            onClick={() => setShowApiKeys(!showApiKeys)}
                                        >
                                            {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* AI Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-purple-600" />
                                            <span className="font-medium">AI Chatbot</span>
                                        </div>
                                        <Switch
                                            checked={settings.chatbotEnabled}
                                            onCheckedChange={(checked) => handleInputChange('chatbotEnabled', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Enable AI-powered customer chat support
                                    </p>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-600" />
                                            <span className="font-medium">Auto Lead Processing</span>
                                        </div>
                                        <Switch
                                            checked={settings.autoLeadProcessing}
                                            onCheckedChange={(checked) => handleInputChange('autoLeadProcessing', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Automatically process and categorize new leads
                                    </p>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="h-4 w-4 text-blue-600" />
                                            <span className="font-medium">Smart Analysis</span>
                                        </div>
                                        <Switch
                                            checked={settings.smartPropertyAnalysis}
                                            onCheckedChange={(checked) => handleInputChange('smartPropertyAnalysis', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        AI-powered property and market analysis
                                    </p>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Webhooks & APIs Tab */}
                <TabsContent value="webhooks" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Webhook className="h-5 w-5" />
                                External Integrations
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure external services and API integrations for your business automation.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Google Maps API */}
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="h-5 w-5 text-red-600" />
                                    <h3 className="font-semibold">Google Maps API</h3>
                                    <Badge variant={settings.googleMapsApiKey ? "default" : "secondary"}>
                                        {settings.googleMapsApiKey ? "Active" : "Not Configured"}
                                    </Badge>
                                </div>
                                <div>
                                    <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                                    <Input
                                        id="googleMapsApiKey"
                                        value={settings.googleMapsApiKey}
                                        onChange={(e) => handleInputChange('googleMapsApiKey', e.target.value)}
                                        placeholder="AIza..."
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Required for property location mapping and directions
                                    </p>
                                </div>
                            </div>

                            {/* Automation Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-green-600" />
                                            <span className="font-medium">Email Automation</span>
                                        </div>
                                        <Switch
                                            checked={settings.emailAutomation}
                                            onCheckedChange={(checked) => handleInputChange('emailAutomation', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Automated email responses and follow-ups
                                    </p>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-blue-600" />
                                            <span className="font-medium">SMS Notifications</span>
                                        </div>
                                        <Switch
                                            checked={settings.smsNotifications}
                                            onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        SMS alerts for urgent lead notifications
                                    </p>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Social Media Tab */}
                <TabsContent value="social" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Instagram className="h-5 w-5" />
                                Social Media Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                                        <Facebook className="h-4 w-4 text-blue-600" />
                                        Facebook Page
                                    </Label>
                                    <Input
                                        id="facebookUrl"
                                        value={settings.facebookUrl}
                                        onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                                        placeholder="https://facebook.com/yourpage"
                                        className="mt-1"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                                        <Instagram className="h-4 w-4 text-pink-600" />
                                        Instagram Profile
                                    </Label>
                                    <Input
                                        id="instagramUrl"
                                        value={settings.instagramUrl}
                                        onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                                        placeholder="https://instagram.com/yourprofile"
                                        className="mt-1"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                                        <Linkedin className="h-4 w-4 text-blue-700" />
                                        LinkedIn Company
                                    </Label>
                                    <Input
                                        id="linkedinUrl"
                                        value={settings.linkedinUrl}
                                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                                        placeholder="https://linkedin.com/company/yourcompany"
                                        className="mt-1"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
                                        <Youtube className="h-4 w-4 text-red-600" />
                                        YouTube Channel
                                    </Label>
                                    <Input
                                        id="youtubeUrl"
                                        value={settings.youtubeUrl}
                                        onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                                        placeholder="https://youtube.com/@yourchannel"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO & Analytics Tab */}
                <TabsContent value="seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                SEO & Analytics Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="metaTitle">Meta Title</Label>
                                <Input
                                    id="metaTitle"
                                    value={settings.metaTitle}
                                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                                    placeholder="Your Business - Professional Services"
                                    className="mt-1"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="metaDescription">Meta Description</Label>
                                <Textarea
                                    id="metaDescription"
                                    value={settings.metaDescription}
                                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                    placeholder="Brief description of your business for search engines"
                                    className="mt-1 min-h-[80px]"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                                <Input
                                    id="googleAnalyticsId"
                                    value={settings.googleAnalyticsId}
                                    onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                    className="mt-1"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-4 w-4 text-green-600" />
                                            <span className="font-medium">Two-Factor Auth</span>
                                        </div>
                                        <Switch
                                            checked={settings.twoFactorAuth}
                                            onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Enhanced security for admin accounts
                                    </p>
                                </Card>

                                <Card className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Server className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">API Rate Limit</span>
                                    </div>
                                    <Input
                                        type="number"
                                        value={settings.apiRateLimit}
                                        onChange={(e) => handleInputChange('apiRateLimit', parseInt(e.target.value))}
                                        placeholder="100"
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Requests per minute per IP
                                    </p>
                                </Card>
                            </div>
                            
                            <div>
                                <Label htmlFor="corsOrigins">CORS Origins</Label>
                                <Textarea
                                    id="corsOrigins"
                                    value={settings.corsOrigins}
                                    onChange={(e) => handleInputChange('corsOrigins', e.target.value)}
                                    placeholder="https://yourwebsite.com, https://www.yourwebsite.com"
                                    className="mt-1 min-h-[60px]"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Allowed origins for cross-origin requests (comma-separated)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Changes are saved locally. For production deployment, configure environment variables.
                    </p>
                    <Button onClick={handleSave} className="min-w-[120px]">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}