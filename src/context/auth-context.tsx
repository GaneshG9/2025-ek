'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'owner' | 'admin' | 'manager' | 'agent' | 'viewer';
  permissions?: string[];
  avatar?: string;
  department?: 'real_estate' | 'solar' | 'marketing' | 'management';
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Secure admin credentials (in production, store in environment variables or secure database)
const ADMIN_CREDENTIALS = {
  email: 'admin@realestate.com',
  password: 'AdminRE2025!@#', // Strong password with special characters
  user: {
    id: 'admin-001',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@realestate.com',
    phone: '+1-555-ADMIN-01',
    role: 'owner' as const,
    permissions: ['*'], // Full permissions
    department: 'management' as const,
    isActive: true
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        // Verify token validity (in production, verify with backend)
        const tokenData = JSON.parse(atob(storedToken));
        const currentTime = Date.now();
        
        // Check if token is expired (24 hour validity)
        if (tokenData.expires > currentTime) {
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear auth data
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear corrupted auth data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validate credentials
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Create secure token (in production, use JWT with proper signing)
        const token = btoa(JSON.stringify({
          userId: ADMIN_CREDENTIALS.user.id,
          email: email,
          expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          issued: Date.now()
        }));

        // Store user and token
        localStorage.setItem('auth_user', JSON.stringify(ADMIN_CREDENTIALS.user));
        localStorage.setItem('auth_token', token);
        
        setUser(ADMIN_CREDENTIALS.user);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${ADMIN_CREDENTIALS.user.firstName}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
