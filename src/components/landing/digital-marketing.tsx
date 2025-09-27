import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    price: '₹40,000',
    pricePeriod: '/month',
    description: 'Perfect for new businesses looking to establish an online presence.',
    features: ['Social Media Management', 'Basic SEO', 'Monthly Analytics Report', 'Email Support'],
    isPopular: false,
  },
  {
    name: 'Growth',
    price: '₹80,000',
    pricePeriod: '/month',
    description: 'Designed for growing businesses aiming to expand their reach.',
    features: ['Everything in Starter', 'Content Creation (2 posts/wk)', 'PPC Campaign Management', 'Priority Support'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    pricePeriod: '',
    description: 'Tailored solutions for large-scale businesses with specific needs.',
    features: ['Everything in Growth', 'Advanced SEO & CRO', 'Dedicated Account Manager', 'Custom Strategy'],
    isPopular: false,
  },
];

export function DigitalMarketing() {
  return (
    <section id="marketing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Digital Marketing Packages</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Drive growth with our expert digital marketing services tailored for your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`flex flex-col ${pkg.isPopular ? 'border-primary shadow-2xl relative' : 'hover:shadow-xl hover:-translate-y-1 transition-all'}`}>
              {pkg.isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold tracking-wider text-primary-foreground uppercase bg-primary rounded-full">Popular</div>}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground">{pkg.pricePeriod}</span>
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={`w-full ${pkg.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/90'}`}>
                  <Link href="#contact">Choose Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
