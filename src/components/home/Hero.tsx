import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-bg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-champagne/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-accent font-medium tracking-widest uppercase text-sm animate-fade-in">
                New Season Collection
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
                Timeless
                <br />
                <span className="gradient-text">Elegance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Discover curated pieces that blend contemporary design with enduring sophistication. Your journey to effortless style begins here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link
                to="/shop"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Our Story
              </Link>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="text-center">
                <p className="text-3xl font-serif font-semibold">500+</p>
                <p className="text-sm text-muted-foreground">Unique Pieces</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-serif font-semibold">50+</p>
                <p className="text-sm text-muted-foreground">Designers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-serif font-semibold">15k+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop"
                    alt="Fashion model"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop"
                    alt="Fashion accessories"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop"
                    alt="Fashion style"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop"
                    alt="Fashion collection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-8 top-1/2 bg-background shadow-xl rounded-2xl p-4 animate-float">
              <p className="font-serif text-lg font-semibold">New In</p>
              <p className="text-sm text-muted-foreground">Spring 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
