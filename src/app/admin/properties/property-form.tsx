
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AIPropertyDescriptionGenerator } from '@/components/admin/ai-description-generator';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image, MessageCircle, Phone, Mail, Workflow } from 'lucide-react';
import { useState, useRef } from 'react';
import { type Property } from './page';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  price: z.string().min(1, { message: 'Price is required.' }),
  sqft: z.string().min(2, { message: 'Square footage is required.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  location: z.string().min(5, { message: 'Location is required.' }),
  category: z.enum(['Residential', 'Commercial']),
  propertyType: z.enum(['Plot', 'Flat', 'Rental', 'Apartment', 'Villa', 'Home']),
  status: z.string().min(1, { message: 'Status is required.' }),
  amenities: z.string().min(3, { message: 'Enter at least one amenity.' }),
  highlights: z.string().optional(),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string()).max(25, { message: 'Maximum 25 images allowed' }).optional(),
  imageIds: z.array(z.string()).optional(),
  videoUrls: z.array(z.string().url()).max(5, { message: 'Maximum 5 videos allowed' }).optional(),
  attachments: z.array(z.string()).max(10, { message: 'Maximum 10 attachments allowed' }).optional(),
  communicationPreference: z.enum(['phone', 'email', 'whatsapp', 'all']),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  whatsappNumber: z.string().optional(),
  n8nWebhookUrl: z.string().url().optional().or(z.literal('')),
  autoNotify: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof formSchema>;

interface PropertyFormProps {
  property: Property | null;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
}

export function PropertyForm({ property, onSubmit, onCancel }: PropertyFormProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(property?.imageIds || []);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property?.title || '',
      price: property?.price || '',
      sqft: property?.sqft.toString() || '',
      description: property?.description || '',
      location: property?.location.address || '',
      category: property?.category || 'Residential',
      propertyType: property?.propertyType || 'Apartment',
      status: property?.status || 'For Sale',
      amenities: property?.amenities.join(', ') || '',
      highlights: property?.highlights?.join(', ') || '',
      youtubeUrl: property?.youtubeUrl || '',
      instagramUrl: property?.instagramUrl || '',
      images: property?.imageIds || [],
      communicationPreference: 'all',
      contactPhone: '',
      contactEmail: '',
      whatsappNumber: '',
      n8nWebhookUrl: '',
      autoNotify: true,
    },
  });

  const handleImageUpload = async (files: FileList) => {
    if (uploadedImages.length + files.length > 25) {
      toast.error('Maximum 25 images allowed per property');
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          // To avoid localStorage quota issues, use placeholder images instead of base64
          // In production, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
          const placeholderImages = ['property1', 'property2', 'property3', 'property4'];
          const randomPlaceholder = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
          
          // Store filename for reference but use placeholder for display
          const imageReference = `uploaded_${file.name}_${Date.now()}_${randomPlaceholder}`;
          newImages.push(imageReference);
          
          console.log(`📸 Image "${file.name}" uploaded, using placeholder "${randomPlaceholder}"`);
        }
      }

      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      form.setValue('images', updatedImages);
      toast.success(`${newImages.length} image(s) uploaded successfully (using placeholders to prevent storage issues)`);
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    form.setValue('images', updatedImages);
    toast.success('Image removed');
  };

  const triggerN8nWebhook = async (propertyData: PropertyFormData) => {
    const webhookUrl = form.getValues('n8nWebhookUrl');
    if (webhookUrl && form.getValues('autoNotify')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'property_updated',
            property: propertyData,
            timestamp: new Date().toISOString(),
            images: uploadedImages,
          }),
        });
        toast.success('n8n workflow triggered successfully');
      } catch (error) {
        toast.error('Failed to trigger n8n workflow');
      }
    }
  };

  const handleSubmit = async (data: PropertyFormData) => {
    data.images = uploadedImages;
    data.imageIds = uploadedImages; // Include imageIds for database storage
    await triggerN8nWebhook(data);
    onSubmit(data);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Property Title *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Luxury Beachfront Villa with Ocean Views" 
                  className="min-h-[44px] resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Price *</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="e.g., ₹2.5 Crore" 
                      className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-green-500"
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="sqft"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Area (sq. ft.) *</FormLabel>
                <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 3200" 
                      className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-green-500"
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel className="text-sm font-medium">Property Description *</FormLabel>
                <AIPropertyDescriptionGenerator 
                  onGenerated={(description) => form.setValue('description', description)}
                  currentDescription={field.value}
                />
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Provide a detailed description of the property including key features, room details, and unique selling points. Or use the AI generator to create professional descriptions..."
                  className="min-h-[120px] max-h-[300px] resize-y transition-all duration-200 focus:ring-2 focus:ring-purple-500 overflow-y-auto"
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                {field.value?.length || 0} characters (minimum 10 required) • AI-powered descriptions available
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Location Address *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Juhu, Mumbai, Maharashtra, India" 
                  className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium">Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Residential">🏠 Residential</SelectItem>
                                <SelectItem value="Commercial">🏢 Commercial</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium">Property Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Plot">🏞️ Plot</SelectItem>
                                <SelectItem value="Flat">🏠 Flat</SelectItem>
                                <SelectItem value="Rental">🏘️ Rental</SelectItem>
                                <SelectItem value="Apartment">🏢 Apartment</SelectItem>
                                <SelectItem value="Villa">🏰 Villa</SelectItem>
                                <SelectItem value="Home">🏡 Home</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-sm font-medium">Property Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select current status" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="For Sale">🏷️ For Sale</SelectItem>
                                <SelectItem value="New">✨ New Listing</SelectItem>
                                <SelectItem value="Reduced">📉 Price Reduced</SelectItem>
                                <SelectItem value="Under Contract">📋 Under Contract</SelectItem>
                                <SelectItem value="Sold">✅ Sold</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Property Amenities</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List property amenities (comma-separated):&#10;e.g., Swimming Pool, Gymnasium, Garden, Parking, Security, Clubhouse, Children's Play Area, Lift, Power Backup, Water Supply"
                  className="min-h-[80px] max-h-[200px] resize-y transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Separate each amenity with a comma. This helps buyers understand available facilities.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="highlights"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Location Highlights & Nearby</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Key location highlights and nearby places (comma-separated):&#10;e.g., Chhatrapati Shivaji Maharaj International Airport: 8km, Juhu Beach: 1km, Central Market: 500m, Metro Station: 2km, Schools: 300m, Hospitals: 1km"
                  className="min-h-[80px] max-h-[200px] resize-y transition-all duration-200 focus:ring-2 focus:ring-yellow-500"
                  {...field} 
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Include distances to key landmarks, transportation, schools, hospitals, and shopping areas.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="youtubeUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">📹 YouTube Video URL (optional)</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-red-500"
                      {...field} 
                    />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  Add a property tour or promotional video link
                </p>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">📸 Instagram Profile URL (optional)</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="https://www.instagram.com/..." 
                      className="min-h-[44px] transition-all duration-200 focus:ring-2 focus:ring-pink-500"
                      {...field} 
                    />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  Link to Instagram profile with more property photos
                </p>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        {/* Image Upload Section */}
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-600" />
              Property Images (Max 25)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                <Badge className="mt-2">
                  {uploadedImages.length}/25 images
                </Badge>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
              
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-64 overflow-y-auto">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Communication Options */}
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Communication Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="communicationPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Communication Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select communication method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="phone">📞 Phone Only</SelectItem>
                      <SelectItem value="email">📧 Email Only</SelectItem>
                      <SelectItem value="whatsapp">💬 WhatsApp Only</SelectItem>
                      <SelectItem value="all">🌐 All Methods</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Phone
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* n8n Integration */}
        <Card className="border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-purple-600" />
              n8n Workflow Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="n8nWebhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>n8n Webhook URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://your-n8n-instance.com/webhook/property-updates" 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Connect to n8n for automated workflows, notifications, and integrations
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="autoNotify"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Auto-trigger n8n workflow on property updates
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                <strong>n8n Integration Benefits:</strong>
              </p>
              <ul className="text-xs text-purple-600 dark:text-purple-400 mt-1 space-y-1">
                <li>• Automatic lead notifications to CRM systems</li>
                <li>• Social media posting for new properties</li>
                <li>• Email marketing campaign triggers</li>
                <li>• Integration with external property portals</li>
                <li>• Custom workflow automations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900 mt-6">
          <Button type="button" variant="outline" onClick={onCancel} className="min-w-[100px]">
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="min-w-[120px]"
            disabled={isUploading}
          >
            {isUploading ? '⏳ Uploading...' : property ? '💾 Save Changes' : '✨ Create Property'}
          </Button>
        </div>
        </form>
      </Form>
    </div>
  );
}
