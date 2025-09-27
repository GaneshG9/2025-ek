

'use client';

import { Home, LayoutGrid, Settings, Users, Sun, FileText, TrendingUp, Globe, Bot, Zap, Workflow, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Logo } from '@/components/landing/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from '@/context/theme-context';
import { AdminLogin } from '@/components/auth/admin-login';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Show login page if user is not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (loading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
        {/* Top Navigation Bar */}
        <nav className="bg-white dark:bg-slate-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Logo width={32} height={32} />
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Admin Panel
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Business Management Hub</div>
                  </div>
                </Link>
              </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              <Link 
                href="/admin" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <LayoutGrid className="h-4 w-4 inline mr-2" />
                Dashboard
              </Link>
              <Link 
                href="/admin/automation" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/automation' 
                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Zap className="h-4 w-4 inline mr-2" />
                Automation
              </Link>
              <Link 
                href="/admin/ai-assistant" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/ai-assistant' 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Bot className="h-4 w-4 inline mr-2" />
                AI Assistant
              </Link>
              <Link 
                href="/admin/website-control" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/website-control' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Globe className="h-4 w-4 inline mr-2" />
                Website Control
              </Link>
              <Link 
                href="/admin/n8n-integration" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/n8n-integration' 
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Workflow className="h-4 w-4 inline mr-2" />
                n8n Control
              </Link>
              <Link 
                href="/admin/properties" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/properties' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Home className="h-4 w-4 inline mr-2" />
                Real Estate
              </Link>
              <Link 
                href="/admin/solar" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/solar' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Sun className="h-4 w-4 inline mr-2" />
                Solar
              </Link>
              <Link 
                href="/admin/digital-marketing" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/digital-marketing' 
                    ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Marketing
              </Link>
              <Link 
                href="/admin/users" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/users' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Users
              </Link>
              <Link 
                href="/admin/pages" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname.startsWith('/admin/pages') 
                    ? 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Pages
              </Link>
              <Link 
                href="/admin/settings" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === '/admin/settings' 
                    ? 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Settings
              </Link>
            </div>

            {/* User Profile and Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Link 
                href="/" 
                target="_blank"
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                View Site
              </Link>
              
              {/* User Info */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.firstName?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 capitalize">
                    {user.role} Access
                  </div>
                </div>
              </div>
              
              {/* Secure Logout Button */}
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

        {/* Main Content Area */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
