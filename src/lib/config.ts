// Production Environment Configuration
export const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  
  // App URLs
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Database configuration
  database: {
    // In production, you should use a proper database
    // For now, localStorage is used for demo purposes
    type: process.env.NODE_ENV === 'production' ? 'localStorage' : 'localStorage',
    
    // Future database options:
    // mongoUrl: process.env.MONGODB_URL,
    // firebaseConfig: process.env.FIREBASE_CONFIG,
    // supabaseUrl: process.env.SUPABASE_URL,
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
  },
  
  // Storage Configuration
  storage: {
    maxSize: process.env.NODE_ENV === 'production' ? 5 * 1024 * 1024 : 10 * 1024 * 1024, // 5MB prod, 10MB dev
    cleanupThreshold: 0.8, // Clean up when 80% full
  },
  
  // Feature Flags
  features: {
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableLogging: process.env.NODE_ENV !== 'production',
    enableDevTools: process.env.NODE_ENV !== 'production',
  }
};

export default config;