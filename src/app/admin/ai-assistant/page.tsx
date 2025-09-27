'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bot, Brain, MessageCircle, Settings, Zap, Mic, MicOff, Send, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AIAgent {
  id: string;
  name: string;
  type: 'customer_support' | 'lead_generation' | 'property_advisor' | 'solar_consultant' | 'marketing_assistant';
  status: 'active' | 'training' | 'offline';
  conversations: number;
  accuracy: number;
  lastActive: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
  agentId?: string;
}

interface AISettings {
  model: string;
  temperature: number;
  maxTokens: number;
  language: string;
  voiceEnabled: boolean;
  autoRespond: boolean;
}

export default function AIAssistantHub() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    {
      id: 'cs-01',
      name: 'Customer Support Bot',
      type: 'customer_support',
      status: 'active',
      conversations: 1247,
      accuracy: 94,
      lastActive: '2 minutes ago'
    },
    {
      id: 'lg-01',
      name: 'Lead Generator',
      type: 'lead_generation',
      status: 'active',
      conversations: 856,
      accuracy: 91,
      lastActive: '5 minutes ago'
    },
    {
      id: 'pa-01',
      name: 'Property Advisor',
      type: 'property_advisor',
      status: 'active',
      conversations: 623,
      accuracy: 96,
      lastActive: '1 minute ago'
    },
    {
      id: 'sc-01',
      name: 'Solar Consultant',
      type: 'solar_consultant',
      status: 'training',
      conversations: 234,
      accuracy: 88,
      lastActive: '30 minutes ago'
    },
    {
      id: 'ma-01',
      name: 'Marketing Assistant',
      type: 'marketing_assistant',
      status: 'active',
      conversations: 445,
      accuracy: 92,
      lastActive: '3 minutes ago'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
      agentId: 'cs-01'
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [aiSettings, setAiSettings] = useState<AISettings>({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    language: 'en',
    voiceEnabled: true,
    autoRespond: true
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalConversations: 3405,
    activeChats: 23,
    avgResponseTime: 1.2,
    satisfactionScore: 4.7,
    leadsGenerated: 156,
    conversionsToday: 12
  });

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: generateAIResponse(currentMessage),
        timestamp: new Date(),
        agentId: selectedAgent || 'cs-01'
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand your inquiry about our properties. Let me help you find the perfect match based on your requirements.",
      "Thank you for your interest in our solar solutions. I can provide you with a customized quote and savings calculation.",
      "I'd be happy to schedule a property viewing for you. What dates work best for your schedule?",
      "Based on your location and energy usage, I recommend our premium solar package. Here are the details...",
      "Let me connect you with one of our specialists who can provide more detailed information about financing options.",
      "I've noted your preferences for a 3BHK apartment in Mumbai. Here are some excellent options that match your criteria."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleVoiceListening = () => {
    if (isListening) {
      setIsListening(false);
      toast.success('Voice recording stopped');
    } else {
      setIsListening(true);
      toast.success('Voice recording started - speak now');
      
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentMessage("I'm interested in a 3BHK apartment in Mumbai with sea view");
        setIsListening(false);
        toast.success('Voice message converted to text');
      }, 3000);
    }
  };

  const trainAgent = async (agentId: string) => {
    toast.loading('Training AI agent with new data...');
    
    setAiAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, status: 'training' } : agent
    ));

    setTimeout(() => {
      setAiAgents(prev => prev.map(agent => 
        agent.id === agentId ? { 
          ...agent, 
          status: 'active', 
          accuracy: Math.min(98, agent.accuracy + Math.floor(Math.random() * 3) + 1),
          lastActive: 'Just now'
        } : agent
      ));
      
      toast.dismiss();
      toast.success('AI agent training completed successfully!');
    }, 4000);
  };

  const exportConversations = () => {
    toast.success('Exporting conversation data...');
    // Simulate export
    setTimeout(() => {
      toast.success('Conversations exported to CSV file');
    }, 2000);
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        activeChats: prev.activeChats + Math.floor(Math.random() * 3) - 1,
        totalConversations: prev.totalConversations + Math.floor(Math.random() * 2),
        leadsGenerated: prev.leadsGenerated + (Math.random() > 0.9 ? 1 : 0),
        conversionsToday: prev.conversionsToday + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 5000);

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
            <Brain className="h-8 w-8 text-purple-600" />
            AI Assistant Hub
          </h1>
          <p className="text-muted-foreground">Advanced AI agents for customer engagement and business automation</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={exportConversations} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Real-time AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeMetrics.totalConversations.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Chats</p>
                <p className="text-2xl font-bold text-green-600">{realTimeMetrics.activeChats}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-orange-600">{realTimeMetrics.avgResponseTime}s</p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600">{realTimeMetrics.satisfactionScore}/5</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full mr-0.5 ${i < realTimeMetrics.satisfactionScore ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leads Generated</p>
                <p className="text-2xl font-bold text-indigo-600">{realTimeMetrics.leadsGenerated}</p>
              </div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversions Today</p>
                <p className="text-2xl font-bold text-emerald-600">{realTimeMetrics.conversionsToday}</p>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">AI Dashboard</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="agents">Agent Management</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active AI Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bot className={`h-8 w-8 ${agent.status === 'active' ? 'text-green-600' : agent.status === 'training' ? 'text-orange-600' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.conversations} conversations</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          agent.status === 'active' ? 'bg-green-100 text-green-800' :
                          agent.status === 'training' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {agent.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{agent.accuracy}% accuracy</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Resolution Rate</p>
                      <p className="text-2xl font-bold text-blue-600">87%</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">First Contact Resolution</p>
                      <p className="text-2xl font-bold text-green-600">72%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Customer Support</span>
                        <span className="text-sm text-muted-foreground">94% accuracy</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Lead Generation</span>
                        <span className="text-sm text-muted-foreground">91% accuracy</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Property Advisor</span>
                        <span className="text-sm text-muted-foreground">96% accuracy</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Solar Consultant</span>
                        <span className="text-sm text-muted-foreground">88% accuracy</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live AI Chat</CardTitle>
                  <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select AI Agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiAgents.filter(agent => agent.status === 'active').map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-[500px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVoiceListening}
                    className={isListening ? 'bg-red-100 text-red-600' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!currentMessage.trim() || isProcessing}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chat Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Messages Today</p>
                    <p className="text-xl font-bold text-blue-600">247</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Active Conversations</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Property Inquiries</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Solar Consultations</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Support Tickets</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Quick Responses</h4>
                    <div className="space-y-1">
                      <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => setCurrentMessage("What properties do you have in Mumbai?")}>
                        Mumbai Properties
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => setCurrentMessage("I need a solar quote for my home")}>
                        Solar Quote
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => setCurrentMessage("Schedule a property viewing")}>
                        Schedule Viewing
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Bot className={`h-10 w-10 ${agent.status === 'active' ? 'text-green-600' : agent.status === 'training' ? 'text-orange-600' : 'text-gray-400'}`} />
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{agent.type.replace('_', ' ')}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground">{agent.conversations} conversations</span>
                            <span className="text-xs text-muted-foreground">{agent.accuracy}% accuracy</span>
                            <span className="text-xs text-muted-foreground">Last active: {agent.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          agent.status === 'active' ? 'bg-green-100 text-green-800' :
                          agent.status === 'training' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {agent.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => trainAgent(agent.id)}
                          disabled={agent.status === 'training'}
                        >
                          {agent.status === 'training' ? 'Training...' : 'Train Agent'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Model</label>
                  <Select value={aiSettings.model} onValueChange={(value) => setAiSettings(prev => ({ ...prev, model: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Most Advanced)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</SelectItem>
                      <SelectItem value="claude-3">Claude 3 (Anthropic)</SelectItem>
                      <SelectItem value="llama-2">Llama 2 (Meta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Temperature: {aiSettings.temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aiSettings.temperature}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Controls creativity vs consistency</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Tokens</label>
                  <Input
                    type="number"
                    value={aiSettings.maxTokens}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={aiSettings.language} onValueChange={(value) => setAiSettings(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                      <SelectItem value="gu">Gujarati</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Voice Recognition</p>
                    <p className="text-sm text-muted-foreground">Enable voice-to-text input for AI chat</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiSettings.voiceEnabled}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, voiceEnabled: e.target.checked }))}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto-Respond</p>
                    <p className="text-sm text-muted-foreground">Automatically respond to common queries</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiSettings.autoRespond}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, autoRespond: e.target.checked }))}
                    className="rounded"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Training Data Sources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Property Database</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Interactions</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Solar Calculator Data</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing Materials</span>
                      <Badge className="bg-orange-100 text-orange-800">Syncing</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Save AI Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}