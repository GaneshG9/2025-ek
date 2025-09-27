import { DollarSign, Leaf, BatteryCharging, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <DollarSign className="w-10 h-10 text-green-500" />,
    title: 'Reduce Your Energy Bills',
    description: 'Generate your own electricity and significantly lower or even eliminate your monthly utility bills.',
  },
  {
    icon: <Leaf className="w-10 h-10 text-green-500" />,
    title: 'Lower Your Carbon Footprint',
    description: 'Solar is a clean, renewable energy source that helps reduce greenhouse gas emissions and protect the environment.',
  },
  {
    icon: <BatteryCharging className="w-10 h-10 text-green-500" />,
    title: 'Gain Energy Independence',
    description: 'Protect yourself from rising electricity costs and power outages with a reliable source of energy.',
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-green-500" />,
    title: 'Increase Property Value',
    description: 'Homes equipped with solar energy systems are more attractive to buyers and can sell for a higher price.',
  },
]

export function WhySolar() {
  return (
    <section id="why-solar" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Why Go Solar?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover the powerful advantages of switching to solar energy for your home or business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4 p-6 rounded-lg">
              <div className="shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
