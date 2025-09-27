
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Sparkles, Mail } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export function SolarVisualizer() {
  const [isVisualizing, setIsVisualizing] = useState(false);
  const { user } = useAuth();
  const beforeImage = PlaceHolderImages.find((p) => p.id === 'solar-before');
  const afterImage = PlaceHolderImages.find((p) => p.id === 'solar-after');

  const inquiryMessage = "Hello, I'm interested in a solar consultation for my property. Please get in touch with me to discuss the details.";
  const userDetails = user ? `\n\nMy details:\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nPhone: ${user.phone}` : '';

  const emailSubject = encodeURIComponent('Solar Consultation Inquiry');
  const emailBody = encodeURIComponent(inquiryMessage + userDetails);
  const emailUrl = `mailto:ekavartaa+Solar_Consultant@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  

  return (
    <section id="solar" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Visualize Your Solar Future</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Curious how solar panels would look on your home? Our innovative visualizer tool allows you to see the transformation instantly. Upload a picture of your roof and let our AI technology do the rest.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Embrace clean energy, reduce your bills, and increase your property value. Start your solar journey today.
            </p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href={emailUrl}>
                <Mail className="mr-2 h-5 w-5" />
                Get Consultant
              </Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-2xl group" onMouseEnter={() => setIsVisualizing(true)} onMouseLeave={() => setIsVisualizing(false)}>
            {beforeImage && (
              <Image
                src={beforeImage.imageUrl}
                alt={beforeImage.description}
                width={800}
                height={600}
                className={cn('object-cover w-full h-full transition-opacity duration-500', isVisualizing ? 'opacity-0' : 'opacity-100')}
                data-ai-hint={beforeImage.imageHint}
              />
            )}
            {afterImage && (
              <Image
                src={afterImage.imageUrl}
                alt={afterImage.description}
                width={800}
                height={600}
                className={cn('absolute inset-0 object-cover w-full h-full transition-opacity duration-500', isVisualizing ? 'opacity-100' : 'opacity-0')}
                data-ai-hint={afterImage.imageHint}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="text-center text-white p-4 rounded-lg">
                    <Sparkles className="mx-auto mb-2 h-8 w-8"/>
                    <p className="text-xl font-semibold drop-shadow-md">Hover to see the AI transformation!</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
