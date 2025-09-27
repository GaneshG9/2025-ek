import { Check, Home, Landmark, Mic, Sun, Users } from "lucide-react";

const services = [
  {
    icon: <Home className="w-8 h-8 mb-4 text-primary" />,
    title: 'Real Estate',
    description: 'Residential & commercial properties, NA/NMRDA/NATP/NIT plot dealings, and investment advisory.',
  },
  {
    icon: <Sun className="w-8 h-8 mb-4 text-primary" />,
    title: 'Solar Services',
    description: 'End-to-end solar solutions for homes and businesses, making renewable energy accessible and affordable.',
  },
  {
    icon: <Mic className="w-8 h-8 mb-4 text-primary" />,
    title: 'Digital Marketing',
    description: 'Helping businesses build their online presence with social media, SEO, branding, and advertising.',
  },
    {
    icon: <Landmark className="w-8 h-8 mb-4 text-primary" />,
    title: 'Proposals & Documentation',
    description: 'Professional business proposals, legal paperwork, and presentation services.',
    }
];

const values = [
    { text: 'Integrity & Trust – Building honest and transparent relationships.' },
    { text: 'Innovation – Adapting modern solutions to meet customer needs.' },
    { text: 'Customer First – Delivering value through personalized services.' },
    { text: 'Sustainability – Promoting eco-friendly and future-ready practices.' },
]

export function AboutUs() {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">About Us – Ekavarta</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            At Ekavarta, we believe in the philosophy of “One Life – Unlock Extraordinary Possibilities.” Our vision is to create opportunities that empower individuals, families, and businesses to grow and thrive.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
             Founded with a mission to bring trust, transparency, and innovation into every service we offer, Ekavarta has become a one-stop solution for:
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service) => (
            <div key={service.title} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              {service.icon}
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="text-left">
                <h2 className="text-3xl font-headline font-bold tracking-tight mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground">
                    To become a trusted ecosystem that transforms how people invest, live, and grow – all under one roof.
                </p>
            </div>
            <div className="text-left">
                <h2 className="text-3xl font-headline font-bold tracking-tight mb-4">Our Values</h2>
                <ul className="space-y-3">
                    {values.map(item => (
                        <li key={item.text} className="flex items-start">
                            <Check className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-1" />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
            At Ekavarta, we don’t just provide services – we create pathways for growth and success. Whether it’s helping you find your dream home, switching to clean energy, growing your brand digitally, or simplifying documentation, we’re here to make life easier and possibilities endless.
            </p>
            <h3 className="text-2xl font-headline font-bold tracking-tight text-primary">
            ✨ Ekavarta – One Life. One Vision. One Future.
            </h3>
        </div>
      </div>
    </section>
  );
}
