
import { Phone, FileText, Wrench, Zap } from 'lucide-react';

const processSteps = [
  {
    icon: <Phone className="w-10 h-10 mb-4 text-primary" />,
    title: '1. Consultation',
    description: 'We start with a free consultation to understand your energy needs and assess your property for solar suitability.',
  },
  {
    icon: <FileText className="w-10 h-10 mb-4 text-primary" />,
    title: '2. Design & Proposal',
    description: 'Our experts design a custom solar system for your home and provide a detailed proposal with costs and savings.',
  },
  {
    icon: <Wrench className="w-10 h-10 mb-4 text-primary" />,
    title: '3. Installation',
    description: 'Our certified team installs your solar panels efficiently, ensuring minimal disruption and maximum quality.',
  },
  {
    icon: <Zap className="w-10 h-10 mb-4 text-primary" />,
    title: '4. Activation & Monitoring',
    description: 'We handle the final inspections and activation. You can start generating clean energy and monitor your system online.',
  },
];

export function SolarProcess() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Our Simple 4-Step Process</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We make switching to solar energy a seamless and hassle-free experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.title} className="p-8 text-center border bg-background rounded-lg hover:shadow-lg transition-shadow">
              {step.icon}
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
