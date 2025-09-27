'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Bot, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import { EnhancedSiteSettings } from "@/components/admin/enhanced-site-settings";
import { HostingManager } from "@/components/admin/hosting-manager";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="space-y-6 p-6">
            {/* Enhanced Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push('/admin')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <Settings className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold">Advanced Settings & Integrations</h1>
                                <p className="text-muted-foreground">Configure your website, AI automation, and business integrations</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        AI Ready
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Automation
                    </Badge>
                </div>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">⚙️ General Settings</TabsTrigger>
                    <TabsTrigger value="hosting">🌐 Hosting & Deployment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                    <EnhancedSiteSettings />
                </TabsContent>
                
                <TabsContent value="hosting">
                    <HostingManager />
                </TabsContent>
            </Tabs>
        </div>
    );
}