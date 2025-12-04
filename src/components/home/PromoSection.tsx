import { Link } from 'react-router-dom';

export function PromoSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Promo Card 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-charcoal text-primary-foreground group">
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full mb-4">
                  Limited Time
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
                  Spring Sale
                </h3>
                <p className="text-primary-foreground/70 max-w-xs">
                  Up to 40% off on selected items from our spring collection.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center text-sm font-medium border-b border-primary-foreground/50 hover:border-accent hover:text-accent transition-colors pb-1 w-fit"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="relative overflow-hidden rounded-2xl gradient-accent group">
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-foreground text-background text-xs font-medium rounded-full mb-4">
                  New Arrival
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
                  Summer Essentials
                </h3>
                <p className="text-foreground/70 max-w-xs">
                  Discover lightweight fabrics and breezy silhouettes for the warmer days ahead.
                </p>
              </div>
              <Link
                to="/shop?type=summer"
                className="inline-flex items-center text-sm font-medium border-b border-foreground/50 hover:border-foreground transition-colors pb-1 w-fit text-foreground"
              >
                Explore Collection
              </Link>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border border-foreground/10 rounded-full" />
            <div className="absolute bottom-10 right-20 w-48 h-48 border border-foreground/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
