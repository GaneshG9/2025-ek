import { settingsService, pageService } from '@/lib/local-database';
import { PageContent, WebsiteSettings } from '@/types/database';

export async function initializeDefaultContent() {
  try {
    // Initialize default website settings
    const defaultSettings: Omit<WebsiteSettings, 'id'> = {
      siteName: 'Your Business Name',
      siteDescription: 'We provide real estate, solar solutions, and digital marketing services.',
      contactEmail: 'contact@yourbusiness.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345',
      socialMedia: {
        facebook: 'https://facebook.com/yourbusiness',
        twitter: 'https://twitter.com/yourbusiness',
        instagram: 'https://instagram.com/yourbusiness',
        linkedin: 'https://linkedin.com/company/yourbusiness'
      },
      logoUrl: '',
      faviconUrl: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      updatedAt: new Date()
    };

    await settingsService.update(defaultSettings);

    // Initialize default pages
    const defaultPages: Omit<PageContent, 'id'>[] = [
      {
        pageName: 'Home',
        pageSlug: 'home',
        metaTitle: 'Home - Your Business',
        metaDescription: 'Welcome to our multi-service platform offering real estate, solar, and digital marketing solutions.',
        isActive: true,
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'Welcome to Our Multi-Service Platform',
            content: 'We provide comprehensive real estate services, solar energy solutions, and digital marketing expertise to help you succeed.',
            imageUrl: '',
            buttonText: 'Explore Our Services',
            buttonLink: '#services',
            order: 1,
            isVisible: true
          },
          {
            id: '2',
            type: 'features',
            title: 'Our Services',
            content: 'Discover our range of professional services designed to meet your needs.',
            order: 2,
            isVisible: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pageName: 'About Us',
        pageSlug: 'about-us',
        metaTitle: 'About Us - Your Business',
        metaDescription: 'Learn more about our company, team, and commitment to excellence.',
        isActive: true,
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'About Our Company',
            content: 'We are a leading provider of integrated services including real estate, solar energy solutions, and digital marketing.',
            order: 1,
            isVisible: true
          },
          {
            id: '2',
            type: 'content',
            title: 'Our Mission',
            content: 'To provide exceptional service and innovative solutions that help our clients achieve their goals.',
            order: 2,
            isVisible: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pageName: 'Real Estate',
        pageSlug: 'real-estate',
        metaTitle: 'Real Estate Services - Find Your Dream Home',
        metaDescription: 'Explore our extensive real estate listings and professional services.',
        isActive: true,
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'Find Your Perfect Property',
            content: 'Browse our curated selection of properties and let our expert agents guide you home.',
            buttonText: 'View Properties',
            buttonLink: '/properties',
            order: 1,
            isVisible: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pageName: 'Solar Solutions',
        pageSlug: 'solar',
        metaTitle: 'Solar Energy Solutions - Clean Power for Your Home',
        metaDescription: 'Harness the power of the sun with our comprehensive solar energy solutions.',
        isActive: true,
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'Solar Energy Solutions',
            content: 'Reduce your energy costs and environmental impact with our professional solar installation services.',
            buttonText: 'Get Free Quote',
            buttonLink: '#quote',
            order: 1,
            isVisible: true
          },
          {
            id: '2',
            type: 'features',
            title: 'Why Choose Solar?',
            content: 'Save money, increase property value, and reduce your carbon footprint.',
            order: 2,
            isVisible: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pageName: 'Digital Marketing',
        pageSlug: 'digital-marketing',
        metaTitle: 'Digital Marketing Services - Grow Your Business Online',
        metaDescription: 'Boost your online presence with our comprehensive digital marketing services.',
        isActive: true,
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'Digital Marketing Excellence',
            content: 'Grow your business with our proven digital marketing strategies and expert team.',
            buttonText: 'Get Started',
            buttonLink: '#contact',
            order: 1,
            isVisible: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Create each default page
    for (const page of defaultPages) {
      await pageService.create(page);
    }

    console.log('Default content initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing default content:', error);
    return false;
  }
}