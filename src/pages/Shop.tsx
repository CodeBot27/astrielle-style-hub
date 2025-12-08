import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ShoppingBag, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductListItemSkeleton } from '@/components/ui/skeleton-loader';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/types/database';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Sneakers', 'Accessories'];
const TYPES = ['All', 'Male', 'Female', 'Youth'];
const STYLES = ['All', 'Casual', 'SmartCasual', 'Formal', 'Sport'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states - capitalize first letter to match filter options
  const getInitialCategory = () => {
    const param = searchParams.get('category');
    if (!param) return 'All';
    return param.charAt(0).toUpperCase() + param.slice(1);
  };
  
  const [category, setCategory] = useState(getInitialCategory());
  const [type, setType] = useState(searchParams.get('type') || 'All');
  const [style, setStyle] = useState(searchParams.get('style') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      
      let query = supabase.from('products').select('*');

      // Apply filters (use eq for exact match, case-sensitive)
      if (category !== 'All') {
        query = query.eq('category', category.toLowerCase());
      }
      if (type !== 'All') {
        query = query.eq('type', type);
      }
      if (style !== 'All') {
        query = query.eq('style', style);
      }
      if (searchParams.get('featured') === 'true') {
        query = query.eq('is_featured', true);
      }

      // Apply sorting
      switch (sort) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name-asc':
          query = query.order('title', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, [category, type, style, sort, searchParams]);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'All') {
      params.delete(filterType);
    } else {
      params.set(filterType, value.toLowerCase());
    }
    
    setSearchParams(params);
    setCurrentPage(1);
    
    switch (filterType) {
      case 'category':
        setCategory(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'style':
        setStyle(value);
        break;
      case 'sort':
        setSort(value);
        break;
    }
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-main">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
              Shop Collection
            </h1>
            <p className="text-muted-foreground">
              {products.length} products available
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                <FilterSection
                  title="Category"
                  options={CATEGORIES}
                  selected={category}
                  onChange={(v) => handleFilterChange('category', v)}
                />
                <FilterSection
                  title="Type"
                  options={TYPES}
                  selected={type}
                  onChange={(v) => handleFilterChange('type', v)}
                />
                <FilterSection
                  title="Style"
                  options={STYLES}
                  selected={style}
                  onChange={(v) => handleFilterChange('style', v)}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="w-56">
                  <Select value={sort} onValueChange={(v) => handleFilterChange('sort', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded transition-colors',
                      viewMode === 'grid' ? 'bg-secondary' : 'hover:bg-secondary/50'
                    )}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded transition-colors',
                      viewMode === 'list' ? 'bg-secondary' : 'hover:bg-secondary/50'
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 bg-secondary/30 rounded-lg space-y-6 animate-fade-in">
                  <FilterSection
                    title="Category"
                    options={CATEGORIES}
                    selected={category}
                    onChange={(v) => handleFilterChange('category', v)}
                    horizontal
                  />
                  <FilterSection
                    title="Type"
                    options={TYPES}
                    selected={type}
                    onChange={(v) => handleFilterChange('type', v)}
                    horizontal
                  />
                  <FilterSection
                    title="Style"
                    options={STYLES}
                    selected={style}
                    onChange={(v) => handleFilterChange('style', v)}
                    horizontal
                  />
                </div>
              )}

              {/* Products */}
              {isLoading ? (
                viewMode === 'grid' ? (
                  <ProductGrid products={[]} isLoading={true} columns={4} />
                ) : (
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <ProductListItemSkeleton key={i} />
                    ))}
                  </div>
                )
              ) : viewMode === 'grid' ? (
                <ProductGrid products={paginatedProducts} isLoading={false} columns={4} />
              ) : (
                <div className="space-y-4">
                  {paginatedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium transition-colors',
                        currentPage === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
  horizontal = false,
}: {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  horizontal?: boolean;
}) {
  return (
    <div>
      <h4 className="font-medium mb-3">{title}</h4>
      <div className={cn('flex gap-2', horizontal ? 'flex-wrap' : 'flex-col')}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              'text-sm transition-colors text-left',
              horizontal ? 'px-3 py-1.5 border border-border rounded-full' : 'py-1',
              selected === option
                ? horizontal
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-accent font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductListItem({ product }: { product: Product }) {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your cart.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await addToCart(user.id, product);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your wishlist.',
        variant: 'destructive',
      });
      return;
    }

    if (inWishlist) {
      const { error } = await removeFromWishlist(user.id, product.id);
      if (!error) {
        toast({
          title: 'Removed from wishlist',
          description: `${product.title} has been removed from your wishlist.`,
        });
      }
    } else {
      const { error } = await addToWishlist(user.id, product.id);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to add item to wishlist.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Added to wishlist',
          description: `${product.title} has been added to your wishlist.`,
        });
      }
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="flex gap-6 p-4 border border-border rounded-lg hover:shadow-lg hover:border-accent/50 transition-all group"
    >
      <div className="w-32 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-secondary relative">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-medium text-lg mb-2 group-hover:text-accent transition-colors">{product.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="font-semibold">R{product.price.toFixed(2)}</p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                inWishlist 
                  ? "bg-accent text-accent-foreground border-accent" 
                  : "border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
