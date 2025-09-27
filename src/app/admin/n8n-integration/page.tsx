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
import { ArrowLeft, Workflow, Zap, MessageCircle, Globe, Database, Mail, Phone, CheckCircle, AlertCircle, Play, Pause, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface N8nWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  triggers: number;
  lastRun: string;
  webhookUrl: string;
  category: 'property' | 'lead' | 'communication' | 'marketing' | 'automation';
}

interface N8nConnection {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'database' | 'email' | 'sms';
  status: 'connected' | 'disconnected' | 'error';
  endpoint: string;
  lastSync: string;
}

interface WebsiteEvent {
  id: string;
  type: 'property_added' | 'lead_generated' | 'user_registered' | 'inquiry_received' | 'booking_made';
  timestamp: Date;
  data: any;
  n8nTriggered: boolean;
}

export default function N8nIntegration() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [n8nBaseUrl, setN8nBaseUrl] = useState('https://your-n8n-instance.com');
  const [n8nApiKey, setN8nApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([
    {
      id: 'wf-001',
      name: 'Property Lead Notification',
      description: 'Send instant notifications when new property inquiries are received',
      status: 'active',
      triggers: 247,
      lastRun: '2 minutes ago',
      webhookUrl: 'https://your-n8n-instance.com/webhook/property-lead',
      category: 'lead'
    },
    {
      id: 'wf-002',
      name: 'Social Media Auto-Post',
      description: 'Automatically post new properties to social media platforms',
      status: 'active',
      triggers: 89,
      lastRun: '1 hour ago',
      webhookUrl: 'https://your-n8n-instance.com/webhook/social-post',
      category: 'marketing'
    },
    {
      id: 'wf-003',
      name: 'CRM Integration Sync',
      description: 'Sync leads and customer data with external CRM systems',
      status: 'paused',
      triggers: 156,
      lastRun: '3 hours ago',
      webhookUrl: 'https://your-n8n-instance.com/webhook/crm-sync',
      category: 'automation'
    },
    {
      id: 'wf-004',
      name: 'Email Marketing Campaigns',
      description: 'Trigger automated email campaigns based on user actions',
      status: 'active',
      triggers: 423,
      lastRun: '30 minutes ago',
      webhookUrl: 'https://your-n8n-instance.com/webhook/email-campaign',
      category: 'communication'
    }
  ]);

  const [connections, setConnections] = useState<N8nConnection[]>([
    {
      id: 'conn-001',
      name: 'Property Database',
      type: 'database',
      status: 'connected',
      endpoint: 'MongoDB Atlas Cluster',
      lastSync: '5 minutes ago'
    },
    {
      id: 'conn-002',
      name: 'Email Service (SendGrid)',
      type: 'email',
      status: 'connected',
      endpoint: 'api.sendgrid.com',
      lastSync: '1 hour ago'
    },
    {
      id: 'conn-003',
      name: 'WhatsApp Business API',
      type: 'sms',
      status: 'connected',
      endpoint: 'graph.facebook.com/whatsapp',
      lastSync: '3 minutes ago'
    },
    {
      id: 'conn-004',
      name: 'CRM Webhook',
      type: 'webhook',
      status: 'error',
      endpoint: 'https://crm.example.com/webhook',
      lastSync: 'Failed 2 hours ago'
    }
  ]);

  const [recentEvents, setRecentEvents] = useState<WebsiteEvent[]>([
    {
      id: 'evt-001',
      type: 'property_added',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      data: { propertyId: 'P001', title: 'Sea Facing Apartment' },
      n8nTriggered: true
    },
    {
      id: 'evt-002',
      type: 'lead_generated',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      data: { name: 'John Doe', phone: '+91 98765 43210' },
      n8nTriggered: true
    },
    {
      id: 'evt-003',
      type: 'inquiry_received',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      data: { propertyId: 'P002', message: 'Interested in viewing' },
      n8nTriggered: false
    }
  ]);

  const [metrics, setMetrics] = useState({
    totalWorkflows: 4,
    activeWorkflows: 3,
    totalTriggers: 915,
    successRate: 97.3,
    avgResponseTime: 1.2,
    dataProcessed: 2.4
  });

  const testN8nConnection = async () => {
    if (!n8nBaseUrl || !n8nApiKey) {
      toast.error('Please provide n8n URL and API key');
      return;
    }

    toast.loading('Testing n8n connection...');
    
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      toast.dismiss();
      toast.success('Successfully connected to n8n instance!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to connect to n8n instance');
    }
  };

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            status: workflow.status === 'active' ? 'paused' : 'active',
            lastRun: workflow.status === 'paused' ? 'Just now' : workflow.lastRun
          }
        : workflow
    ));
    
    const workflow = workflows.find(w => w.id === workflowId);
    toast.success(`Workflow "${workflow?.name}" ${workflow?.status === 'active' ? 'paused' : 'activated'}`);
  };

  const triggerWorkflow = async (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;

    toast.loading(`Triggering workflow: ${workflow.name}`);
    
    try {
      // Simulate webhook trigger
      await fetch(workflow.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'manual_trigger',
          timestamp: new Date().toISOString(),
          source: 'admin_panel'
        })
      });

      setWorkflows(prev => prev.map(w => 
        w.id === workflowId 
          ? { ...w, triggers: w.triggers + 1, lastRun: 'Just now' }
          : w
      ));

      toast.dismiss();
      toast.success('Workflow triggered successfully');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to trigger workflow');
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalTriggers: prev.totalTriggers + Math.floor(Math.random() * 3),
        avgResponseTime: Math.max(0.8, prev.avgResponseTime + (Math.random() - 0.5) * 0.1),
        dataProcessed: prev.dataProcessed + Math.random() * 0.1
      }));
    }, 10000);

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
            <Workflow className="h-8 w-8 text-purple-600" />
            n8n Integration Hub
          </h1>
          <p className="text-muted-foreground">Complete website automation and workflow control</p>
        </div>

        <div className="flex gap-2">
          <Badge className={isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </Badge>
        </div>
      </div>

      {!isConnected && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">n8n Not Connected</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Connect your n8n instance to enable workflow automation and total website control.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Workflows</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalWorkflows}</p>
              </div>
              <Workflow className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{metrics.activeWorkflows}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Triggers</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.totalTriggers.toLocaleString()}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-600">{metrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.avgResponseTime.toFixed(1)}s</p>
              </div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Processed</p>
                <p className="text-2xl font-bold text-indigo-600">{metrics.dataProcessed.toFixed(1)}GB</p>
              </div>
              <Database className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="events">Live Events</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          workflow.status === 'active' ? 'bg-green-500' :
                          workflow.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{workflow.name}</p>
                          <p className="text-xs text-muted-foreground">{workflow.triggers} triggers</p>
                        </div>
                      </div>
                      <Badge className={
                        workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                        workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {workflow.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connection Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {connection.type === 'database' && <Database className="h-5 w-5 text-blue-600" />}
                        {connection.type === 'email' && <Mail className="h-5 w-5 text-green-600" />}
                        {connection.type === 'sms' && <MessageCircle className="h-5 w-5 text-purple-600" />}
                        {connection.type === 'webhook' && <Globe className="h-5 w-5 text-orange-600" />}
                        <div>
                          <p className="font-medium">{connection.name}</p>
                          <p className="text-xs text-muted-foreground">{connection.lastSync}</p>
                        </div>
                      </div>
                      <Badge className={
                        connection.status === 'connected' ? 'bg-green-100 text-green-800' :
                        connection.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {connection.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflows">
          <div className="space-y-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        workflow.status === 'active' ? 'bg-green-500 animate-pulse' :
                        workflow.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <CardTitle>{workflow.name}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => triggerWorkflow(workflow.id)}
                        disabled={workflow.status !== 'active'}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button
                        size="sm"
                        variant={workflow.status === 'active' ? 'destructive' : 'default'}
                        onClick={() => toggleWorkflow(workflow.id)}
                      >
                        {workflow.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{workflow.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium capitalize">{workflow.category}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Triggers</p>
                      <p className="font-medium">{workflow.triggers}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Last Run</p>
                      <p className="font-medium">{workflow.lastRun}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{workflow.status}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Webhook URL:</p>
                    <code className="text-xs font-mono bg-white dark:bg-gray-800 p-1 rounded">
                      {workflow.webhookUrl}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map((connection) => (
              <Card key={connection.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {connection.type === 'database' && <Database className="h-5 w-5 text-blue-600" />}
                    {connection.type === 'email' && <Mail className="h-5 w-5 text-green-600" />}
                    {connection.type === 'sms' && <MessageCircle className="h-5 w-5 text-purple-600" />}
                    {connection.type === 'webhook' && <Globe className="h-5 w-5 text-orange-600" />}
                    {connection.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={
                        connection.status === 'connected' ? 'bg-green-100 text-green-800' :
                        connection.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {connection.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm font-medium capitalize">{connection.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Endpoint</span>
                      <span className="text-sm font-medium">{connection.endpoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Sync</span>
                      <span className="text-sm font-medium">{connection.lastSync}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Connection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Website Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.n8nTriggered ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className="font-medium capitalize">{event.type.replace('_', ' ')}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={event.n8nTriggered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {event.n8nTriggered ? 'n8n Triggered' : 'Not Processed'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>n8n Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">n8n Instance URL</label>
                <Input
                  value={n8nBaseUrl}
                  onChange={(e) => setN8nBaseUrl(e.target.value)}
                  placeholder="https://your-n8n-instance.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <Input
                  type="password"
                  value={n8nApiKey}
                  onChange={(e) => setN8nApiKey(e.target.value)}
                  placeholder="Enter your n8n API key"
                />
              </div>
              
              <Button onClick={testN8nConnection} className="w-full bg-purple-600 hover:bg-purple-700">
                <Zap className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
              
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300">n8n Setup Instructions</h4>
                <ol className="text-sm text-purple-700 dark:text-purple-400 mt-2 space-y-1 list-decimal list-inside">
                  <li>Deploy your n8n instance (self-hosted or n8n Cloud)</li>
                  <li>Create API credentials in n8n settings</li>
                  <li>Set up webhook endpoints for each workflow</li>
                  <li>Configure authentication and security settings</li>
                  <li>Test the connection using the button above</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}