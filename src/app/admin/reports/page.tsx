'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BarChart3, Download, TrendingUp, Users, DollarSign, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Reports() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportData = {
    sales: {
      total: 45,
      value: 12500000,
      growth: '+15%'
    },
    leads: {
      total: 247,
      qualified: 89,
      conversion: '18%'
    },
    properties: {
      active: 156,
      sold: 23,
      pending: 12
    }
  };

  const recentTransactions = [
    { id: 'T001', property: 'Luxury Villa - Bandra', client: 'Rajesh Kumar', amount: 2500000, date: '2024-01-15', status: 'completed' },
    { id: 'T002', property: '3BHK Apartment - Andheri', client: 'Priya Sharma', amount: 1800000, date: '2024-01-14', status: 'pending' },
    { id: 'T003', property: 'Commercial Space - BKC', client: 'Amit Patel', amount: 4200000, date: '2024-01-13', status: 'completed' },
  ];

  return (
    <div className="space-y-6 p-6">
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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-3xl font-bold">₹{(reportData.sales.value / 10000000).toFixed(1)}Cr</p>
                <p className="text-sm text-green-600 font-medium">{reportData.sales.growth} from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold">{reportData.leads.total}</p>
                <p className="text-sm text-blue-600 font-medium">{reportData.leads.conversion} conversion rate</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Properties Sold</p>
                <p className="text-3xl font-bold">{reportData.properties.sold}</p>
                <p className="text-sm text-purple-600 font-medium">{reportData.properties.pending} pending</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="leads">Lead Report</TabsTrigger>
          <TabsTrigger value="properties">Property Report</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.property}</p>
                            <p className="text-sm text-muted-foreground">{transaction.client}</p>
                          </div>
                        </TableCell>
                        <TableCell>₹{(transaction.amount / 100000).toFixed(1)}L</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              transaction.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Lead Conversion Rate</span>
                  <span className="text-xl font-bold text-blue-600">18.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">Average Deal Size</span>
                  <span className="text-xl font-bold text-green-600">₹54.2L</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="font-medium">Customer Satisfaction</span>
                  <span className="text-xl font-bold text-purple-600">94%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="font-medium">Monthly Growth</span>
                  <span className="text-xl font-bold text-orange-600">+15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Detailed Sales Analytics</h3>
                <p className="text-muted-foreground mb-4">Comprehensive sales performance metrics and trends</p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Analysis Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Lead Generation Insights</h3>
                <p className="text-muted-foreground mb-4">Track lead sources, conversion rates, and qualification metrics</p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Lead Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Property Market Analysis</h3>
                <p className="text-muted-foreground mb-4">Property views, inquiries, and sales performance data</p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Property Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaign Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-lg font-semibold mb-2">Campaign Performance</h3>
                <p className="text-muted-foreground mb-4">ROI, engagement, and conversion metrics for all campaigns</p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Marketing Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}