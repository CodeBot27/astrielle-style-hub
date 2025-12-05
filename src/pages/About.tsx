import { Layout } from '@/components/layout/Layout';
import { Heart, Leaf, Sparkles, Award } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Crafted with Care',
    description: 'Every piece in our collection is carefully curated to ensure the highest quality and timeless appeal.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Fashion',
    description: 'We are committed to ethical sourcing and sustainable practices to minimize our environmental footprint.',
  },
  {
    icon: Sparkles,
    title: 'Unique Style',
    description: 'Our collections blend classic elegance with contemporary trends, creating pieces that stand out.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We partner with skilled artisans and reputable brands to bring you exceptional fashion pieces.',
  },
];

const moodboardImages = [
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden gradient-bg">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-champagne/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Where Style Meets
              <br />
              <span className="gradient-text">Sophistication</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
              Founded with a passion for timeless elegance, Astrielle brings you carefully curated fashion that celebrates individuality and refined taste.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                The Astrielle Journey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Astrielle was born from a simple belief: that exceptional fashion should be accessible to everyone who appreciates quality and style. Our journey began in a small atelier, where we started curating pieces that tell stories.
                </p>
                <p>
                  Today, we work with talented designers and artisans from around the world, bringing together diverse perspectives united by a commitment to excellence. Each item in our collection is chosen not just for its beauty, but for its ability to make you feel confident and authentic.
                </p>
                <p>
                  We believe in the transformative power of fashion – how the right piece can elevate your day, express your personality, and connect you to a community of like-minded individuals who value craftsmanship and conscious consumption.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop"
                  alt="Fashion atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl">
                <p className="text-3xl font-serif font-semibold">2019</p>
                <p className="text-sm">Est. in South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
              Our Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moodboard Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
              Inspiration
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
              Our Aesthetic
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodboardImages.map((image, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-xl ${
                  index === 2 || index === 4 ? 'row-span-2' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image}
                  alt={`Moodboard ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-charcoal text-primary-foreground">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Explore our latest collection and discover pieces that speak to your unique sense of fashion.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition-colors"
          >
            Shop Collection
          </a>
        </div>
      </section>
    </Layout>
  );
}
