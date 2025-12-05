import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop',
    href: '/shop?type=Male',
    count: 'Shirts, Pants & More',
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    href: '/shop?type=Female',
    count: 'Dresses, Tops & More',
  },
  {
    name: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
    href: '/shop?category=sneakers',
    count: 'Athletic & Casual',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop',
    href: '/shop?category=accessories',
    count: 'Bags, Watches & More',
  },
];

export function Categories() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
            Browse By
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">
            Shop Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/70">
                      {category.count}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground group-hover:text-accent-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
