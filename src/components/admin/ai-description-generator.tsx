'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy, RefreshCw, Sparkles, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface PropertyDetails {
  propertyType: 'Residential' | 'Commercial' | '';
  bedrooms: string;
  bathrooms: string;
  area: string;
  location: string;
  keyFeatures: string;
  style: 'professional' | 'luxury' | 'family-friendly' | 'modern' | '';
}

interface AIGeneratorProps {
  onGenerated: (description: string) => void;
  currentDescription?: string;
}

export function AIPropertyDescriptionGenerator({ onGenerated, currentDescription }: AIGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [details, setDetails] = useState<PropertyDetails>({
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    keyFeatures: '',
    style: ''
  });

  const generateDescription = async () => {
    if (!details.propertyType || !details.location) {
      toast.error('Please fill in property type and location');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation (in production, this would call OpenAI API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const descriptions = {
        'Residential-luxury': `Discover luxury living at its finest in this stunning ${details.bedrooms}-bedroom, ${details.bathrooms}-bathroom residence spanning ${details.area} square feet. Located in the prestigious ${details.location}, this architectural masterpiece seamlessly blends sophisticated design with modern comfort. 

${details.keyFeatures ? `Featuring ${details.keyFeatures.toLowerCase()}, ` : ''}this exceptional property offers an unparalleled lifestyle experience. Every detail has been meticulously crafted to create spaces that inspire and delight. The open-concept living areas flow effortlessly, creating the perfect environment for both intimate gatherings and grand entertaining.

With premium finishes throughout and state-of-the-art amenities, this residence represents the pinnacle of luxury living. The thoughtfully designed spaces maximize natural light while maintaining privacy and tranquility. This is more than a home – it's a sanctuary where memories are made and dreams come true.`,

        'Commercial-professional': `Prime commercial opportunity in the heart of ${details.location}. This ${details.area} square feet ${details.propertyType.toLowerCase()} space offers exceptional visibility and accessibility for discerning business owners.

${details.keyFeatures ? `Key features include ${details.keyFeatures.toLowerCase()}, ` : ''}providing the perfect foundation for your business success. The strategic location ensures high foot traffic and excellent connectivity to major transportation networks.

This well-maintained property features modern infrastructure and flexible floor plans that can be customized to meet your specific business requirements. With ample parking and professional-grade facilities, this space is ideal for retail, office, or mixed-use applications.`,

        'Residential-family-friendly': `Welcome to your family's new haven! This charming ${details.bedrooms}-bedroom, ${details.bathrooms}-bathroom home in ${details.location} offers ${details.area} square feet of comfortable living space designed with families in mind.

${details.keyFeatures ? `Enjoy wonderful amenities including ${details.keyFeatures.toLowerCase()}, ` : ''}perfect for creating lasting family memories. The home features safe, welcoming spaces where children can play and grow, while parents can relax and unwind.

The thoughtfully designed layout promotes family togetherness while providing everyone with their own special spaces. Located in a family-friendly neighborhood with excellent schools and parks nearby, this home offers the perfect blend of comfort, convenience, and community.`,

        'default': `Exceptional property opportunity in ${details.location}. This well-appointed ${details.propertyType.toLowerCase()} features ${details.area} square feet of versatile space${details.bedrooms ? ` with ${details.bedrooms} bedrooms and ${details.bathrooms} bathrooms` : ''}.

${details.keyFeatures ? `Notable features include ${details.keyFeatures.toLowerCase()}, ` : ''}enhancing both functionality and appeal. The property combines modern conveniences with timeless design elements, creating spaces that are both practical and inspiring.

Strategically positioned to offer convenience and accessibility, this property represents an excellent opportunity for discerning buyers. Whether for investment or personal use, this exceptional property delivers on all fronts.`
      };

      const key = details.style && details.propertyType 
        ? `${details.propertyType}-${details.style}`
        : 'default';
        
      const description = descriptions[key as keyof typeof descriptions] || descriptions.default;
      setGeneratedText(description);
      
    } catch (error) {
      toast.error('Failed to generate description. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast.success('Description copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const useDescription = () => {
    onGenerated(generatedText);
    setIsOpen(false);
    toast.success('Description applied to property form!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30"
        >
          <Wand2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <Sparkles className="h-3 w-3 text-pink-600 dark:text-pink-400" />
          AI Generate
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            AI Property Description Generator
            <Badge variant="secondary" className="ml-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              Beta
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          {/* Input Form */}
          <Card className="overflow-y-auto scrollbar-thin">
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property Type</Label>
                  <Select value={details.propertyType} onValueChange={(value) => setDetails(prev => ({ ...prev, propertyType: value as 'Residential' | 'Commercial' }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">🏠 Residential</SelectItem>
                      <SelectItem value="Commercial">🏢 Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Writing Style</Label>
                  <Select value={details.style} onValueChange={(value) => setDetails(prev => ({ ...prev, style: value as any }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">💼 Professional</SelectItem>
                      <SelectItem value="luxury">💎 Luxury</SelectItem>
                      <SelectItem value="family-friendly">👨‍👩‍👧‍👦 Family-Friendly</SelectItem>
                      <SelectItem value="modern">🏗️ Modern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {details.propertyType === 'Residential' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bedrooms</Label>
                    <Input
                      value={details.bedrooms}
                      onChange={(e) => setDetails(prev => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="e.g., 3"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Bathrooms</Label>
                    <Input
                      value={details.bathrooms}
                      onChange={(e) => setDetails(prev => ({ ...prev, bathrooms: e.target.value }))}
                      placeholder="e.g., 2"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Area (sq ft)</Label>
                  <Input
                    value={details.area}
                    onChange={(e) => setDetails(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g., 2500"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={details.location}
                    onChange={(e) => setDetails(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Key Features</Label>
                <Textarea
                  value={details.keyFeatures}
                  onChange={(e) => setDetails(prev => ({ ...prev, keyFeatures: e.target.value }))}
                  placeholder="e.g., Swimming pool, gymnasium, garden, parking, 24/7 security"
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <Button 
                onClick={generateDescription} 
                disabled={isGenerating || !details.propertyType || !details.location}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Description
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Output */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Generated Description
                {generatedText && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" onClick={useDescription} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Use This
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedText ? (
                <div className="h-[400px] overflow-y-auto scrollbar-thin">
                  <Textarea
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    className="min-h-[380px] resize-none border-none p-0 focus:ring-0 bg-transparent"
                    placeholder="Generated description will appear here..."
                  />
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                    <p>Fill in the property details and click "Generate Description" to create AI-powered content</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}