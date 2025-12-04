import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CartItemSkeleton } from '@/components/ui/skeleton-loader';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

export default function Cart() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuthStore();
  const { items, isLoading, fetchCart, updateQuantity, removeFromCart, getTotal } = useCartStore();

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user, fetchCart]);

  if (authLoading) {
    return (
      <Layout>
        <div className="py-8 md:py-12">
          <div className="container-main">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container-main text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-serif font-semibold mb-4">
              Sign in to view your cart
            </h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to add items and manage your shopping cart.
            </p>
            <Link to="/auth" className="btn-primary inline-flex">
              Sign In
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container-main text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-serif font-semibold mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {isLoading ? (
                [1, 2, 3].map((i) => <CartItemSkeleton key={i} />)
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 md:gap-6 py-6 border-b border-border animate-fade-in"
                  >
                    <Link
                      to={`/product/${item.product_id}`}
                      className="w-24 md:w-32 h-32 md:h-40 flex-shrink-0 overflow-hidden rounded-lg bg-secondary"
                    >
                      <img
                        src={item.products.image || '/placeholder.svg'}
                        alt={item.products.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.product_id}`}
                            className="font-medium hover:text-accent transition-colors"
                          >
                            {item.products.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.products.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(user.id, item.product_id)}
                          className="p-2 hover:bg-secondary rounded-full transition-colors h-fit"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(user.id, item.product_id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(user.id, item.product_id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-semibold">
                          ${(item.products.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-secondary/30 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-serif font-semibold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
