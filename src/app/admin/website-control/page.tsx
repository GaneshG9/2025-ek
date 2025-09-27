'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Globe, Zap, Shield, Rocket, Monitor, Code, Database, Cloud, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface WebsiteConfig {
  maintenance: boolean;
  caching: boolean;
  compression: boolean;
  ssl: boolean;
  cdn: boolean;
  analytics: boolean;
  seo: {
    enabled: boolean;
    title: string;
    description: string;
    keywords: string;
  };
  performance: {
    lazyLoading: boolean;
    imageOptimization: boolean;
    minification: boolean;
  };
}

interface SecurityConfig {
  firewall: boolean;
  ddosProtection: boolean;
  sqlInjectionProtection: boolean;
  xssProtection: boolean;
  rateLimit: boolean;
  twoFactorAuth: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  pageSize: number;
  requests: number;
  cacheHitRate: number;
  uptime: number;
}

export default function WebsiteControl() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig>({
    maintenance: false,
    caching: true,
    compression: true,
    ssl: true,
    cdn: true,
    analytics: true,
    seo: {
      enabled: true,
      title: 'Premium Real Estate & Solar Solutions',
      description: 'Find your dream property and sustainable solar solutions with our comprehensive real estate platform.',
      keywords: 'real estate, properties, solar energy, Mumbai, apartments, villas'
    },
    performance: {
      lazyLoading: true,
      imageOptimization: true,
      minification: true
    }
  });

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    firewall: true,
    ddosProtection: true,
    sqlInjectionProtection: true,
    xssProtection: true,
    rateLimit: true,
    twoFactorAuth: false
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    loadTime: 1.2,
    pageSize: 2.8,
    requests: 47,
    cacheHitRate: 89,
    uptime: 99.8
  });

  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 234,
    pageViews: 1847,
    newLeads: 12,
    serverLoad: 34,
    bandwidthUsage: 67
  });

  const optimizeWebsite = async () => {
    setIsOptimizing(true);
    toast.loading('Optimizing website performance...');
    
    try {
      // Simulate optimization process
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Update performance metrics
      setPerformanceMetrics(prev => ({
        ...prev,
        loadTime: Math.max(0.8, prev.loadTime - 0.3),
        pageSize: Math.max(1.5, prev.pageSize - 0.5),
        requests: Math.max(30, prev.requests - 10),
        cacheHitRate: Math.min(95, prev.cacheHitRate + 5)
      }));
      
      toast.dismiss();
      toast.success('Website optimized successfully! Performance improved by 25%');
    } catch (error) {
      toast.dismiss();
      toast.error('Optimization failed');
    } finally {
      setIsOptimizing(false);
    }
  };

  const toggleMaintenance = () => {
    setWebsiteConfig(prev => ({ ...prev, maintenance: !prev.maintenance }));
    toast.success(websiteConfig.maintenance ? 'Maintenance mode disabled' : 'Maintenance mode enabled');
  };

  const deployChanges = async () => {
    toast.loading('Deploying changes to production...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success('Changes deployed successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Deployment failed');
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pageViews: prev.pageViews + Math.floor(Math.random() * 20),
        newLeads: prev.newLeads + (Math.random() > 0.8 ? 1 : 0),
        serverLoad: Math.max(10, Math.min(90, prev.serverLoad + Math.floor(Math.random() * 10) - 5)),
        bandwidthUsage: Math.max(20, Math.min(95, prev.bandwidthUsage + Math.floor(Math.random() * 8) - 4))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            <Globe className="h-8 w-8 text-blue-600" />
            Website Control Center
          </h1>
          <p className="text-muted-foreground">Complete website management and optimization platform</p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={optimizeWebsite}
            disabled={isOptimizing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isOptimizing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4 mr-2" />
                Auto Optimize
              </>
            )}
          </Button>
          
          <Button 
            variant={websiteConfig.maintenance ? "destructive" : "outline"}
            onClick={toggleMaintenance}
          >
            <Settings className="h-4 w-4 mr-2" />
            {websiteConfig.maintenance ? 'Exit Maintenance' : 'Maintenance Mode'}
          </Button>
        </div>
      </div>

      {websiteConfig.maintenance && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800 dark:text-orange-400">
              <Settings className="h-5 w-5" />
              <span className="font-semibold">Maintenance Mode Active</span>
              <Badge className="bg-orange-200 text-orange-800">Live</Badge>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              Website is in maintenance mode. Visitors will see a maintenance page.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{realTimeStats.activeUsers}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeStats.pageViews.toLocaleString()}</p>
              </div>
              <Monitor className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold text-purple-600">{realTimeStats.newLeads}</p>
              </div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Server Load</p>
                <p className="text-2xl font-bold text-orange-600">{realTimeStats.serverLoad}%</p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bandwidth</p>
                <p className="text-2xl font-bold text-red-600">{realTimeStats.bandwidthUsage}%</p>
              </div>
              <Cloud className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="seo">SEO Control</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-2xl font-bold text-green-600">{performanceMetrics.uptime}%</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Load Time</p>
                    <p className="text-2xl font-bold text-blue-600">{performanceMetrics.loadTime}s</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>SSL Certificate</span>
                    <Badge className={websiteConfig.ssl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {websiteConfig.ssl ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CDN Status</span>
                    <Badge className={websiteConfig.cdn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {websiteConfig.cdn ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Caching</span>
                    <Badge className={websiteConfig.caching ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {websiteConfig.caching ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compression</span>
                    <Badge className={websiteConfig.compression ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {websiteConfig.compression ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { key: 'caching', label: 'Enable Caching', description: 'Improve load times with intelligent caching' },
                    { key: 'compression', label: 'GZIP Compression', description: 'Reduce file sizes for faster loading' },
                    { key: 'cdn', label: 'CDN Distribution', description: 'Global content delivery network' },
                    { key: 'analytics', label: 'Analytics Tracking', description: 'Track visitor behavior and conversions' }
                  ].map((control) => (
                    <div key={control.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{control.label}</p>
                        <p className="text-sm text-muted-foreground">{control.description}</p>
                      </div>
                      <Switch
                        checked={websiteConfig[control.key as keyof WebsiteConfig] as boolean}
                        onCheckedChange={(checked) => setWebsiteConfig(prev => ({ ...prev, [control.key]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Page Load Time</span>
                      <span className="text-sm text-muted-foreground">{performanceMetrics.loadTime}s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.max(20, 100 - (performanceMetrics.loadTime * 25))}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Cache Hit Rate</span>
                      <span className="text-sm text-muted-foreground">{performanceMetrics.cacheHitRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${performanceMetrics.cacheHitRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Requests</span>
                      <span className="text-sm text-muted-foreground">{performanceMetrics.requests}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (performanceMetrics.requests / 100) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Page Size</span>
                      <span className="text-sm text-muted-foreground">{performanceMetrics.pageSize}MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (performanceMetrics.pageSize / 5) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { key: 'lazyLoading', label: 'Lazy Loading', description: 'Load images as users scroll' },
                    { key: 'imageOptimization', label: 'Image Optimization', description: 'Automatic image compression and format conversion' },
                    { key: 'minification', label: 'Code Minification', description: 'Compress CSS, JS, and HTML files' }
                  ].map((optimization) => (
                    <div key={optimization.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{optimization.label}</p>
                        <p className="text-sm text-muted-foreground">{optimization.description}</p>
                      </div>
                      <Switch
                        checked={websiteConfig.performance[optimization.key as keyof typeof websiteConfig.performance]}
                        onCheckedChange={(checked) => setWebsiteConfig(prev => ({
                          ...prev,
                          performance: { ...prev.performance, [optimization.key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={optimizeWebsite} disabled={isOptimizing} className="w-full bg-green-600 hover:bg-green-700">
                    <Rocket className="h-4 w-4 mr-2" />
                    {isOptimizing ? 'Optimizing...' : 'Run Performance Optimization'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(securityConfig).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                        <p className="text-sm text-muted-foreground">
                          {key === 'firewall' && 'Block malicious traffic and attacks'}
                          {key === 'ddosProtection' && 'Prevent distributed denial of service attacks'}
                          {key === 'sqlInjectionProtection' && 'Guard against SQL injection attempts'}
                          {key === 'xssProtection' && 'Prevent cross-site scripting attacks'}
                          {key === 'rateLimit' && 'Limit requests per IP address'}
                          {key === 'twoFactorAuth' && 'Require 2FA for admin access'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, [key]: checked }))}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">Security Score</h4>
                    <div className="text-3xl font-bold text-red-600">87%</div>
                    <p className="text-sm text-red-700 dark:text-red-300">Good security posture</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Recent Security Events</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                        <p className="font-medium text-red-600">Blocked: 23 malicious IPs</p>
                        <p className="text-muted-foreground">2 minutes ago</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                        <p className="font-medium text-yellow-600">Rate limit triggered: 45.123.67.89</p>
                        <p className="text-muted-foreground">15 minutes ago</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                        <p className="font-medium text-green-600">SSL certificate renewed</p>
                        <p className="text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SEO Optimization</p>
                  <p className="text-sm text-muted-foreground">Automatic meta tag optimization and sitemap generation</p>
                </div>
                <Switch
                  checked={websiteConfig.seo.enabled}
                  onCheckedChange={(enabled) => setWebsiteConfig(prev => ({
                    ...prev,
                    seo: { ...prev.seo, enabled }
                  }))}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Title</label>
                  <Input
                    value={websiteConfig.seo.title}
                    onChange={(e) => setWebsiteConfig(prev => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value }
                    }))}
                    placeholder="Your website title..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Meta Description</label>
                  <Textarea
                    value={websiteConfig.seo.description}
                    onChange={(e) => setWebsiteConfig(prev => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value }
                    }))}
                    placeholder="Brief description of your website..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Keywords</label>
                  <Textarea
                    value={websiteConfig.seo.keywords}
                    onChange={(e) => setWebsiteConfig(prev => ({
                      ...prev,
                      seo: { ...prev.seo, keywords: e.target.value }
                    }))}
                    placeholder="Comma-separated keywords..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">SEO Score</p>
                  <p className="text-2xl font-bold text-green-600">92/100</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Indexed Pages</p>
                  <p className="text-2xl font-bold text-blue-600">47</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Organic Traffic</p>
                  <p className="text-2xl font-bold text-purple-600">+23%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Deploy Actions</h3>
                  <div className="space-y-2">
                    <Button onClick={deployChanges} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy All Changes
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Code className="h-4 w-4 mr-2" />
                      Deploy Code Only
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Deploy Database Changes
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Deployment Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <span className="text-sm">Production</span>
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span className="text-sm">Staging</span>
                      <Badge className="bg-blue-100 text-blue-800">Ready</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900/20 rounded">
                      <span className="text-sm">Development</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Recent Deployments</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Version 2.1.4 - Performance Updates</p>
                      <p className="text-sm text-muted-foreground">Deployed 2 hours ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Version 2.1.3 - Security Patches</p>
                      <p className="text-sm text-muted-foreground">Deployed 1 day ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}