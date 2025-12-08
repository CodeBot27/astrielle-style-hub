import { Layout } from "@/components/layout/Layout";
import { Ruler, User, Shirt, Heart, AlertCircle } from "lucide-react";
import { useState } from "react";

const sizeCategories = [
  {
    title: "Women's Clothing",
    unit: "cm",
    sizes: [
      { size: "XS", bust: "81-86", waist: "61-66", hips: "86-91" },
      { size: "S", bust: "86-91", waist: "66-71", hips: "91-96" },
      { size: "M", bust: "91-96", waist: "71-76", hips: "96-101" },
      { size: "L", bust: "96-101", waist: "76-81", hips: "101-106" },
      { size: "XL", bust: "101-106", waist: "81-86", hips: "106-111" },
      { size: "2XL", bust: "106-111", waist: "86-91", hips: "111-116" },
    ],
  },
  {
    title: "Men's Clothing",
    unit: "cm",
    sizes: [
      { size: "XS", chest: "86-91", waist: "71-76", hips: "86-91" },
      { size: "S", chest: "91-96", waist: "76-81", hips: "91-96" },
      { size: "M", chest: "96-101", waist: "81-86", hips: "96-101" },
      { size: "L", chest: "101-106", waist: "86-91", hips: "101-106" },
      { size: "XL", chest: "106-111", waist: "91-96", hips: "106-111" },
      { size: "2XL", chest: "111-116", waist: "96-101", hips: "111-116" },
    ],
  },
  {
    title: "Shoes",
    unit: "",
    sizes: [
      { size: "EU 36 / UK 3 / US 5", length: "23cm" },
      { size: "EU 37 / UK 4 / US 6", length: "23.5cm" },
      { size: "EU 38 / UK 5 / US 7", length: "24cm" },
      { size: "EU 39 / UK 6 / US 8", length: "24.5cm" },
      { size: "EU 40 / UK 7 / US 9", length: "25cm" },
      { size: "EU 41 / UK 8 / US 10", length: "25.5cm" },
      { size: "EU 42 / UK 9 / US 11", length: "26cm" },
    ],
  },
];

const measuringTips = [
  {
    icon: User,
    title: "Bust/Chest",
    instructions:
      "Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor.",
  },
  {
    icon: Ruler,
    title: "Waist",
    instructions:
      "Measure around the narrowest part of your natural waistline, usually above your navel.",
  },
  {
    icon: Shirt,
    title: "Hips",
    instructions:
      "Measure around the fullest part of your hips, approximately 20cm below your waist.",
  },
  {
    icon: Heart,
    title: "Inseam",
    instructions:
      "Measure from your crotch to the bottom of your ankle for accurate pants length.",
  },
];

const fitTypes = [
  {
    name: "Regular Fit",
    description: "Standard fit with comfortable ease throughout. True to size.",
    recommendation: "Choose your usual size",
  },
  {
    name: "Slim Fit",
    description:
      "Closer fit through chest, waist, and hips. Less ease than regular fit.",
    recommendation: "Size up if between sizes",
  },
  {
    name: "Oversized",
    description:
      "Relaxed, roomy fit with dropped shoulders and extended lengths.",
    recommendation: "Size down for less dramatic look",
  },
  {
    name: "Bodycon",
    description: "Form-fitting silhouette that follows body contours closely.",
    recommendation: "Choose exact measurements",
  },
];

export default function SizeGuide() {
  const [activeCategory, setActiveCategory] = useState(0);

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
              Find Your Perfect Fit
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Size
              <br />
              <span className="gradient-text">Guide</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Comprehensive sizing charts and measuring tips to help you find
              the perfect fit every time.
            </p>
          </div>
        </div>
      </section>

      {/* Size Category Tabs */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Size Charts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All measurements are in centimeters. Use a soft measuring tape for
              accurate results.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sizeCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Size Table */}
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left p-4 font-serif font-semibold">
                        Size
                      </th>
                      {Object.keys(sizeCategories[activeCategory].sizes[0])
                        .filter((key) => key !== "size")
                        .map((key) => (
                          <th
                            key={key}
                            className="text-left p-4 font-serif font-semibold capitalize"
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()} (
                            {sizeCategories[activeCategory].unit})
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCategories[activeCategory].sizes.map(
                      (sizeRow, index) => (
                        <tr
                          key={index}
                          className="border-t border-border hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4 font-medium">{sizeRow.size}</td>
                          {Object.entries(sizeRow)
                            .filter(([key]) => key !== "size")
                            .map(([key, value]) => (
                              <td key={key} className="p-4">
                                {String(value)}
                              </td>
                            ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Measuring Guide */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              How to Measure
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these steps for accurate measurements. Use a soft measuring
              tape and wear lightweight clothing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {measuringTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.title}
                  className="bg-card border border-border rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tip.instructions}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fit Types */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Understanding Fit Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different styles have different fits. Here's what to expect from
              each fit type.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {fitTypes.map((fit, index) => (
              <div
                key={fit.name}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-serif font-semibold text-lg mb-3">
                  {fit.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {fit.description}
                </p>
                <div className="text-sm font-medium text-accent">
                  {fit.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Notes */}
      <section className="py-12 md:py-20 bg-charcoal text-primary-foreground">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-4">
                  Important Notes
                </h2>
                <p className="text-primary-foreground/80">
                  Keep these tips in mind for the best shopping experience.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Product Variations
                </h3>
                <p className="text-primary-foreground/80">
                  Sizing may vary between brands and styles. Always check the
                  specific product's size chart in the description.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Between Sizes?
                </h3>
                <p className="text-primary-foreground/80">
                  If your measurements fall between sizes, consider the desired
                  fit: size up for a relaxed fit, size down for a more fitted
                  look.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  Still Unsure?
                </h3>
                <p className="text-primary-foreground/80">
                  Our styling team is here to help! Contact us with your
                  measurements for personalized size recommendations.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="mailto:styling@astrielle.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition-colors"
              >
                Get Styling Advice
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
