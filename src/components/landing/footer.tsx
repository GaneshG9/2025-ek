
'use client';

import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { ContactForm } from './contact-form';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Logo width={64} height={64} />
              <span className="text-2xl font-bold font-headline text-foreground">Ekavarta</span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm">
              One Life One Vision One Future. Your partner in Real Estate, Solar, and Digital Marketing.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="YouTube"><Youtube className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>Properties</Link></li>
              <li><Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>About Us</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/real-estate" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>Real Estate</Link></li>
              <li><Link href="/solar" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>Solar</Link></li>
              <li><Link href="/digital-marketing" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>Digital Marketing</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-4">Have a question or a project in mind? We’d love to hear from you.</p>
            <ContactForm />
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Ekavarta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
