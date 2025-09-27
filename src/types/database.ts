export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  images: string[];
  features: string[];
  status: 'active' | 'sold' | 'pending' | 'inactive';
  agentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageContent {
  id: string;
  pageName: string;
  pageSlug: string;
  sections: PageSection[];
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'content' | 'features' | 'testimonials' | 'contact' | 'gallery' | 'pricing';
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  isVisible: boolean;
  customData?: Record<string, any>;
}

export interface SolarLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  estimatedBill: number;
  roofType: string;
  propertyType: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DigitalMarketingLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  services: string[];
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal' | 'client' | 'lost';
  createdAt: Date;
  updatedAt: Date;
}

export interface WebsiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  updatedAt: Date;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: string; // which page the form was submitted from
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}