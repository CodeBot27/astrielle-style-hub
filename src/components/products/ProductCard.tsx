import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/types/database';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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
      className={cn('group block', className)}
    >
      <div className="relative overflow-hidden rounded-lg bg-secondary/30 card-hover">
        <div className="aspect-[3/4] relative">
          <LazyImage
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className="w-full h-full object-cover image-hover"
            containerClassName="w-full h-full"
          />
          
          {/* Quick Actions */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-background/95 backdrop-blur-sm text-foreground py-2 px-3 rounded-lg font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={cn(
                "p-3 backdrop-blur-sm rounded-lg transition-colors",
                inWishlist 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-background/95 hover:bg-accent hover:text-accent-foreground"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
            </button>
          </div>

          {/* Featured Badge */}
          {product.is_featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="font-semibold text-foreground">
          R{product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
