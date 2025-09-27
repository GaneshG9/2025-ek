'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Mail, Phone, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface MarketingLead {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    service: 'SEO' | 'Social Media' | 'PPC' | 'Content Marketing' | 'Web Design';
    budget: string;
    status: 'new' | 'contacted' | 'proposal' | 'closed' | 'lost';
    createdAt: string;
    notes: string;
}

export default function MarketingLeads() {
    const router = useRouter();
    const [leads] = useState<MarketingLead[]>([
        {
            id: '1',
            companyName: 'TechStart Inc.',
            contactPerson: 'Sarah Johnson',
            email: 'sarah@techstart.com',
            phone: '+1-555-0123',
            service: 'SEO',
            budget: '$5,000/month',
            status: 'new',
            createdAt: '2024-01-15',
            notes: 'Interested in local SEO for their startup'
        },
        {
            id: '2',
            companyName: 'Local Bakery',
            contactPerson: 'Mike Chen',
            email: 'mike@localbakery.com',
            phone: '+1-555-0124',
            service: 'Social Media',
            budget: '$2,000/month',
            status: 'contacted',
            createdAt: '2024-01-14',
            notes: 'Wants Instagram and Facebook management'
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'contacted': return 'bg-yellow-100 text-yellow-800';
            case 'proposal': return 'bg-purple-100 text-purple-800';
            case 'closed': return 'bg-green-100 text-green-800';
            case 'lost': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
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
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                        Digital Marketing Leads
                    </h1>
                    <p className="text-muted-foreground">Manage digital marketing inquiries and campaigns</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</div>
                        <p className="text-sm text-muted-foreground">New Leads</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-yellow-600">{leads.filter(l => l.status === 'contacted').length}</div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'closed').length}</div>
                        <p className="text-sm text-muted-foreground">Closed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">{leads.length}</div>
                        <p className="text-sm text-muted-foreground">Total Leads</p>
                    </CardContent>
                </Card>
            </div>

            {/* Leads Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Marketing Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{lead.companyName}</div>
                                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{lead.contactPerson}</div>
                                            <div className="text-sm text-muted-foreground">{lead.phone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{lead.service}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{lead.budget}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(lead.status)}>
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Phone className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}