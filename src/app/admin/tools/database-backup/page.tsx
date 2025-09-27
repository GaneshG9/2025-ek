'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Database, Download, Upload, RefreshCw, Clock, CheckCircle, AlertCircle, HardDrive } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BackupRecord {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'in-progress' | 'failed';
}

export default function DatabaseBackup() {
  const router = useRouter();
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const backupHistory: BackupRecord[] = [
    {
      id: 'B001',
      name: 'Full Database Backup - September 27, 2025',
      size: '245.8 MB',
      date: '2025-09-27 00:15:32',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: 'B002', 
      name: 'Manual Backup - Before Migration',
      size: '234.2 MB',
      date: '2025-09-26 14:30:15',
      type: 'manual',
      status: 'completed'
    },
    {
      id: 'B003',
      name: 'Weekly Automatic Backup',
      size: '221.5 MB', 
      date: '2025-09-24 02:00:00',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: 'B004',
      name: 'Properties Migration Backup',
      size: '198.7 MB',
      date: '2025-09-22 16:45:22',
      type: 'manual',
      status: 'completed'
    }
  ];

  const createBackup = async () => {
    setIsCreatingBackup(true);
    toast.loading('Creating database backup...');
    
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.dismiss();
      toast.success('Database backup created successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to create backup');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const restoreBackup = async (backupId: string) => {
    setIsRestoring(true);
    toast.loading('Restoring from backup...');
    
    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 4000));
      toast.dismiss();
      toast.success('Database restored successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to restore backup');
    } finally {
      setIsRestoring(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return variants[status as keyof typeof variants] || variants.completed;
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
            <Database className="h-8 w-8 text-blue-600" />
            Database Backup
          </h1>
          <p className="text-muted-foreground">Manage database backups and restore points</p>
        </div>

        <Button 
          onClick={createBackup}
          disabled={isCreatingBackup}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isCreatingBackup ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Create Backup
            </>
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Backups</p>
                <p className="text-2xl font-bold">{backupHistory.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold">900 MB</p>
              </div>
              <HardDrive className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                <p className="text-2xl font-bold">Today</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Auto Backup</p>
                <p className="text-2xl font-bold text-green-600">ON</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="backups">Backup History</TabsTrigger>
          <TabsTrigger value="schedule">Backup Schedule</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="backups">
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backupHistory.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(backup.status)}
                          <span className="font-medium">{backup.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={backup.type === 'automatic' ? 'border-blue-200 text-blue-700' : 'border-purple-200 text-purple-700'}
                        >
                          {backup.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>{new Date(backup.date).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(backup.status)}>
                          {backup.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => restoreBackup(backup.id)}
                            disabled={isRestoring || backup.status !== 'completed'}
                          >
                            {isRestoring ? (
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Upload className="h-4 w-4 mr-1" />
                            )}
                            Restore
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Backup Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Current Schedule</h3>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Daily Backup - Enabled</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Every day at 02:00 AM</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Weekly Full Backup - Enabled</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Every Sunday at 01:00 AM</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Retention Policy</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg border">
                    <ul className="space-y-2 text-sm">
                      <li>• Keep daily backups for 30 days</li>
                      <li>• Keep weekly backups for 12 weeks</li>
                      <li>• Keep monthly backups for 12 months</li>
                      <li>• Auto-delete older backups</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Modify Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Backup Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Storage Settings</h3>
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Local Storage</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cloud Storage</span>
                      <Badge variant="outline">Configure</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Encryption</span>
                      <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Notification Settings</h3>
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Email Notifications</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Failure Alerts</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Reports</span>
                      <Badge variant="outline">Weekly</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}