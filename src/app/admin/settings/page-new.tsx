'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { SiteSettings } from "@/components/admin/site-settings";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
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
                    <h1 className="text-3xl font-bold">Website Settings</h1>
                    <p className="text-muted-foreground">Configure your website settings and preferences</p>
                </div>
            </div>

            {/* Site Settings Component */}
            <SiteSettings />
        </div>
    );
}