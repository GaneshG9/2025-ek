// Local Storage Database Service - Replaces Firebase for development
class LocalStorageService {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
  
  private getStorageKey(collectionName: string): string {
    return `local_db_${collectionName}`;
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCachedData(key: string, data: any, customTTL?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: customTTL || this.CACHE_TTL
    });
  }

  private invalidateCache(pattern?: string): void {
    if (pattern) {
      const keysToDelete = Array.from(this.cache.keys()).filter(key => key.includes(pattern));
      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
  }

  private checkStorageQuota(): void {
    try {
      // Check available storage space
      const testKey = 'quota_test';
      const testData = 'x'.repeat(1024 * 1024); // 1MB test
      localStorage.setItem(testKey, testData);
      localStorage.removeItem(testKey);
    } catch (e) {
      // Storage is nearly full, clean up old data
      this.cleanupOldData();
    }
  }

  private cleanupOldData(): void {
    console.log('🧹 Cleaning up localStorage to free space...');
    
    // Remove old properties if more than 10
    const propertiesKey = this.getStorageKey('properties');
    const existingData = JSON.parse(localStorage.getItem(propertiesKey) || '[]');
    
    if (existingData.length > 10) {
      // Keep only the 10 most recent properties
      const sortedData = existingData
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
      
      localStorage.setItem(propertiesKey, JSON.stringify(sortedData));
      console.log(`Reduced properties from ${existingData.length} to ${sortedData.length}`);
    }
    
    // Clear other non-essential data
    const keysToClean = ['local_db_analytics', 'local_db_messages', 'local_db_notifications'];
    keysToClean.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`Cleaned up ${key}`);
      }
    });
  }

  private optimizeImageData(data: any): any {
    // If property has large imageIds (base64), replace with placeholder references
    if (data.imageIds && Array.isArray(data.imageIds)) {
      data.imageIds = data.imageIds.map((imageId: string, index: number) => {
        // If it's a large base64 image, replace with placeholder
        if (imageId.startsWith('data:image') && imageId.length > 50000) {
          console.log('🖼️ Replacing large image with placeholder to save storage');
          return `property${(index % 4) + 1}`; // Use placeholder images
        }
        return imageId;
      });
    }
    return data;
  }

  async add(collectionName: string, data: any): Promise<string> {
    try {
      this.checkStorageQuota();
      
      const storageKey = this.getStorageKey(collectionName);
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const id = this.generateId();
      
      // Optimize data to reduce storage usage
      const optimizedData = this.optimizeImageData({ ...data });
      
      const newRecord = {
        ...optimizedData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      existingData.push(newRecord);
      localStorage.setItem(storageKey, JSON.stringify(existingData));
      return id;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('📦 Storage quota exceeded. Attempting cleanup...');
        this.cleanupOldData();
        
        // Try again after cleanup
        try {
          const storageKey = this.getStorageKey(collectionName);
          const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
          const id = this.generateId();
          const optimizedData = this.optimizeImageData({ ...data });
          
          const newRecord = {
            ...optimizedData,
            id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          existingData.push(newRecord);
          localStorage.setItem(storageKey, JSON.stringify(existingData));
          return id;
        } catch (retryError) {
          throw new Error('Storage quota exceeded even after cleanup. Please reduce data size or use external storage.');
        }
      }
      throw error;
    }
  }

  async get(collectionName: string, id: string): Promise<any | null> {
    const cacheKey = `${collectionName}_${id}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    const storageKey = this.getStorageKey(collectionName);
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const result = existingData.find((item: any) => item.id === id) || null;
    
    if (result) {
      this.setCachedData(cacheKey, result);
    }
    return result;
  }

  async getAll(collectionName: string): Promise<any[]> {
    const cacheKey = `${collectionName}_all`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    const storageKey = this.getStorageKey(collectionName);
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const sorted = existingData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    this.setCachedData(cacheKey, sorted, 10 * 60 * 1000); // Cache for 10 minutes
    return sorted;
  }

  async update(collectionName: string, id: string, data: any): Promise<void> {
    const storageKey = this.getStorageKey(collectionName);
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const index = existingData.findIndex((item: any) => item.id === id);
    
    if (index !== -1) {
      existingData[index] = {
        ...existingData[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(existingData));
      
      // Invalidate cache for this collection
      this.invalidateCache(collectionName);
    }
  }

  async delete(collectionName: string, id: string): Promise<void> {
    const storageKey = this.getStorageKey(collectionName);
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const filteredData = existingData.filter((item: any) => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(filteredData));
    
    // Invalidate cache for this collection
    this.invalidateCache(collectionName);
  }

  async query(collectionName: string, conditions: { field: string; operator: string; value: any }[]): Promise<any[]> {
    const allData = await this.getAll(collectionName);
    return allData.filter(item => {
      return conditions.every(condition => {
        const fieldValue = item[condition.field];
        switch (condition.operator) {
          case '==':
            return fieldValue === condition.value;
          case '!=':
            return fieldValue !== condition.value;
          case '>':
            return fieldValue > condition.value;
          case '<':
            return fieldValue < condition.value;
          case '>=':
            return fieldValue >= condition.value;
          case '<=':
            return fieldValue <= condition.value;
          case 'array-contains':
            return Array.isArray(fieldValue) && fieldValue.includes(condition.value);
          default:
            return true;
        }
      });
    });
  }

  async findByEmail(collectionName: string, email: string): Promise<any | null> {
    const results = await this.query(collectionName, [{ field: 'email', operator: '==', value: email }]);
    return results.length > 0 ? results[0] : null;
  }
}

export const localDb = new LocalStorageService();

// Database Service Classes that work with localStorage
export class UserService {
  private collectionName = 'users';

  async create(userData: any): Promise<string> {
    return await localDb.add(this.collectionName, userData);
  }

  async getById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async findByEmail(email: string): Promise<any | null> {
    return await localDb.findByEmail(this.collectionName, email);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async update(id: string, userData: any): Promise<void> {
    return await localDb.update(this.collectionName, id, userData);
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

export class PropertyService {
  private collectionName = 'properties';

  async create(propertyData: any): Promise<string> {
    return await localDb.add(this.collectionName, propertyData);
  }

  async getById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async update(id: string, propertyData: any): Promise<void> {
    return await localDb.update(this.collectionName, id, propertyData);
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }

  async search(filters: any): Promise<any[]> {
    const allProperties = await this.getAll();
    return allProperties.filter(property => {
      // Advanced search logic that searches all property fields
      const searchQuery = filters.query ? filters.query.toLowerCase() : '';
      
      // If there's a search query, search across all fields
      if (searchQuery) {
        const searchableText = [
          property.title,
          property.description,
          property.location?.address,
          property.propertyType,
          property.status,
          property.category,
          property.propertyCode,
          ...(property.amenities || []),
          ...(property.highlights || []),
          property.price
        ].filter(Boolean).join(' ').toLowerCase();
        
        if (!searchableText.includes(searchQuery)) {
          return false;
        }
      }
      
      // Location filter
      if (filters.location && !property.location?.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Price filters
      if (filters.minPrice && parseFloat(property.price.replace(/[^\d.]/g, '')) < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && parseFloat(property.price.replace(/[^\d.]/g, '')) > filters.maxPrice) {
        return false;
      }
      
      // Property type filter
      if (filters.propertyType && filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }
      
      // Category filter
      if (filters.category && filters.category !== 'all' && property.category !== filters.category) {
        return false;
      }
      
      // Status filter
      if (filters.status && filters.status !== 'all' && property.status !== filters.status) {
        return false;
      }
      
      // Visibility filter (only show visible properties for public search)
      if (filters.onlyVisible !== false && !property.visible) {
        return false;
      }
      
      // Published filter (only show published properties for public search)
      if (filters.onlyPublished !== false && !property.published) {
        return false;
      }
      
      return true;
    });
  }

  async getPublishedProperties(): Promise<any[]> {
    const allProperties = await this.getAll();
    return allProperties.filter(property => property.visible && property.published);
  }
}

export class PageService {
  private collectionName = 'pages';

  async create(pageData: any): Promise<string> {
    return await localDb.add(this.collectionName, pageData);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async getById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async update(id: string, pageData: any): Promise<void> {
    return await localDb.update(this.collectionName, id, pageData);
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

export class LeadService {
  private collectionName = 'leads';

  async create(leadData: any): Promise<string> {
    return await localDb.add(this.collectionName, leadData);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async getById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async update(id: string, leadData: any): Promise<void> {
    return await localDb.update(this.collectionName, id, leadData);
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

export class MessageService {
  private collectionName = 'messages';

  async create(messageData: any): Promise<string> {
    return await localDb.add(this.collectionName, messageData);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async getById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async update(id: string, messageData: any): Promise<void> {
    return await localDb.update(this.collectionName, id, messageData);
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

export class NotificationService {
  private collectionName = 'notifications';

  async create(notificationData: any): Promise<string> {
    return await localDb.add(this.collectionName, notificationData);
  }

  async getAll(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async markAsRead(id: string): Promise<void> {
    return await localDb.update(this.collectionName, id, { read: true });
  }

  async delete(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

export class SettingsService {
  private collectionName = 'settings';
  private docId = 'app_settings';

  async get(): Promise<any> {
    return await localDb.get(this.collectionName, this.docId);
  }

  async update(settingsData: any): Promise<void> {
    const existing = await this.get();
    if (existing) {
      return await localDb.update(this.collectionName, this.docId, settingsData);
    } else {
      await localDb.add(this.collectionName, { ...settingsData, id: this.docId });
    }
  }
}

export class AnalyticsService {
  private collectionName = 'analytics';

  async recordEvent(eventData: any): Promise<string> {
    return await localDb.add(this.collectionName, eventData);
  }

  async getEvents(): Promise<any[]> {
    return await localDb.getAll(this.collectionName);
  }

  async getEventById(id: string): Promise<any | null> {
    return await localDb.get(this.collectionName, id);
  }

  async deleteEvent(id: string): Promise<void> {
    return await localDb.delete(this.collectionName, id);
  }
}

// Export service instances
export const userService = new UserService();
export const propertyService = new PropertyService();
export const pageService = new PageService();
export const leadService = new LeadService();
export const messageService = new MessageService();
export const notificationService = new NotificationService();
export const settingsService = new SettingsService();
export const analyticsService = new AnalyticsService();