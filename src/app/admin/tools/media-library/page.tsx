'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Image, Video, FileText, Download, Trash2, Eye, Edit, Search, Filter, Grid3X3, List } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  dimensions?: string;
  uploadDate: string;
  category: string;
  tags: string[];
  url: string;
}

export default function MediaLibrary() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const mediaFiles: MediaFile[] = [
    {
      id: 'IMG001',
      name: 'luxury-villa-exterior.jpg',
      type: 'image',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2025-09-27',
      category: 'Property Photos',
      tags: ['villa', 'luxury', 'exterior'],
      url: '/images/property1.jpg'
    },
    {
      id: 'IMG002',
      name: 'apartment-living-room.jpg',
      type: 'image',
      size: '1.8 MB',
      dimensions: '1600x900',
      uploadDate: '2025-09-26',
      category: 'Property Photos',
      tags: ['apartment', 'interior', 'living room'],
      url: '/images/property2.jpg'
    },
    {
      id: 'VID001',
      name: 'property-tour-video.mp4',
      type: 'video',
      size: '45.2 MB',
      dimensions: '1920x1080',
      uploadDate: '2025-09-25',
      category: 'Property Videos',
      tags: ['tour', 'walkthrough', 'villa'],
      url: '/videos/property-tour.mp4'
    },
    {
      id: 'DOC001',
      name: 'property-brochure.pdf',
      type: 'document',
      size: '5.2 MB',
      uploadDate: '2025-09-24',
      category: 'Marketing Materials',
      tags: ['brochure', 'marketing', 'pdf'],
      url: '/documents/brochure.pdf'
    },
    {
      id: 'IMG003',
      name: 'solar-panel-installation.jpg',
      type: 'image',
      size: '3.1 MB',
      dimensions: '2048x1536',
      uploadDate: '2025-09-23',
      category: 'Solar Projects',
      tags: ['solar', 'installation', 'rooftop'],
      url: '/images/solar1.jpg'
    },
    {
      id: 'IMG004',
      name: 'office-space-interior.jpg',
      type: 'image',
      size: '2.7 MB',
      dimensions: '1800x1200',
      uploadDate: '2025-09-22',
      category: 'Commercial Properties',
      tags: ['office', 'commercial', 'interior'],
      url: '/images/office1.jpg'
    },
    {
      id: 'VID002',
      name: 'solar-animation.mp4',
      type: 'video',
      size: '28.5 MB',
      dimensions: '1280x720',
      uploadDate: '2025-09-21',
      category: 'Solar Marketing',
      tags: ['solar', 'animation', 'marketing'],
      url: '/videos/solar-animation.mp4'
    },
    {
      id: 'DOC002',
      name: 'floor-plan-3bhk.pdf',
      type: 'document',
      size: '1.9 MB',
      uploadDate: '2025-09-20',
      category: 'Floor Plans',
      tags: ['floor plan', '3bhk', 'layout'],
      url: '/documents/floor-plan.pdf'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      image: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      video: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      document: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    return variants[type as keyof typeof variants] || variants.document;
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter;
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = Array.from(new Set(mediaFiles.map(file => file.category)));
  const stats = {
    total: mediaFiles.length,
    images: mediaFiles.filter(f => f.type === 'image').length,
    videos: mediaFiles.filter(f => f.type === 'video').length,
    documents: mediaFiles.filter(f => f.type === 'document').length,
    totalSize: '89.8 MB'
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
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
            <Image className="h-8 w-8 text-purple-600" />
            Media Library
          </h1>
          <p className="text-muted-foreground">Manage your property photos, videos, and documents</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Images</p>
                <p className="text-2xl font-bold text-blue-600">{stats.images}</p>
              </div>
              <Image className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold text-red-600">{stats.videos}</p>
              </div>
              <Video className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold text-green-600">{stats.documents}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalSize}</p>
              </div>
              <Upload className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search files by name or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <span className="text-sm font-medium">{selectedFiles.length} files selected</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Files ({filteredFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                    {file.type === 'image' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-blue-600" />
                      </div>
                    ) : file.type === 'video' ? (
                      <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center">
                        <Video className="h-8 w-8 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {getFileIcon(file.type)}
                      <Badge className={getTypeBadge(file.type)}>
                        {file.type}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                    {file.dimensions && (
                      <p className="text-xs text-muted-foreground">{file.dimensions}</p>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {file.category}
                    </Badge>
                  </div>

                  <div className="flex gap-1 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 ${
                    selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeBadge(file.type)}>
                          {file.type}
                        </Badge>
                        <Badge variant="outline">
                          {file.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                        {file.dimensions && (
                          <span className="text-xs text-muted-foreground">{file.dimensions}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{file.uploadDate}</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}