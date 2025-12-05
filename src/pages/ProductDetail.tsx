import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Heart, ChevronLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductDetailSkeleton } from '@/components/ui/skeleton-loader';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/types/database';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { user } = useAuthStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', parseInt(id))
        .maybeSingle();

      if (!error && data) {
        const productData = data as Product;
        setProduct(productData);
        
        // Fetch related products
        if (productData.category) {
          const { data: related } = await supabase
            .from('products')
            .select('*')
            .eq('category', productData.category)
            .neq('id', productData.id)
            .limit(4);

          if (related) {
            setRelatedProducts(related as Product[]);
          }
        }
      }
      
      setIsLoading(false);
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your cart.',
        variant: 'destructive',
      });
      return;
    }

    if (!product) return;

    const { error } = await addToCart(user.id, product, quantity);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Added to cart',
        description: `${quantity}x ${product.title} has been added to your cart.`,
      });
    }
  };

  // Generate additional placeholder images for gallery
  const images = product?.image 
    ? [product.image, product.image, product.image] 
    : ['/placeholder.svg'];

  if (isLoading) {
    return (
      <Layout>
        <div className="py-8 md:py-12">
          <div className="container-main">
            <ProductDetailSkeleton />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container-main text-center">
            <h1 className="text-2xl font-serif font-semibold mb-4">Product not found</h1>
            <Link to="/shop" className="text-accent hover:underline">
              Return to shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-main">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
                <img
                  src={images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-24 overflow-hidden rounded-lg bg-secondary transition-all ${
                      activeImage === index ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold">
                  R{product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description || 'Discover the perfect blend of style and comfort with this exquisite piece from our collection. Crafted with attention to detail and made from premium materials for lasting quality.'}
              </p>

              {/* Product Details */}
              <div className="space-y-3 py-6 border-y border-border">
                {product.type && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{product.type}</span>
                  </div>
                )}
                {product.style && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Style</span>
                    <span className="font-medium capitalize">{product.style}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-medium">AST-{product.id.toString().padStart(5, '0')}</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-secondary/30 rounded-lg p-6 space-y-3">
                <p className="text-sm">
                  <span className="font-medium">Free Shipping</span> on orders over R500
                </p>
                <p className="text-sm">
                  <span className="font-medium">Easy Returns</span> within 30 days
                </p>
                <p className="text-sm">
                  <span className="font-medium">Secure Checkout</span> with SSL encryption
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-serif font-semibold mb-8">
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
