'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bot, MessageCircle, Settings, Zap, Brain, Users, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'inactive';
  lastTriggered?: string;
  executionCount: number;
}

interface ChatbotConfig {
  enabled: boolean;
  name: string;
  welcomeMessage: string;
  fallbackMessage: string;
  knowledgeBase: string[];
  integrations: {
    whatsapp: boolean;
    telegram: boolean;
    messenger: boolean;
    website: boolean;
  };
}

interface AnalyticsInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'opportunity' | 'warning';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  timestamp: string;
}

export default function AutomationControl() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('automation');
  const [isProcessing, setIsProcessing] = useState(false);

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: 'AR001',
      name: 'Auto Lead Assignment',
      trigger: 'New lead submission',
      action: 'Assign to available agent',
      status: 'active',
      lastTriggered: '2025-09-27 10:30:00',
      executionCount: 245
    },
    {
      id: 'AR002',
      name: 'Property Price Alert',
      trigger: 'Price change detected',
      action: 'Notify interested buyers',
      status: 'active',
      lastTriggered: '2025-09-27 09:15:00',
      executionCount: 67
    },
    {
      id: 'AR003',
      name: 'Follow-up Scheduler',
      trigger: 'Lead inactive for 48 hours',
      action: 'Schedule automated follow-up',
      status: 'active',
      lastTriggered: '2025-09-27 08:45:00',
      executionCount: 134
    }
  ]);

  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig>({
    enabled: true,
    name: 'PropertyBot',
    welcomeMessage: 'Hi! I\'m PropertyBot. How can I help you find your dream property today?',
    fallbackMessage: 'I\'m sorry, I didn\'t understand that. Let me connect you with a human agent.',
    knowledgeBase: [
      'Property listings and details',
      'Pricing and availability',
      'Mortgage and financing',
      'Area information and amenities',
      'Booking property visits'
    ],
    integrations: {
      whatsapp: true,
      telegram: false,
      messenger: true,
      website: true
    }
  });

  const [analyticsInsights, setAnalyticsInsights] = useState<AnalyticsInsight[]>([
    {
      id: 'AI001',
      type: 'opportunity',
      title: 'High-Value Lead Surge',
      description: 'Luxury property inquiries increased by 45% this week. Consider increasing premium property marketing.',
      confidence: 87,
      actionable: true,
      timestamp: '2025-09-27 10:00:00'
    },
    {
      id: 'AI002',
      type: 'trend',
      title: 'Mobile Traffic Growing',
      description: '68% of property views now come from mobile devices. Ensure mobile optimization is prioritized.',
      confidence: 92,
      actionable: true,
      timestamp: '2025-09-27 09:30:00'
    },
    {
      id: 'AI003',
      type: 'warning',
      title: 'Lead Response Time Delay',
      description: 'Average response time has increased to 4.2 hours. Quick response is crucial for conversion.',
      confidence: 95,
      actionable: true,
      timestamp: '2025-09-27 09:00:00'
    },
    {
      id: 'AI004',
      type: 'anomaly',
      title: 'Unusual Solar Calculator Usage',
      description: 'Solar calculator usage spiked 300% after recent power outage news. Prepare solar marketing campaign.',
      confidence: 78,
      actionable: true,
      timestamp: '2025-09-27 08:30:00'
    }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    automation: { status: 'healthy', uptime: '99.8%', lastCheck: '2 minutes ago' },
    chatbot: { status: 'healthy', responses: '1,247', accuracy: '94%' },
    analytics: { status: 'processing', insights: '24 new', confidence: '89%' },
    leadProcessing: { status: 'healthy', processed: '156 today', conversion: '18.2%' }
  });

  const toggleAutomationRule = (ruleId: string) => {
    setAutomationRules(rules => rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
    toast.success('Automation rule updated successfully');
  };

  const createNewRule = () => {
    const newRule: AutomationRule = {
      id: `AR${String(automationRules.length + 1).padStart(3, '0')}`,
      name: 'New Automation Rule',
      trigger: 'Custom trigger',
      action: 'Custom action',
      status: 'inactive',
      executionCount: 0
    };
    setAutomationRules([...automationRules, newRule]);
    toast.success('New automation rule created');
  };

  const processAllLeads = async () => {
    setIsProcessing(true);
    toast.loading('Processing all pending leads...');
    
    try {
      // Simulate lead processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.dismiss();
      toast.success('Successfully processed 23 leads with AI analysis');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to process leads');
    } finally {
      setIsProcessing(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'trend': return <Activity className="h-5 w-5 text-blue-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'anomaly': return <Brain className="h-5 w-5 text-purple-600" />;
      default: return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightBadge = (type: string) => {
    const variants = {
      opportunity: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      trend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      anomaly: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return variants[type as keyof typeof variants];
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
            <Zap className="h-8 w-8 text-yellow-500" />
            Automation Control Center
          </h1>
          <p className="text-muted-foreground">Advanced AI-powered automation and intelligent system management</p>
        </div>

        <Button 
          onClick={processAllLeads}
          disabled={isProcessing}
          className="bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? (
            <>
              <Brain className="h-4 w-4 mr-2 animate-pulse" />
              Processing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Process All Leads
            </>
          )}
        </Button>
      </div>

      {/* System Health Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automation Engine</p>
                <p className="text-lg font-bold text-green-600">{systemHealth.automation.uptime}</p>
                <p className="text-xs text-muted-foreground">{systemHealth.automation.lastCheck}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Chatbot</p>
                <p className="text-lg font-bold text-blue-600">{systemHealth.chatbot.accuracy}</p>
                <p className="text-xs text-muted-foreground">{systemHealth.chatbot.responses} responses</p>
              </div>
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Smart Analytics</p>
                <p className="text-lg font-bold text-purple-600">{systemHealth.analytics.confidence}</p>
                <p className="text-xs text-muted-foreground">{systemHealth.analytics.insights}</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lead Processing</p>
                <p className="text-lg font-bold text-orange-600">{systemHealth.leadProcessing.conversion}</p>
                <p className="text-xs text-muted-foreground">{systemHealth.leadProcessing.processed}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          <TabsTrigger value="analytics">Smart Analytics</TabsTrigger>
          <TabsTrigger value="troubleshoot">Problem Terminal</TabsTrigger>
        </TabsList>

        <TabsContent value="automation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Active Automation Rules
                  <Button onClick={createNewRule} size="sm">
                    <Zap className="h-4 w-4 mr-1" />
                    Add Rule
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{rule.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.status}
                        </Badge>
                        <Switch
                          checked={rule.status === 'active'}
                          onCheckedChange={() => toggleAutomationRule(rule.id)}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Trigger:</strong> {rule.trigger}</p>
                      <p><strong>Action:</strong> {rule.action}</p>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Executed: {rule.executionCount} times</span>
                      {rule.lastTriggered && (
                        <span>Last: {new Date(rule.lastTriggered).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create New Automation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rule Name</label>
                  <Input placeholder="e.g., Auto Email Responder" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Trigger Event</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-lead">New Lead Submission</SelectItem>
                      <SelectItem value="property-view">Property Page View</SelectItem>
                      <SelectItem value="email-open">Email Opened</SelectItem>
                      <SelectItem value="form-abandon">Form Abandonment</SelectItem>
                      <SelectItem value="price-alert">Price Change</SelectItem>
                      <SelectItem value="time-based">Time-based Trigger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Action to Perform</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="send-email">Send Email</SelectItem>
                      <SelectItem value="assign-lead">Assign Lead to Agent</SelectItem>
                      <SelectItem value="create-task">Create Follow-up Task</SelectItem>
                      <SelectItem value="update-status">Update Lead Status</SelectItem>
                      <SelectItem value="send-sms">Send SMS</SelectItem>
                      <SelectItem value="notify-team">Notify Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Conditions (Optional)</label>
                  <Textarea placeholder="Define specific conditions for this automation..." />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Create Automation Rule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chatbot">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  Chatbot Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable AI Chatbot</p>
                    <p className="text-sm text-muted-foreground">Automatically respond to customer inquiries</p>
                  </div>
                  <Switch
                    checked={chatbotConfig.enabled}
                    onCheckedChange={(enabled) => setChatbotConfig(prev => ({ ...prev, enabled }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Chatbot Name</label>
                  <Input
                    value={chatbotConfig.name}
                    onChange={(e) => setChatbotConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="PropertyBot"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Welcome Message</label>
                  <Textarea
                    value={chatbotConfig.welcomeMessage}
                    onChange={(e) => setChatbotConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                    placeholder="Hi! How can I help you today?"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Fallback Message</label>
                  <Textarea
                    value={chatbotConfig.fallbackMessage}
                    onChange={(e) => setChatbotConfig(prev => ({ ...prev, fallbackMessage: e.target.value }))}
                    placeholder="I'm sorry, I didn't understand..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Platform Integrations</label>
                  <div className="space-y-2">
                    {Object.entries(chatbotConfig.integrations).map(([platform, enabled]) => (
                      <div key={platform} className="flex items-center justify-between">
                        <span className="capitalize">{platform}</span>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => setChatbotConfig(prev => ({
                            ...prev,
                            integrations: { ...prev.integrations, [platform]: checked }
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Chatbot Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chatbot Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Conversations</p>
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Resolution Rate</p>
                    <p className="text-2xl font-bold text-green-600">78%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Knowledge Base Topics</h4>
                  {chatbotConfig.knowledgeBase.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{topic}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Recent Interactions</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                      <p><strong>User:</strong> "What properties are available in Mumbai?"</p>
                      <p><strong>Bot:</strong> "I found 23 properties in Mumbai. Would you like me to show you apartments or independent houses?"</p>
                      <p className="text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
                      <p><strong>User:</strong> "What's the price range for 3BHK?"</p>
                      <p><strong>Bot:</strong> "3BHK apartments in Mumbai typically range from ₹2.5Cr to ₹8Cr depending on location and amenities."</p>
                      <p className="text-muted-foreground mt-1">5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge className={getInsightBadge(insight.type)}>
                            {insight.type}
                          </Badge>
                          <Badge variant="outline">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(insight.timestamp).toLocaleString()}
                          </span>
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshoot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Problem Detection & Resolution Terminal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                <div>$ system-check --comprehensive</div>
                <div className="text-blue-400">Running comprehensive system diagnostics...</div>
                <div className="text-green-400">✓ Database connectivity: OK</div>
                <div className="text-green-400">✓ API endpoints: All responding</div>
                <div className="text-green-400">✓ Memory usage: 67% (Normal)</div>
                <div className="text-green-400">✓ SSL certificates: Valid</div>
                <div className="text-yellow-400">⚠ Slow query detected: property_search (2.3s)</div>
                <div className="text-green-400">✓ Automation rules: 3/3 active</div>
                <div className="text-green-400">✓ Chatbot service: Responding normally</div>
                <div className="text-green-400">✓ Backup system: Last backup 2h ago</div>
                <div className="text-blue-400">Generating optimization recommendations...</div>
                <div className="text-cyan-400">→ Consider adding database index on property_location</div>
                <div className="text-cyan-400">→ Enable Redis caching for frequent queries</div>
                <div className="text-green-400">System health: 94% (Excellent)</div>
                <div>$ _</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Run Full Diagnostics
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Optimization Settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">Performance</p>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">Uptime</p>
                  <p className="text-2xl font-bold text-blue-600">99.8%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-semibold">AI Accuracy</p>
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}