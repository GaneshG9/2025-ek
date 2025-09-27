'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, Eye, Download, Calendar, Target, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdvancedAnalytics() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('last-30-days');

  const analyticsData = {
    overview: {
      totalRevenue: 12500000,
      revenueGrowth: 15.2,
      totalLeads: 1247,
      leadGrowth: 8.5,
      conversionRate: 18.2,
      conversionGrowth: 2.1,
      avgDealSize: 542000,
      dealSizeGrowth: -3.2
    },
    traffic: {
      totalVisitors: 45678,
      uniqueVisitors: 32145,
      pageViews: 125890,
      bounceRate: 32.5,
      avgSessionDuration: '4:32'
    },
    leads: {
      bySource: [
        { source: 'Website', count: 425, percentage: 34.1 },
        { source: 'Social Media', count: 312, percentage: 25.0 },
        { source: 'Google Ads', count: 298, percentage: 23.9 },
        { source: 'Referrals', count: 156, percentage: 12.5 },
        { source: 'Others', count: 56, percentage: 4.5 }
      ]
    },
    properties: {
      mostViewed: [
        { name: 'Luxury Villa - Bandra West', views: 1245, inquiries: 89 },
        { name: '3BHK Apartment - Andheri', views: 987, inquiries: 67 },
        { name: 'Commercial Space - BKC', views: 834, inquiries: 45 },
        { name: 'Penthouse - Juhu', views: 723, inquiries: 38 }
      ]
    }
  };

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
            <BarChart3 className="h-8 w-8 text-purple-600" />
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground">Comprehensive business intelligence and insights</p>
        </div>

        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">₹{(analyticsData.overview.totalRevenue / 10000000).toFixed(1)}Cr</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+{analyticsData.overview.revenueGrowth}%</span>
                </div>
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
                <p className="text-3xl font-bold">{analyticsData.overview.totalLeads.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">+{analyticsData.overview.leadGrowth}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold">{analyticsData.overview.conversionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">+{analyticsData.overview.conversionGrowth}%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Deal Size</p>
                <p className="text-3xl font-bold">₹{(analyticsData.overview.avgDealSize / 100000).toFixed(1)}L</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-orange-600 rotate-180" />
                  <span className="text-sm text-orange-600 font-medium">{analyticsData.overview.dealSizeGrowth}%</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Website Traffic</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="properties">Property Performance</TabsTrigger>
          <TabsTrigger value="marketing">Marketing ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-green-600" />
                    <p className="text-lg font-semibold">Revenue Analytics Chart</p>
                    <p className="text-sm text-muted-foreground">Interactive revenue visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">Total Visitors</span>
                    <span className="text-xl font-bold text-blue-600">45,678</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium">Leads Generated</span>
                    <span className="text-xl font-bold text-purple-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="font-medium">Qualified Leads</span>
                    <span className="text-xl font-bold text-orange-600">458</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Conversions</span>
                    <span className="text-xl font-bold text-green-600">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Visitors</p>
                    <p className="text-2xl font-bold text-blue-600">{analyticsData.traffic.totalVisitors.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Unique Visitors</p>
                    <p className="text-2xl font-bold text-green-600">{analyticsData.traffic.uniqueVisitors.toLocaleString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Page Views</p>
                    <p className="text-lg font-bold text-purple-600">{analyticsData.traffic.pageViews.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Bounce Rate</p>
                    <p className="text-lg font-bold text-orange-600">{analyticsData.traffic.bounceRate}%</p>
                  </div>
                  <div className="text-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Avg Session</p>
                    <p className="text-lg font-bold text-teal-600">{analyticsData.traffic.avgSessionDuration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                    <p className="font-semibold">Traffic Source Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.leads.bySource.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}></div>
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{source.percentage}%</Badge>
                      <span className="text-xl font-bold">{source.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.properties.mostViewed.map((property, index) => (
                  <div key={property.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{property.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="text-lg font-bold text-blue-600">{property.views}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Inquiries</p>
                        <p className="text-lg font-bold text-green-600">{property.inquiries}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Rate</p>
                        <p className="text-lg font-bold text-purple-600">{((property.inquiries / property.views) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Marketing ROI Analytics</h3>
                <p className="text-muted-foreground mb-4">Comprehensive campaign performance and return on investment metrics</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  View Detailed Marketing Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}