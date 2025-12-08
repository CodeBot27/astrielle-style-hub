import { Layout } from "@/components/layout/Layout";
import { Truck, Clock, RefreshCw, Shield, Package, Globe } from "lucide-react";

const shippingOptions = [
  {
    icon: Truck,
    title: "Standard Shipping",
    price: "R50",
    time: "3-5 business days",
    description: "Economical shipping within South Africa",
    features: ["Tracked delivery", "Signature on delivery", "Delivery to door"],
  },
  {
    icon: Clock,
    title: "Express Shipping",
    price: "R120",
    time: "1-2 business days",
    description: "Fast delivery within major cities",
    features: [
      "Priority processing",
      "Tracked delivery",
      "Saturday delivery available",
    ],
  },
  {
    icon: Globe,
    title: "International",
    price: "From R250",
    time: "7-14 business days",
    description: "Worldwide delivery",
    features: [
      "Duty & tax calculated",
      "Tracked delivery",
      "International insurance",
    ],
  },
];

const returnSteps = [
  {
    step: "1",
    title: "Initiate Return",
    description:
      "Log into your account and select the item(s) you wish to return within 30 days of delivery.",
    icon: RefreshCw,
  },
  {
    step: "2",
    title: "Pack Items",
    description:
      "Place items in original packaging with all tags attached. Include the completed return form.",
    icon: Package,
  },
  {
    step: "3",
    title: "Attach Label",
    description:
      "Print the prepaid return label and attach it securely to the outside of your package.",
    icon: Shield,
  },
  {
    step: "4",
    title: "Drop Off",
    description:
      "Drop your package at any authorized courier drop-off location.",
    icon: Truck,
  },
];

const shippingDestinations = [
  { country: "South Africa", time: "3-5 days", cost: "R50" },
  { country: "Namibia & Botswana", time: "5-7 days", cost: "R150" },
  { country: "United Kingdom", time: "7-10 days", cost: "R300" },
  { country: "United States", time: "10-14 days", cost: "R350" },
  { country: "Australia", time: "10-14 days", cost: "R350" },
  { country: "European Union", time: "7-12 days", cost: "R320" },
];

export default function ShippingAndReturns() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden gradient-bg">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-champagne/20 rounded-full blur-3xl" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Delivery & Returns
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Shipping &
              <br />
              <span className="gradient-text">Returns</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Transparent shipping options and hassle-free returns. Your
              satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Shipping Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the shipping method that works best for you. All orders are
              processed within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif font-semibold">
                        {option.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {option.time}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {option.description}
                  </p>

                  <ul className="space-y-3">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* International Shipping */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              International Shipping
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ship worldwide with calculated duties and taxes at checkout for
              a hassle-free delivery experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shippingDestinations.map((destination, index) => (
                <div
                  key={destination.country}
                  className="bg-card border border-border rounded-lg p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h3 className="font-serif font-semibold text-lg mb-2">
                    {destination.country}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {destination.time}
                    </span>
                    <span className="font-medium">{destination.cost}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Note:</strong> International orders may be subject to
                customs duties and taxes, which are calculated at checkout.
                Delivery times may vary due to customs processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Process */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Easy Returns Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a 30-day return policy for unworn items with original
              tags. Returns are free for defective or incorrect items.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {returnSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-serif font-semibold">
                      {step.step}
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-accent/10 flex items-center justify-center lg:block hidden">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  <h3 className="font-serif font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Return Policy Details */}
      <section className="py-12 md:py-20 bg-charcoal text-primary-foreground">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
              Return Policy Details
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Return Window
                </h3>
                <p className="text-primary-foreground/80">
                  Items can be returned within 30 days of delivery. Sale items
                  must be returned within 14 days. Final sale items are
                  non-returnable.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Condition Requirements
                </h3>
                <p className="text-primary-foreground/80">
                  Items must be unworn, unwashed, and in original condition with
                  all tags attached. Shoes must be tried on carpeted surfaces
                  only.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Refund Method
                </h3>
                <p className="text-primary-foreground/80">
                  Refunds are issued to the original payment method. Store
                  credit is available for exchanges. Processing takes 3-5
                  business days after we receive your return.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Exclusions
                </h3>
                <p className="text-primary-foreground/80">
                  Undergarments, swimwear (if hygiene seal is broken),
                  personalized items, and final sale items are non-returnable
                  unless defective.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-primary-foreground/60 mb-4">
                Need help with a return? Contact our customer service team.
              </p>
              <a
                href="mailto:returns@astrielle.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition-colors"
              >
                Contact Returns Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
