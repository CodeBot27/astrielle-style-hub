import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';
import { LazyImage } from '@/components/ui/lazy-image';
import { ProductCardSkeleton } from '@/components/ui/skeleton-loader';
import { toast } from '@/hooks/use-toast';

export default function Wishlist() {
  const { user } = useAuthStore();
  const { items, isLoading, fetchWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    }
  }, [user, fetchWishlist]);

  const handleRemove = async (productId: number) => {
    if (!user) return;
    
    const { error } = await removeFromWishlist(user.id, productId);
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item from wishlist.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Removed',
        description: 'Item removed from wishlist.',
      });
    }
  };

  const handleAddToCart = async (product: any) => {
    if (!user) return;
    
    const { error } = await addToCart(user.id, product);
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-main">
          <div className="max-w-md mx-auto text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-serif font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to view and manage your wishlist.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-main">
          <div className="max-w-md mx-auto text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-serif font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist and find them here anytime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <Link
                to={`/product/${item.product_id}`}
                className="block"
              >
                <div className="relative overflow-hidden rounded-lg bg-secondary/30 card-hover">
                  <div className="aspect-[3/4] relative">
                    <LazyImage
                      src={item.product?.image || '/placeholder.svg'}
                      alt={item.product?.title || 'Product'}
                      className="w-full h-full object-cover image-hover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.product?.category}
                  </p>
                  <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {item.product?.title}
                  </h3>
                  <p className="font-semibold text-foreground">
                    R{item.product?.price?.toFixed(2)}
                  </p>
                </div>
              </Link>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => item.product && handleAddToCart(item.product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="p-2.5 bg-secondary hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
