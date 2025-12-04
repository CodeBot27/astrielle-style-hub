import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProductGrid } from '@/components/products/ProductGrid';
import type { Product } from '@/types/database';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4);

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
              Curated Selection
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
              Featured Pieces
            </h2>
          </div>
          <Link
            to="/shop?featured=true"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors group"
          >
            View All Featured
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={products} isLoading={isLoading} columns={4} />
      </div>
    </section>
  );
}
