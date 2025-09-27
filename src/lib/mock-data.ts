// Mock data for local development

export const mockProperties = [
  {
    id: '1',
    title: 'Modern Family Home',
    price: 450000,
    location: 'Downtown',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: 'active',
    lat: 40.7128,
    lng: -74.0060,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Luxury Apartment',
    price: 650000,
    location: 'Uptown',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: 'active',
    lat: 40.7589,
    lng: -73.9851,
    createdAt: new Date().toISOString()
  }
];

export const mockUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Admin',
    email: 'admin@example.com',
    role: 'owner',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Agent',
    email: 'agent@example.com',
    role: 'agent',
    createdAt: new Date().toISOString()
  }
];

export const mockContacts = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '555-0123',
    message: 'Interested in property listings',
    status: 'new',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '555-0456',
    message: 'Looking for a family home',
    status: 'contacted',
    createdAt: new Date().toISOString()
  }
];

export const mockSolarLeads = [
  {
    id: '1',
    firstName: 'David',
    lastName: 'Smith',
    email: 'david@example.com',
    phone: '555-0789',
    address: '123 Solar St',
    electricBill: 200,
    homeOwner: true,
    status: 'qualified',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Lisa',
    lastName: 'Brown',
    email: 'lisa@example.com',
    phone: '555-0321',
    address: '456 Green Ave',
    electricBill: 150,
    homeOwner: true,
    status: 'new',
    createdAt: new Date().toISOString()
  }
];

export const mockMarketingLeads = [
  {
    id: '1',
    companyName: 'Tech Solutions Inc',
    contactName: 'Robert Wilson',
    email: 'robert@techsolutions.com',
    phone: '555-0654',
    service: 'SEO',
    budget: '$5000',
    status: 'qualified',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    companyName: 'Local Restaurant',
    contactName: 'Maria Garcia',
    email: 'maria@restaurant.com',
    phone: '555-0987',
    service: 'Social Media Marketing',
    budget: '$2000',
    status: 'new',
    createdAt: new Date().toISOString()
  }
];

export const mockPageContent = [
  {
    id: '1',
    title: 'Homepage',
    slug: 'home',
    content: 'Welcome to our website',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about',
    content: 'Learn more about our company',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];