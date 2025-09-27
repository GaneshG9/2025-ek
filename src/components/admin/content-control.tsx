'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Save, 
    Eye, 
    Edit, 
    Trash2, 
    Plus, 
    ArrowUp, 
    ArrowDown,
    Type,
    Image as ImageIcon,
    Layout,
    Star
} from "lucide-react";
import toast from 'react-hot-toast';

interface ContentSection {
    id: string;
    type: 'hero' | 'content' | 'features' | 'gallery' | 'testimonials';
    title: string;
    content: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
    order: number;
    isVisible: boolean;
}

interface ContentControlProps {
    pageName: string;
    sections: ContentSection[];
    onSave: (sections: ContentSection[]) => void;
}

const sectionTypeIcons = {
    hero: Layout,
    content: Type,
    features: Star,
    gallery: ImageIcon,
    testimonials: Star
};

const sectionTypeColors = {
    hero: 'bg-blue-100 text-blue-800',
    content: 'bg-green-100 text-green-800',
    features: 'bg-purple-100 text-purple-800',
    gallery: 'bg-orange-100 text-orange-800',
    testimonials: 'bg-pink-100 text-pink-800'
};

export function ContentControl({ pageName, sections: initialSections, onSave }: ContentControlProps) {
    const [sections, setSections] = useState<ContentSection[]>(initialSections);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(JSON.stringify(sections) !== JSON.stringify(initialSections));
    }, [sections, initialSections]);

    const addSection = (type: ContentSection['type']) => {
        const newSection: ContentSection = {
            id: Date.now().toString(),
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
            content: 'Enter your content here...',
            order: sections.length + 1,
            isVisible: true
        };

        setSections(prev => [...prev, newSection]);
        setSelectedSection(newSection.id);
        toast.success('New section added');
    };

    const updateSection = (sectionId: string, updates: Partial<ContentSection>) => {
        setSections(prev => prev.map(section =>
            section.id === sectionId ? { ...section, ...updates } : section
        ));
    };

    const deleteSection = (sectionId: string) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            setSections(prev => prev.filter(section => section.id !== sectionId));
            setSelectedSection(null);
            toast.success('Section deleted');
        }
    };

    const moveSection = (sectionId: string, direction: 'up' | 'down') => {
        setSections(prev => {
            const newSections = [...prev];
            const currentIndex = newSections.findIndex(s => s.id === sectionId);
            
            if (direction === 'up' && currentIndex > 0) {
                [newSections[currentIndex], newSections[currentIndex - 1]] = 
                [newSections[currentIndex - 1], newSections[currentIndex]];
            } else if (direction === 'down' && currentIndex < newSections.length - 1) {
                [newSections[currentIndex], newSections[currentIndex + 1]] = 
                [newSections[currentIndex + 1], newSections[currentIndex]];
            }
            
            // Update order numbers
            return newSections.map((section, index) => ({
                ...section,
                order: index + 1
            }));
        });
    };

    const handleSave = () => {
        onSave(sections);
        setHasChanges(false);
        toast.success('Page content saved successfully');
    };

    const selectedSectionData = sections.find(s => s.id === selectedSection);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Content Control</h2>
                    <p className="text-muted-foreground">Edit {pageName} content sections</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={!hasChanges}
                    className={hasChanges ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                    <Save className="h-4 w-4 mr-2" />
                    {hasChanges ? 'Save Changes' : 'Saved'}
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Section List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Page Sections
                            <Badge variant="outline">{sections.length}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {sections.map((section, index) => {
                            const IconComponent = sectionTypeIcons[section.type];
                            return (
                                <div
                                    key={section.id}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                        selectedSection === section.id 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelectedSection(section.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <IconComponent className="h-4 w-4" />
                                            <span className="font-medium text-sm">{section.title}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveSection(section.id, 'up');
                                                }}
                                                disabled={index === 0}
                                            >
                                                <ArrowUp className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveSection(section.id, 'down');
                                                }}
                                                disabled={index === sections.length - 1}
                                            >
                                                <ArrowDown className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge className={`text-xs ${sectionTypeColors[section.type]}`}>
                                            {section.type}
                                        </Badge>
                                        <Switch
                                            checked={section.isVisible}
                                            onCheckedChange={(checked) => 
                                                updateSection(section.id, { isVisible: checked })
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="pt-4">
                            <Label className="text-sm font-medium">Add New Section</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSection('hero')}
                                    className="h-20 flex-col"
                                >
                                    <Layout className="h-5 w-5 mb-1" />
                                    Hero
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSection('content')}
                                    className="h-20 flex-col"
                                >
                                    <Type className="h-5 w-5 mb-1" />
                                    Content
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSection('features')}
                                    className="h-20 flex-col"
                                >
                                    <Star className="h-5 w-5 mb-1" />
                                    Features
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSection('gallery')}
                                    className="h-20 flex-col"
                                >
                                    <ImageIcon className="h-5 w-5 mb-1" />
                                    Gallery
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Editor */}
                <div className="lg:col-span-2">
                    {selectedSectionData ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        {React.createElement(sectionTypeIcons[selectedSectionData.type], { className: "h-5 w-5" })}
                                        Edit Section
                                    </CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => deleteSection(selectedSectionData.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Section Type</Label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedSectionData.type}
                                        onChange={(e) => updateSection(selectedSectionData.id, { 
                                            type: e.target.value as ContentSection['type'] 
                                        })}
                                    >
                                        <option value="hero">Hero Section</option>
                                        <option value="content">Content Section</option>
                                        <option value="features">Features Section</option>
                                        <option value="gallery">Gallery Section</option>
                                        <option value="testimonials">Testimonials</option>
                                    </select>
                                </div>

                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        value={selectedSectionData.title}
                                        onChange={(e) => updateSection(selectedSectionData.id, { 
                                            title: e.target.value 
                                        })}
                                        placeholder="Section title"
                                    />
                                </div>

                                <div>
                                    <Label>Content</Label>
                                    <Textarea
                                        value={selectedSectionData.content}
                                        onChange={(e) => updateSection(selectedSectionData.id, { 
                                            content: e.target.value 
                                        })}
                                        placeholder="Section content"
                                        rows={4}
                                    />
                                </div>

                                {selectedSectionData.type === 'hero' && (
                                    <>
                                        <div>
                                            <Label>Button Text</Label>
                                            <Input
                                                value={selectedSectionData.buttonText || ''}
                                                onChange={(e) => updateSection(selectedSectionData.id, { 
                                                    buttonText: e.target.value 
                                                })}
                                                placeholder="Call to action text"
                                            />
                                        </div>
                                        <div>
                                            <Label>Button Link</Label>
                                            <Input
                                                value={selectedSectionData.buttonLink || ''}
                                                onChange={(e) => updateSection(selectedSectionData.id, { 
                                                    buttonLink: e.target.value 
                                                })}
                                                placeholder="/path or https://example.com"
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <Label>Background Image URL (Optional)</Label>
                                    <Input
                                        value={selectedSectionData.imageUrl || ''}
                                        onChange={(e) => updateSection(selectedSectionData.id, { 
                                            imageUrl: e.target.value 
                                        })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={selectedSectionData.isVisible}
                                        onCheckedChange={(checked) => updateSection(selectedSectionData.id, { 
                                            isVisible: checked 
                                        })}
                                    />
                                    <Label>Section Visible</Label>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Layout className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    <p className="text-muted-foreground">Select a section to edit</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}