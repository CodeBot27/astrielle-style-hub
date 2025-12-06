import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit Card', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: CreditCard },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getTotal, clearCart, fetchCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    shipping_address: '',
    city: '',
    postal_code: '',
    country: '',
    payment_method: 'card',
  });

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user, fetchCart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || items.length === 0) return;

    // Validate form
    if (!formData.shipping_address || !formData.city || !formData.postal_code || !formData.country) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all shipping details.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const subtotal = getTotal();
      const shipping = subtotal > 150 ? 0 : 15;
      const total = subtotal + shipping;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total,
          status: 'pending',
          shipping_address: formData.shipping_address,
          city: formData.city,
          postal_code: formData.postal_code,
          country: formData.country,
          payment_method: formData.payment_method,
        } as any)
        .select()
        .single();

      if (orderError) throw orderError;
      if (!order) throw new Error('Failed to create order');

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: (order as any).id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems as any);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart(user.id);

      toast({
        title: 'Order placed successfully!',
        description: `Your order #${(order as any).id} has been confirmed.`,
      });

      navigate('/order-success', { state: { orderId: (order as any).id } });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Shipping & Payment Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Details */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold">Shipping Details</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="123 Fashion Street"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* Payment Method */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold">Payment Method</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, payment_method: method.id })}
                        className={cn(
                          'flex items-center gap-3 p-4 border rounded-lg transition-all',
                          formData.payment_method === method.id
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        )}
                      >
                        <method.icon className="w-5 h-5" />
                        <span className="font-medium">{method.label}</span>
                        {formData.payment_method === method.id && (
                          <Check className="w-4 h-4 ml-auto text-accent" />
                        )}
                      </button>
                    ))}
                  </div>

                  {formData.payment_method === 'card' && (
                    <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground">
                      <p>This is a demo. No real payment will be processed.</p>
                    </div>
                  )}
                </section>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-secondary/30 rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-serif font-semibold">Order Summary</h2>

                  {/* Items Preview */}
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <img
                            src={item.products.image || '/placeholder.svg'}
                            alt={item.products.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.products.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            R{(item.products.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>R{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : `Pay R${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
