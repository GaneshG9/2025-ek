'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  Newspaper, 
  Phone, 
  Sun, 
  TrendingUp,
  Eye,
  BarChart3,
  Settings,
  Plus,
  Building,
  Zap,
  Target
} from 'lucide-react';
import { PropertyService, UserService, ContactFormService, SolarLeadService, DigitalMarketingLeadService, PageContentService } from '@/lib/local-services';
import { Property, User, ContactForm, SolarLead, DigitalMarketingLead, PageContent } from '@/types/database';
import { initializeDefaultContent } from '@/lib/init-data';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  totalUsers: number;
  newContacts: number;
  solarLeads: number;
  marketingLeads: number;
  totalPages: number;
  activePages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
    newContacts: 0,
    solarLeads: 0,
    marketingLeads: 0,
    totalPages: 0,
    activePages: 0,
  });
  
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

    const initializeData = async () => {
        try {
            setLoading(true);
            const success = await initializeDefaultContent();
            if (success) {
                toast.success('Default content initialized successfully!');
                loadDashboardData();
            } else {
                toast.error('Failed to initialize default content');
            }
        } catch (error) {
            console.error('Error initializing data:', error);
            toast.error('Error initializing default content');
        } finally {
            setLoading(false);
        }
    };

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Load all data in parallel (with fallback for demo)
            const [
                properties,
                users,
                contacts,
                solarLeads,
                marketingLeads,
                pages
            ] = await Promise.all([
                PropertyService.getAllProperties().catch(() => []),
                UserService.getAllUsers().catch(() => []),
                ContactFormService.getAllContactForms().catch(() => []),
                SolarLeadService.getAllLeads().catch(() => []),
                DigitalMarketingLeadService.getAllLeads().catch(() => []),
                PageContentService.getAllPageContent().catch(() => [])
            ]);      // Calculate stats
      setStats({
        totalProperties: properties.length,
        activeProperties: properties.filter(p => p.status === 'active').length,
        totalUsers: users.length,
        newContacts: contacts.filter(c => c.status === 'new').length,
        solarLeads: solarLeads.length,
        marketingLeads: marketingLeads.length,
        totalPages: pages.length,
        activePages: pages.filter(p => p.isActive).length,
      });

      // Prepare recent activities (last 10 items)
      const activities = [
        ...contacts.slice(0, 3).map(c => ({
          type: 'contact',
          title: `New contact from ${c.name}`,
          time: c.createdAt,
          status: c.status
        })),
        ...solarLeads.slice(0, 2).map(l => ({
          type: 'solar',
          title: `Solar inquiry from ${l.firstName} ${l.lastName}`,
          time: l.createdAt,
          status: l.status
        })),
        ...marketingLeads.slice(0, 2).map(l => ({
          type: 'marketing',
          title: `Marketing inquiry from ${l.companyName}`,
          time: l.createdAt,
          status: l.status
        })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

      setRecentActivities(activities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto bg-background text-foreground transition-colors">
            {/* Enhanced Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                        CRM Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Real Estate • Solar Energy • Digital Marketing Management Hub
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-muted-foreground">System Online</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Last Updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button onClick={initializeData} variant="outline" size="lg" className="bg-card hover:bg-accent">
                        <Plus className="h-4 w-4 mr-2" />
                        Initialize Demo Data
                    </Button>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/" target="_blank">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Website
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Main Business Sections - CRM Modules */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* 1. Real Estate CRM Section */}
                <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 bg-card">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 dark:bg-blue-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300">1. Real Estate CRM</CardTitle>
                                    <p className="text-sm text-muted-foreground">Property & Lead Management</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalProperties}</div>
                                <p className="text-xs text-muted-foreground">Properties</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border dark:border-green-800">
                                <div className="font-semibold text-green-700 dark:text-green-400">{stats.activeProperties}</div>
                                <div className="text-xs text-green-600 dark:text-green-500">Active Listings</div>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border dark:border-orange-800">
                                <div className="font-semibold text-orange-700 dark:text-orange-400">{stats.totalProperties - stats.activeProperties}</div>
                                <div className="text-xs text-orange-600 dark:text-orange-500">Hot Leads</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                                <Link href="/admin/properties">
                                    <Home className="h-4 w-4 mr-2" />
                                    Property CRM
                                </Link>
                            </Button>
                            <div className="grid grid-cols-2 gap-2">
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/leads">View Leads</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/reports">Reports</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Solar Energy CRM Section */}
                <Card className="relative overflow-hidden border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 bg-card">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 dark:bg-yellow-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                    <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-yellow-700 dark:text-yellow-300">2. Solar Energy CRM</CardTitle>
                                    <p className="text-sm text-muted-foreground">Renewable Energy Solutions</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.solarLeads}</div>
                                <p className="text-xs text-muted-foreground">Active Leads</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border dark:border-green-800">
                                <div className="font-semibold text-green-700 dark:text-green-400">{Math.floor(stats.solarLeads * 0.7)}</div>
                                <div className="text-xs text-green-600 dark:text-green-500">Qualified</div>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border dark:border-blue-800">
                                <div className="font-semibold text-blue-700 dark:text-blue-400">{Math.floor(stats.solarLeads * 0.3)}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">Consultations</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600">
                                <Link href="/admin/solar">
                                    <Sun className="h-4 w-4 mr-2" />
                                    Solar Lead CRM
                                </Link>
                            </Button>
                            <div className="grid grid-cols-2 gap-2">
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/solar/calculator">Solar Calculator</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/solar/installations">Installations</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Digital Marketing CRM Section */}
                <Card className="relative overflow-hidden border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 bg-card">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500 dark:bg-purple-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-purple-700 dark:text-purple-300">3. Digital Marketing CRM</CardTitle>
                                    <p className="text-sm text-muted-foreground">Growth & Analytics Hub</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.marketingLeads}</div>
                                <p className="text-xs text-muted-foreground">Active Campaigns</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border dark:border-green-800">
                                <div className="font-semibold text-green-700 dark:text-green-400">{Math.floor(stats.marketingLeads * 0.8)}</div>
                                <div className="text-xs text-green-600 dark:text-green-500">Running</div>
                            </div>
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border dark:border-yellow-800">
                                <div className="font-semibold text-yellow-700 dark:text-yellow-400">{Math.floor(stats.marketingLeads * 0.2)}</div>
                                <div className="text-xs text-yellow-600 dark:text-yellow-500">Planning</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                                <Link href="/admin/digital-marketing">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Marketing CRM
                                </Link>
                            </Button>
                            <div className="grid grid-cols-2 gap-2">
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/analytics">Analytics</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="text-xs">
                                    <Link href="/admin/campaigns">Campaigns</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>            {/* Enhanced Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Users</CardTitle>
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.totalUsers}</div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                            Registered members
                        </p>
                        <Button asChild size="sm" variant="ghost" className="w-full mt-2 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30">
                            <Link href="/admin/users">Manage Users</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">New Contacts</CardTitle>
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.newContacts}</div>
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                            Unread messages
                        </p>
                        <Button asChild size="sm" variant="ghost" className="w-full mt-2 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30">
                            <Link href="/admin/contacts">View Messages</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">Page Content</CardTitle>
                        <Newspaper className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.totalPages}</div>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
                            {stats.activePages} active pages
                        </p>
                        <Button asChild size="sm" variant="ghost" className="w-full mt-2 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/30">
                            <Link href="/admin/pages">Edit Pages</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Analytics</CardTitle>
                        <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                            {stats.totalProperties + stats.solarLeads + stats.marketingLeads}
                        </div>
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
                            Total interactions
                        </p>
                        <Button asChild size="sm" variant="ghost" className="w-full mt-2 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/30">
                            <Link href="/admin/analytics">View Analytics</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Website Management */}
                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center text-slate-700 dark:text-slate-300">
                            <Settings className="h-5 w-5 mr-2" />
                            Website Control
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/admin/settings">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Site Settings
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/admin/pages">
                                    <Newspaper className="h-4 w-4 mr-2" />
                                    Content Manager
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/admin/media">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Media Library
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Business Analytics */}
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                        <CardTitle className="flex items-center text-indigo-700 dark:text-indigo-300">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Business Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                    {Math.floor((stats.solarLeads + stats.marketingLeads) * 0.15)}
                                </div>
                                <div className="text-xs text-indigo-500 dark:text-indigo-400">Conversions</div>
                            </div>
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                    {Math.floor((stats.totalProperties + stats.totalUsers) * 0.25)}
                                </div>
                                <div className="text-xs text-indigo-500 dark:text-indigo-400">Growth %</div>
                            </div>
                        </div>
                        <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
                            <Link href="/admin/analytics">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                View Reports
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Communication Hub */}
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
                    <CardHeader>
                        <CardTitle className="flex items-center text-emerald-700 dark:text-emerald-300">
                            <Phone className="h-5 w-5 mr-2" />
                            Communication
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.newContacts}</div>
                            <div className="text-sm text-emerald-600 dark:text-emerald-400">Active Inquiries</div>
                        </div>
                        <div className="space-y-2">
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href="/admin/contacts">View All Messages</Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href="/admin/notifications">Notifications</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'contact' && <Phone className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'solar' && <Sun className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'marketing' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.status === 'new' ? 'default' : 'secondary'}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activities</p>
            )}
          </div>
        </CardContent>
      </Card>

            {/* Enhanced Quick Actions */}
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">Quick Access Hub</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Essential tools and shortcuts for efficient management</p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                            <Link href="/admin/properties">
                                <Home className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium">Properties</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Real Estate</span>
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all">
                            <Link href="/admin/solar">
                                <Sun className="h-8 w-8 mb-2 text-yellow-600 dark:text-yellow-400" />
                                <span className="font-medium">Solar</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Energy Leads</span>
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                            <Link href="/admin/marketing">
                                <TrendingUp className="h-8 w-8 mb-2 text-purple-600 dark:text-purple-400" />
                                <span className="font-medium">Marketing</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Digital Campaigns</span>
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 transition-all">
                            <Link href="/admin/users">
                                <Users className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
                                <span className="font-medium">Users</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Management</span>
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-700 transition-all">
                            <Link href="/admin/pages">
                                <Newspaper className="h-8 w-8 mb-2 text-orange-600 dark:text-orange-400" />
                                <span className="font-medium">Content</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Page Editor</span>
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="h-24 flex-col hover:bg-slate-50 dark:hover:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                            <Link href="/admin/settings">
                                <Settings className="h-8 w-8 mb-2 text-slate-600 dark:text-slate-400" />
                                <span className="font-medium">Settings</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Configuration</span>
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Additional Actions Row */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <Link href="/admin/tools/database-backup">Database Backup</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                                <Link href="/admin/tools/system-logs">System Logs</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                <Link href="/admin/tools/advanced-analytics">Advanced Analytics</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">
                                <Link href="/admin/tools/help-support">Help & Support</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                                <Link href="/admin/communications">Communications</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <Link href="/admin/tools/media-library">Media Library</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
    </div>
  );
}