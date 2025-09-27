'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Workflow, Copy, ExternalLink, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function N8nIntegrationPage() {
    const router = useRouter();
    const [copiedStep, setCopiedStep] = useState<number | null>(null);

    const copyToClipboard = (text: string, stepNumber: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStep(stepNumber);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopiedStep(null), 2000);
        });
    };

    const workflowSteps = [
        {
            title: "Contact Form Lead Capture",
            description: "Automatically process contact form submissions",
            webhook: "POST /webhook/contact-form",
            samplePayload: `{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Interested in property listings",
  "source": "website",
  "timestamp": "2025-09-27T10:00:00Z"
}`
        },
        {
            title: "Solar Lead Processing",
            description: "Process solar energy inquiries with qualification scoring",
            webhook: "POST /webhook/solar-lead",
            samplePayload: `{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "address": "123 Solar Street, City, State",
  "electricBill": 250,
  "homeOwner": true,
  "roofType": "Asphalt Shingles",
  "timestamp": "2025-09-27T10:00:00Z"
}`
        },
        {
            title: "Property Inquiry Automation",
            description: "Handle property viewing requests and schedule appointments",
            webhook: "POST /webhook/property-inquiry",
            samplePayload: `{
  "propertyId": "PROP001",
  "inquirerName": "Mike Johnson",
  "email": "mike@example.com",
  "phone": "+1234567890",
  "preferredViewingDate": "2025-10-01",
  "message": "Want to schedule a viewing",
  "timestamp": "2025-09-27T10:00:00Z"
}`
        }
    ];

    return (
        <div className="space-y-6 p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    onClick={() => router.push('/admin/settings')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Settings
                </Button>
                
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <Workflow className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold">n8n Integration Guide</h1>
                            <p className="text-muted-foreground">Set up automated workflows for lead processing and business automation</p>
                        </div>
                    </div>
                </div>
                
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                    Advanced Automation
                </Badge>
            </div>

            {/* Quick Setup Guide */}
            <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        Quick Setup Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                                <h3 className="font-semibold">Install n8n</h3>
                                <p className="text-sm text-muted-foreground">Set up your n8n instance locally or in the cloud</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <h3 className="font-semibold">Create Webhooks</h3>
                                <p className="text-sm text-muted-foreground">Set up webhook endpoints for each business process</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <h3 className="font-semibold">Configure Website</h3>
                                <p className="text-sm text-muted-foreground">Update webhook URLs in admin settings</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Workflow Templates */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Workflow Templates</h2>
                    <Button variant="outline" asChild>
                        <a href="https://n8n.io/workflows/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Browse n8n Community
                        </a>
                    </Button>
                </div>

                {workflowSteps.map((step, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <CardTitle>{step.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">{step.webhook}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">Sample Webhook Payload</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(step.samplePayload, index)}
                                        className="flex items-center gap-2"
                                    >
                                        {copiedStep === index ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                        {copiedStep === index ? 'Copied!' : 'Copy'}
                                    </Button>
                                </div>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto border">
                                    <code>{step.samplePayload}</code>
                                </pre>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Automatic validation</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Email notifications</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>CRM integration</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Implementation Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        Step-by-Step Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-3">🚀 Getting Started</h3>
                            <ol className="space-y-2 text-sm list-decimal list-inside">
                                <li>Install n8n: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm install n8n -g</code></li>
                                <li>Start n8n: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">n8n start</code></li>
                                <li>Access n8n interface at <code>http://localhost:5678</code></li>
                                <li>Create new workflows using the templates above</li>
                                <li>Configure webhook URLs in each workflow</li>
                                <li>Test webhooks with sample payloads</li>
                            </ol>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-3">🔧 Advanced Configuration</h3>
                            <ul className="space-y-2 text-sm list-disc list-inside">
                                <li>Set up environment variables for API keys</li>
                                <li>Configure database connections for data storage</li>
                                <li>Add email service integration (SendGrid, SMTP)</li>
                                <li>Set up Slack/Discord notifications</li>
                                <li>Configure Google Sheets for lead tracking</li>
                                <li>Add calendar integration for appointments</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Production Deployment</h4>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                    For production use, deploy n8n on a server with HTTPS enabled. Update the webhook URLs in your admin settings 
                                    to point to your production n8n instance. Consider using Docker for easier deployment and scaling.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
                <Button variant="outline" onClick={() => router.push('/admin/settings')}>
                    ⚙️ Configure Settings
                </Button>
                <Button asChild>
                    <a href="https://docs.n8n.io" target="_blank" rel="noopener noreferrer">
                        📚 n8n Documentation
                    </a>
                </Button>
            </div>
        </div>
    );
}