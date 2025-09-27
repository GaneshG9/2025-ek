'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MessageCircle, MessageSquare, Phone, PhoneCall, Bell, Reply, Forward, Archive, Trash2, Mail, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  sender: string;
  subject?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'inquiry' | 'email' | 'sms' | 'notification';
  status: 'sent' | 'delivered' | 'read' | 'unread';
  channel: 'whatsapp' | 'email' | 'sms' | 'website_chat' | 'phone';
  priority?: 'high' | 'medium' | 'low';
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastMessage: string;
  lastActive: Date;
  status: 'online' | 'offline' | 'away';
  unreadCount: number;
  tags: string[];
  propertyInterest?: string;
  images?: string[];
}

interface CommunicationChannel {
  id: string;
  name: string;
  type: 'whatsapp' | 'email' | 'sms' | 'website_chat' | 'phone';
  status: 'connected' | 'disconnected' | 'error';
  messagesCount: number;
  activeChats: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

export default function Communications() {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const messages: Message[] = [
    {
      id: 'M001',
      senderId: 'U001',
      senderName: 'Rajesh Kumar', 
      sender: 'rajesh.kumar@email.com',
      subject: 'Inquiry about 3BHK Apartment in Bandra',
      content: 'Hi, I am interested in the 3BHK apartment listed in Bandra West. Could you please share more details?',
      timestamp: new Date('2024-09-27 10:30:00'),
      type: 'inquiry',
      status: 'unread',
      channel: 'email',
      priority: 'high'
    },
    {
      id: 'M002',
      senderId: 'U002',
      senderName: 'Priya Sharma',
      sender: 'priya.sharma@email.com', 
      subject: 'Solar Installation Query',
      content: 'Hello, I would like to know about solar panel installation for my roof.',
      timestamp: new Date('2024-09-27 09:45:00'),
      type: 'email',
      status: 'read',
      channel: 'email',
      priority: 'medium'
    }
  ];

  const notifications: Notification[] = [
    {
      id: 'N001',
      title: 'New Lead Captured',
      message: 'A new lead has been captured from the website contact form',
      timestamp: new Date('2024-09-27 11:45:00'),
      type: 'success',
      read: false
    },
    {
      id: 'N002',
      title: 'Property Status Updated',
      message: 'Property P156 status changed from Available to Under Negotiation',
      timestamp: new Date('2024-09-27 11:30:00'),
      type: 'info',
      read: false
    },
    {
      id: 'N003',
      title: 'System Backup Completed',
      message: 'Daily database backup completed successfully',
      timestamp: new Date('2024-09-27 02:00:00'),
      type: 'success',
      read: true
    }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'sms':
        return <Phone className="h-4 w-4 text-green-600" />;
      case 'inquiry':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'notification':
        return <Bell className="h-4 w-4 text-orange-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      unread: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      read: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      archived: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return variants[status as keyof typeof variants] || variants.read;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return '👥';
      case 'property':
        return '🏠';
      case 'system':
        return '⚙️';
      case 'user':
        return '👤';
      case 'alert':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

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
            <MessageSquare className="h-8 w-8 text-blue-600" />
            Communications
          </h1>
          <p className="text-muted-foreground">Manage messages, inquiries, and notifications</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold text-orange-600">{unreadNotifications}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inquiries</p>
                <p className="text-2xl font-bold text-purple-600">{messages.filter(m => m.type === 'inquiry').length}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Messages & Inquiries</TabsTrigger>
          <TabsTrigger value="notifications">System Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Messages ({filteredMessages.length})</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 ${
                          selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start gap-3">
                          {getMessageIcon(message.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium truncate">{message.sender}</span>
                              <Badge className={getStatusBadge(message.status)}>
                                {message.status}
                              </Badge>
                              <Badge className={getPriorityBadge(message.priority || 'medium')}>
                                {message.priority || 'medium'}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium truncate">{message.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Message Details</CardTitle>
                  {selectedMessage && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Forward className="h-4 w-4 mr-1" />
                        Forward
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-1" />
                        Archive
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Mark Unread
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedMessage ? (
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getMessageIcon(selectedMessage.type)}
                          <span className="font-semibold">{selectedMessage.sender}</span>
                          <Badge className={getStatusBadge(selectedMessage.status)}>
                            {selectedMessage.status}
                          </Badge>
                          <Badge className={getPriorityBadge(selectedMessage.priority || 'medium')}>
                            {selectedMessage.priority || 'medium'}
                          </Badge>
                        </div>
                        <h2 className="text-lg font-semibold">{selectedMessage.subject}</h2>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedMessage.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a message to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}