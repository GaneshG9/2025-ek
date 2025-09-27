'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Globe, 
  Server, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  Upload, 
  Settings, 
  Lock,
  Cloud,
  Rocket,
  ExternalLink,
  RefreshCw,
  Monitor,
  Smartphone,
  Globe2,
  Wand2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AutomatedSetup } from './automated-setup';
import { OneClickDeployment } from './one-click-deployment';

interface DeploymentConfig {
  domain: string;
  subdomain: string;
  hosting: 'vercel' | 'netlify' | 'github-pages' | 'custom';
  ssl: boolean;
  cdn: boolean;
  compression: boolean;
  analytics: boolean;
  customHeaders: string;
  environmentVariables: Record<string, string>;
  redirects: Array<{ from: string; to: string; permanent: boolean }>;
}

interface DeploymentStatus {
  status: 'idle' | 'deploying' | 'success' | 'error';
  message: string;
  url?: string;
  lastDeployed?: Date;
}

export function HostingManager() {
  const [config, setConfig] = useState<DeploymentConfig>({
    domain: '',
    subdomain: '',
    hosting: 'vercel',
    ssl: true,
    cdn: true,
    compression: true,
    analytics: false,
    customHeaders: '',
    environmentVariables: {},
    redirects: []
  });

  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>({
    status: 'idle',
    message: 'Ready to deploy'
  });

  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Load saved configuration
    const savedConfig = localStorage.getItem('deployment_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('deployment_config', JSON.stringify(config));
    toast({
      title: "Configuration Saved",
      description: "Your hosting configuration has been saved successfully.",
    });
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus({ status: 'deploying', message: 'Starting deployment...' });

    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const deploymentUrl = config.domain || `${config.subdomain}.${getHostingDomain(config.hosting)}`;
      
      setDeploymentStatus({
        status: 'success',
        message: 'Deployment completed successfully!',
        url: `https://${deploymentUrl}`,
        lastDeployed: new Date()
      });

      toast({
        title: "Deployment Successful! 🚀",
        description: `Your website is now live at https://${deploymentUrl}`,
      });
    } catch (error) {
      setDeploymentStatus({
        status: 'error',
        message: 'Deployment failed. Please check your configuration.'
      });
      
      toast({
        title: "Deployment Failed",
        description: "There was an error during deployment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const getHostingDomain = (hosting: string) => {
    switch (hosting) {
      case 'vercel': return 'vercel.app';
      case 'netlify': return 'netlify.app';
      case 'github-pages': return 'github.io';
      default: return 'yourhosting.com';
    }
  };

  const generateDeploymentScript = () => {
    const script = `
# Automated Deployment Script
# Generated on ${new Date().toISOString()}

# Build the project
npm run build

# Deploy to ${config.hosting}
${config.hosting === 'vercel' ? 'vercel --prod' : ''}
${config.hosting === 'netlify' ? 'netlify deploy --prod --dir=out' : ''}
${config.hosting === 'github-pages' ? 'npm run deploy' : ''}

# Configure SSL (automatically enabled)
# Configure CDN (automatically enabled)
# Configure compression (automatically enabled)
    `.trim();

    navigator.clipboard.writeText(script);
    toast({
      title: "Script Copied!",
      description: "Deployment script copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            Hosting & Domain Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Deploy your website with SSL, CDN, and custom domain configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={deploymentStatus.status === 'success' ? 'default' : 'secondary'}>
            {deploymentStatus.status === 'success' ? '🟢 Live' : '🟡 Development'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="hosting" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hosting">🌐 Hosting</TabsTrigger>
          <TabsTrigger value="domain">🌍 Domain</TabsTrigger>
          <TabsTrigger value="security">🔒 Security</TabsTrigger>
          <TabsTrigger value="auto-setup">🪄 Auto Setup</TabsTrigger>
          <TabsTrigger value="deploy">🚀 Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="hosting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Hosting Platform
              </CardTitle>
              <CardDescription>
                Choose your preferred hosting platform for automatic deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    value: 'vercel', 
                    name: 'Vercel', 
                    desc: 'Optimal for Next.js apps', 
                    features: ['Automatic SSL', 'Global CDN', 'Serverless Functions'],
                    recommended: true
                  },
                  { 
                    value: 'netlify', 
                    name: 'Netlify', 
                    desc: 'Great for static sites', 
                    features: ['Free SSL', 'Form Handling', 'Edge Functions'] 
                  },
                  { 
                    value: 'github-pages', 
                    name: 'GitHub Pages', 
                    desc: 'Free hosting from GitHub', 
                    features: ['Free Hosting', 'GitHub Integration', 'Custom Domains'] 
                  }
                ].map((platform) => (
                  <Card 
                    key={platform.value}
                    className={`cursor-pointer transition-all ${
                      config.hosting === platform.value 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setConfig(prev => ({ ...prev, hosting: platform.value as any }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          {platform.name}
                          {platform.recommended && (
                            <Badge variant="default" className="text-xs">Recommended</Badge>
                          )}
                        </h3>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          config.hosting === platform.value 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {platform.desc}
                      </p>
                      <div className="space-y-1">
                        {platform.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">CDN</span>
                  </div>
                  <Switch
                    checked={config.cdn}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, cdn: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Compression</span>
                  </div>
                  <Switch
                    checked={config.compression}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, compression: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Analytics</span>
                  </div>
                  <Switch
                    checked={config.analytics}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, analytics: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe2 className="h-5 w-5" />
                Domain Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Custom Domain (Optional)</Label>
                  <Input
                    id="domain"
                    placeholder="www.yourdomain.com"
                    value={config.domain}
                    onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500">
                    Leave empty to use free subdomain
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Free Subdomain</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="subdomain"
                      placeholder="yoursite"
                      value={config.subdomain}
                      onChange={(e) => setConfig(prev => ({ ...prev, subdomain: e.target.value }))}
                    />
                    <span className="text-sm text-gray-500">
                      .{getHostingDomain(config.hosting)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Your Website URL
                </h4>
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded text-sm">
                    https://{config.domain || `${config.subdomain || 'yoursite'}.${getHostingDomain(config.hosting)}`}
                  </code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const url = `https://${config.domain || `${config.subdomain || 'yoursite'}.${getHostingDomain(config.hosting)}`}`;
                      navigator.clipboard.writeText(url);
                      toast({ title: "URL Copied!", description: "Website URL copied to clipboard." });
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & SSL Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">SSL Certificate</div>
                        <div className="text-sm text-gray-600">Automatic HTTPS encryption</div>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Auto-Enabled
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Security Headers</h4>
                    <Textarea
                      placeholder="X-Frame-Options: DENY&#10;X-Content-Type-Options: nosniff"
                      value={config.customHeaders}
                      onChange={(e) => setConfig(prev => ({ ...prev, customHeaders: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Security Features</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'DDoS Protection', enabled: true, desc: 'Automatic protection against attacks' },
                        { name: 'Bot Protection', enabled: true, desc: 'Block malicious bots and crawlers' },
                        { name: 'Rate Limiting', enabled: true, desc: 'Prevent API abuse' },
                        { name: 'WAF (Web Application Firewall)', enabled: true, desc: 'Filter malicious requests' }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{feature.name}</div>
                            <div className="text-xs text-gray-500">{feature.desc}</div>
                          </div>
                          <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                            {feature.enabled ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto-setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                Automated Deployment Setup
              </CardTitle>
              <CardDescription>
                Let us guide you through the complete deployment process with automated configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {config.subdomain ? (
                <AutomatedSetup 
                  selectedPlatform={config.hosting}
                  config={{
                    subdomain: config.subdomain,
                    domain: config.domain,
                    environmentVariables: config.environmentVariables
                  }}
                />
              ) : (
                <div className="text-center py-8 space-y-4">
                  <Wand2 className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      Complete Your Configuration First
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Please configure your domain and hosting settings in the previous tabs to access automated setup.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          {/* One-Click Deployment */}
          <OneClickDeployment config={config} />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Advanced Deployment Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Deployment Status</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        deploymentStatus.status === 'success' ? 'bg-green-500' :
                        deploymentStatus.status === 'deploying' ? 'bg-yellow-500 animate-pulse' :
                        deploymentStatus.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <span className="font-medium capitalize">{deploymentStatus.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {deploymentStatus.message}
                    </p>
                    {deploymentStatus.url && (
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(deploymentStatus.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Live Site
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={generateDeploymentScript}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Deployment Script
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={saveConfig}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Deployment Preview</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Platform:</span>
                        <span className="font-medium capitalize">{config.hosting}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domain:</span>
                        <span className="font-medium">
                          {config.domain || `${config.subdomain || 'yoursite'}.${getHostingDomain(config.hosting)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SSL:</span>
                        <span className="text-green-600 font-medium">✓ Enabled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CDN:</span>
                        <span className={config.cdn ? 'text-green-600' : 'text-gray-500'}>
                          {config.cdn ? '✓ Enabled' : '✗ Disabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compression:</span>
                        <span className={config.compression ? 'text-green-600' : 'text-gray-500'}>
                          {config.compression ? '✓ Enabled' : '✗ Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={isDeploying || !config.subdomain}
                      >
                        {isDeploying ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Rocket className="h-4 w-4 mr-2" />
                            Deploy Website
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deploy Your Website</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will deploy your website to {config.hosting} with the following configuration:
                          <br /><br />
                          <strong>URL:</strong> https://{config.domain || `${config.subdomain}.${getHostingDomain(config.hosting)}`}
                          <br />
                          <strong>SSL:</strong> Automatic HTTPS
                          <br />
                          <strong>CDN:</strong> {config.cdn ? 'Enabled' : 'Disabled'}
                          <br /><br />
                          Are you ready to deploy?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeploy}>
                          <Rocket className="h-4 w-4 mr-2" />
                          Deploy Now
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}