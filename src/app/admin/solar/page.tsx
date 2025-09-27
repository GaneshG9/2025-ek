
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Phone, Mail, MapPin, DollarSign, Eye, ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

interface SolarLead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    estimatedBill: number;
    roofType: string;
    propertyType: string;
    status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
    createdAt: Date;
}

export default function AdminSolarPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<SolarLead[]>([
        {
            id: '1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            address: '123 Main St, City, State',
            estimatedBill: 250,
            roofType: 'Asphalt Shingles',
            propertyType: 'Single Family Home',
            status: 'new',
            createdAt: new Date()
        },
        {
            id: '2',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah@example.com',
            phone: '+1 (555) 987-6543',
            address: '456 Oak Ave, City, State',
            estimatedBill: 180,
            roofType: 'Metal',
            propertyType: 'Townhouse',
            status: 'contacted',
            createdAt: new Date(Date.now() - 86400000)
        }
    ]);

    const updateLeadStatus = (leadId: string, newStatus: SolarLead['status']) => {
        setLeads(prev => prev.map(lead => 
            lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="space-y-6">
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
                    <h1 className="text-3xl font-bold">Solar Leads</h1>
                    <p className="text-muted-foreground">Manage solar energy inquiries</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leads.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">New Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {leads.filter(l => l.status === 'new').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Proposals Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {leads.filter(l => l.status === 'proposal').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Closed Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {leads.filter(l => l.status === 'closed').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lead Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contact</TableHead>
                                <TableHead>Property</TableHead>
                                <TableHead>Monthly Bill</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">
                                                {lead.firstName} {lead.lastName}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                <Mail className="h-3 w-3 mr-1" />
                                                {lead.email}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Phone className="h-3 w-3 mr-1" />
                                                {lead.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="text-sm font-medium">{lead.propertyType}</div>
                                            <div className="text-sm text-muted-foreground">{lead.roofType}</div>
                                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {lead.address}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <DollarSign className="h-4 w-4 mr-1" />
                                            {formatCurrency(lead.estimatedBill)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as SolarLead['status'])}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="proposal">Proposal Sent</option>
                                            <option value="closed">Closed</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {lead.createdAt.toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Phone className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Mail className="h-4 w-4" />
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
