// Local development services using localStorage
import { 
  mockProperties, 
  mockUsers, 
  mockContacts, 
  mockSolarLeads, 
  mockMarketingLeads, 
  mockPageContent 
} from './mock-data';

class LocalStorageService {
  private getStorageKey(collection: string): string {
    return `local_dev_${collection}`;
  }

  private getCollection<T>(collection: string, mockData: T[]): T[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(collection));
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with mock data if not found
      localStorage.setItem(this.getStorageKey(collection), JSON.stringify(mockData));
      return mockData;
    } catch (error) {
      console.log(`Local storage error for ${collection}, using mock data:`, error);
      return mockData;
    }
  }

  private setCollection<T>(collection: string, data: T[]): void {
    try {
      localStorage.setItem(this.getStorageKey(collection), JSON.stringify(data));
    } catch (error) {
      console.log(`Local storage save error for ${collection}:`, error);
    }
  }

  // Property Services
  async getAllProperties() {
    return this.getCollection('properties', mockProperties);
  }

  async getProperty(id: string) {
    const properties = await this.getAllProperties();
    return properties.find(p => p.id === id);
  }

  async addProperty(property: any) {
    const properties = await this.getAllProperties();
    const newProperty = { ...property, id: Date.now().toString() };
    properties.push(newProperty);
    this.setCollection('properties', properties);
    return newProperty;
  }

  async updateProperty(id: string, updates: any) {
    const properties = await this.getAllProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index >= 0) {
      properties[index] = { ...properties[index], ...updates };
      this.setCollection('properties', properties);
      return properties[index];
    }
    throw new Error('Property not found');
  }

  async deleteProperty(id: string) {
    const properties = await this.getAllProperties();
    const filtered = properties.filter(p => p.id !== id);
    this.setCollection('properties', filtered);
  }

  // User Services
  async getAllUsers() {
    return this.getCollection('users', mockUsers);
  }

  async getUser(id: string) {
    const users = await this.getAllUsers();
    return users.find(u => u.id === id);
  }

  async getUserByEmail(email: string) {
    const users = await this.getAllUsers();
    return users.find(u => u.email === email);
  }

  // Contact Services
  async getAllContactForms() {
    return this.getCollection('contacts', mockContacts);
  }

  async addContactForm(contact: any) {
    const contacts = await this.getAllContactForms();
    const newContact = { 
      ...contact, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    this.setCollection('contacts', contacts);
    return newContact;
  }

  // Solar Lead Services
  async getAllSolarLeads() {
    return this.getCollection('solarLeads', mockSolarLeads);
  }

  async addSolarLead(lead: any) {
    const leads = await this.getAllSolarLeads();
    const newLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    this.setCollection('solarLeads', leads);
    return newLead;
  }

  // Marketing Lead Services
  async getAllMarketingLeads() {
    return this.getCollection('marketingLeads', mockMarketingLeads);
  }

  async addMarketingLead(lead: any) {
    const leads = await this.getAllMarketingLeads();
    const newLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    this.setCollection('marketingLeads', leads);
    return newLead;
  }

  // Page Content Services
  async getAllPageContent() {
    return this.getCollection('pageContent', mockPageContent);
  }

  async getPageContent(slug: string) {
    const pages = await this.getAllPageContent();
    return pages.find(p => p.slug === slug);
  }

  async updatePageContent(id: string, updates: any) {
    const pages = await this.getAllPageContent();
    const index = pages.findIndex(p => p.id === id);
    if (index >= 0) {
      pages[index] = { ...pages[index], ...updates };
      this.setCollection('pageContent', pages);
      return pages[index];
    }
    throw new Error('Page not found');
  }
}

// Create singleton instance
export const localStorageService = new LocalStorageService();

// Export individual services for compatibility
export const PropertyService = {
  getAllProperties: () => localStorageService.getAllProperties(),
  getProperty: (id: string) => localStorageService.getProperty(id),
  addProperty: (property: any) => localStorageService.addProperty(property),
  updateProperty: (id: string, updates: any) => localStorageService.updateProperty(id, updates),
  deleteProperty: (id: string) => localStorageService.deleteProperty(id)
};

export const UserService = {
  getAllUsers: () => localStorageService.getAllUsers(),
  getUser: (id: string) => localStorageService.getUser(id),
  getUserByEmail: (email: string) => localStorageService.getUserByEmail(email)
};

export const ContactFormService = {
  getAllContactForms: () => localStorageService.getAllContactForms(),
  addContactForm: (contact: any) => localStorageService.addContactForm(contact)
};

export const SolarLeadService = {
  getAllLeads: () => localStorageService.getAllSolarLeads(),
  addLead: (lead: any) => localStorageService.addSolarLead(lead)
};

export const DigitalMarketingLeadService = {
  getAllLeads: () => localStorageService.getAllMarketingLeads(),
  addLead: (lead: any) => localStorageService.addMarketingLead(lead)
};

export const PageContentService = {
  getAllPageContent: () => localStorageService.getAllPageContent(),
  getPageContent: (slug: string) => localStorageService.getPageContent(slug),
  updatePageContent: (id: string, updates: any) => localStorageService.updatePageContent(id, updates)
};