'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, HelpCircle, MessageCircle, Book, Video, Search, Send, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function HelpSupport() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: ''
  });

  const faqItems = [
    {
      category: 'Getting Started',
      question: 'How do I add a new property?',
      answer: 'Navigate to Properties > Add Property from the admin dashboard. Fill in all required fields including property details, location, and upload images.'
    },
    {
      category: 'Lead Management',
      question: 'How do I view and manage leads?',
      answer: 'Go to the Admin Dashboard and click on "View Leads" in the Real Estate section. You can filter, search, and update lead statuses from there.'
    },
    {
      category: 'Solar Calculator',
      question: 'How does the solar calculator work?',
      answer: 'The solar calculator uses your roof area and monthly electricity bill to estimate system size, cost, and potential savings. Access it from the Solar section in the admin panel.'
    },
    {
      category: 'Reports',
      question: 'How do I generate and export reports?',
      answer: 'Visit the Reports section from the main dashboard. You can view different analytics and use the Export button to download reports in various formats.'
    },
    {
      category: 'User Management',
      question: 'How do I manage user roles and permissions?',
      answer: 'User management is available in the Settings section. You can assign roles like Owner, Admin, Manager, Agent, or Viewer with different permission levels.'
    },
    {
      category: 'Backup & Recovery',
      question: 'How do I backup my data?',
      answer: 'Access Database Backup from the admin tools. You can create manual backups or set up automatic scheduled backups with retention policies.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with Admin Dashboard',
      duration: '5 min',
      type: 'video',
      description: 'Learn the basics of navigating your admin panel'
    },
    {
      title: 'Adding and Managing Properties',
      duration: '8 min',
      type: 'video',
      description: 'Complete guide to property management features'
    },
    {
      title: 'Lead Management Workflow',
      duration: '6 min',
      type: 'video',
      description: 'How to efficiently manage leads from capture to conversion'
    },
    {
      title: 'Using the Solar Calculator',
      duration: '4 min',
      type: 'video',
      description: 'Generate accurate solar estimates for customers'
    },
    {
      title: 'Reports and Analytics',
      duration: '7 min',
      type: 'video',
      description: 'Understanding your business metrics and performance'
    },
    {
      title: 'System Configuration Guide',
      duration: '15 min',
      type: 'document',
      description: 'Complete setup and configuration documentation'
    }
  ];

  const supportTickets = [
    {
      id: 'T001',
      subject: 'Google Maps not loading properly',
      status: 'open',
      priority: 'medium',
      date: '2025-09-27',
      category: 'Technical Issue'
    },
    {
      id: 'T002',
      subject: 'Need help with lead import',
      status: 'in-progress',
      priority: 'high',
      date: '2025-09-26',
      category: 'Feature Request'
    },
    {
      id: 'T003',
      subject: 'User permission questions',
      status: 'resolved',
      priority: 'low',
      date: '2025-09-25',
      category: 'General Question'
    }
  ];

  const submitTicket = () => {
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketForm({ subject: '', category: '', priority: '', description: '' });
  };

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    return variants[status as keyof typeof variants] || variants.open;
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
            <HelpCircle className="h-8 w-8 text-blue-600" />
            Help & Support
          </h1>
          <p className="text-muted-foreground">Get help, documentation, and support for your platform</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Get instant help</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Online</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Phone Support</h3>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">24/7 Available</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground">support@example.com</p>
            <Badge className="mt-2 bg-purple-100 text-purple-800">24h Response</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold mb-1">Business Hours</h3>
            <p className="text-sm text-muted-foreground">Mon-Sat 9AM-7PM</p>
            <Badge className="mt-2 bg-orange-100 text-orange-800">IST</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">{item.category}</Badge>
                    <h3 className="font-semibold flex-1">{item.question}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials & Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      {tutorial.type === 'video' ? (
                        <Video className="h-6 w-6 text-red-600 mt-0.5" />
                      ) : (
                        <Book className="h-6 w-6 text-blue-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{tutorial.duration}</Badge>
                          <Badge 
                            className={tutorial.type === 'video' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                          >
                            {tutorial.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">#{ticket.id}</span>
                        <Badge className={getStatusBadge(ticket.status)}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{ticket.date}</span>
                    </div>
                    <h3 className="font-medium mb-1">{ticket.subject}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{ticket.category}</Badge>
                      <Badge 
                        variant="outline"
                        className={
                          ticket.priority === 'high' ? 'border-red-200 text-red-700' :
                          ticket.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                          'border-green-200 text-green-700'
                        }
                      >
                        {ticket.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Submit Support Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject *</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category *</label>
                  <Select value={ticketForm.category} onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="billing">Billing Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description *</label>
                <Textarea
                  placeholder="Please describe your issue in detail..."
                  className="min-h-[120px]"
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button onClick={submitTicket} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Support Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}