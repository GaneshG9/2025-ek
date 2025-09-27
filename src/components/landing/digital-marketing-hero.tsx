import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Megaphone, Clapperboard, Search, BarChart } from 'lucide-react';

const services = [
  {
    icon: <Megaphone className="w-8 h-8 mb-4 text-primary" />,
    title: 'Social Media Management',
    description: 'We build and manage your brand’s presence across all major social platforms, engaging your audience and growing your community.',
  },
  {
    icon: <Clapperboard className="w-8 h-8 mb-4 text-primary" />,
    title: 'Content & Reel Creation',
    description: 'From stunning graphics to viral-worthy video Reels, our creative team produces content that captures attention and tells your story.',
  },
  {
    icon: <Search className="w-8 h-8 mb-4 text-primary" />,
    title: 'Search Engine Optimization (SEO)',
    description: 'Climb the search rankings and attract organic traffic with our data-driven SEO strategies tailored to your business.',
  },
  {
    icon: <BarChart className="w-8 h-8 mb-4 text-primary" />,
    title: 'Performance Marketing',
    description: 'Maximize your ROI with targeted ad campaigns on Google, Facebook, and Instagram. We handle everything from strategy to execution.',
  },
];

export function DigitalMarketingHero() {
  return (
    <section id="digital-marketing-hero" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Transform Your Digital Presence</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            We help you connect with your audience, build your brand, and drive results through creative and strategic digital marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.title} className="text-center p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
              {service.icon}
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
            <Button asChild size="lg">
                <Link href="#contact">Get Started Today</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
