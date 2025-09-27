

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, LogOut, LayoutGrid, Phone, Mail, Search, Star, Film, HandCoins, Sun, Eye, Settings, ShoppingBag, Home, Users as UsersIcon } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { RegistrationDialog } from '@/components/auth/registration-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { Logo } from './logo';
import { Input } from '../ui/input';

type PageType = 'real-estate' | 'solar' | 'digital-marketing' | 'default';

const defaultNavLinks = [
  { href: '/real-estate', label: 'Real Estate' },
  { href: '/solar', label: 'Solar' },
  { href: '/digital-marketing', label: 'Digital Marketing' },
  { href: '/about-us', label: 'About Us' },
  { href: '#contact', label: 'Contact Us' },
];

const pageNavLinks = {
  'real-estate': [
    { href: '/real-estate', label: 'Home', icon: <Home /> },
    { href: '/properties/search', label: 'Search', icon: <Search /> },
    { href: '/real-estate#reels', label: 'Reels', icon: <Film /> },
    { href: '/about-us', label: 'About Us', icon: <UsersIcon /> },
    { href: '#contact', label: 'Sell Property', icon: <HandCoins /> },
  ],
  'solar': [
    { href: '/solar', label: 'Home', icon: <Home /> },
    { href: '/solar#why-solar', label: 'Why Solar?', icon: <Sun /> },
    { href: '/solar#solar', label: 'Visualizer', icon: <Eye /> },
    { href: '/solar#process', label: 'Process', icon: <Settings /> },
    { href: '/about-us', label: 'About Us', icon: <UsersIcon /> },
    { href: '#contact', label: 'Get a Quote', icon: <HandCoins /> },
  ],
  'digital-marketing': [
    { href: '/digital-marketing', label: 'Home', icon: <Home /> },
    { href: '/digital-marketing#marketing', label: 'Packages', icon: <ShoppingBag /> },
    { href: '/about-us', label: 'About Us', icon: <UsersIcon /> },
    { href: '#contact', label: 'Contact Us' },
  ],
};


export function Header({ getStartedButtonText, page = 'default' }: { getStartedButtonText?: string, page?: PageType }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegistrationOpen, setRegistrationOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const navLinks = pageNavLinks[page as keyof typeof pageNavLinks] || defaultNavLinks;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const renderGetStartedButton = () => {
    const buttonText = getStartedButtonText || 'Contact to Executive';
    const phoneNumbers = ['+918149425966', '+918208079925'];
    const emailAddress = 'ekavartaa+RealEstate_contact@gmail.com';

    if (buttonText === 'Contact to Executive') {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
              {buttonText}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 p-4">
            <DropdownMenuLabel>Contact Executive</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-4 py-2">
              {phoneNumbers.map((number, index) => (
                <a key={index} href={`tel:${number}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                  <Phone className="w-5 h-5 text-primary"/>
                  <span className="text-sm font-medium">{number}</span>
                </a>
              ))}
              <a href={`mailto:${emailAddress}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                <Mail className="w-5 h-5 text-primary"/>
                <span className="text-sm font-medium break-words">{emailAddress}</span>
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild>
        <Link href="/#contact">{buttonText}</Link>
      </Button>
    );
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
          <span className="text-xl font-bold font-headline text-foreground">Ekavarta</span>
        </Link>
        <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
             {page === 'real-estate' && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search properties..." 
                        className="pl-9 h-9 w-40 lg:w-64" 
                        onFocus={() => router.push('/properties/search')}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const query = (e.target as HTMLInputElement).value;
                            router.push(`/properties/search?q=${encodeURIComponent(query)}`);
                          }
                        }}
                    />
                </div>
            )}
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-foreground/80 transition-colors hover:text-primary flex items-center gap-2" prefetch={false}>
                 {('icon' in link) && link.icon} {link.label}
                </Link>
            ))}
            </nav>
            <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                       <AvatarImage src="/placeholder-user.jpg" alt={user.firstName} />
                       <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/admin')}>
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>Admin</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                       <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Button variant="outline" onClick={() => setRegistrationOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Account
                </Button>
            )}

            <RegistrationDialog open={isRegistrationOpen} onOpenChange={setRegistrationOpen} />
            
            <div className="hidden md:block">
              {renderGetStartedButton()}
            </div>

            <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-4 p-4">
                    <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
                        <Logo />
                        <span className="text-xl font-bold font-headline">Ekavarta</span>
                    </Link>
                    <nav className="grid gap-2">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex w-full items-center py-2 text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                            prefetch={false}
                        >
                             {('icon' in link) && <span className="mr-2">{link.icon}</span>} {link.label}
                        </Link>
                        ))}
                    </nav>
                     <div className="mt-4">
                      {renderGetStartedButton()}
                    </div>
                    </div>
                </SheetContent>
                </Sheet>
            </div>
            </div>
        </div>
      </div>
    </header>
  );
}
