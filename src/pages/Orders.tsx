import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { OrderCardSkeleton } from '@/components/ui/skeleton-loader';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import type { OrderWithItems } from '@/types/database';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

export default function Orders() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuthStore();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;

      setIsLoading(true);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data as unknown as OrderWithItems[]);
      }

      setIsLoading(false);
    }

    fetchOrders();
  }, [user]);

  if (authLoading) {
    return (
      <Layout>
        <div className="py-8 md:py-12">
          <div className="container-main">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <OrderCardSkeleton key={i} />
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
            <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-serif font-semibold mb-4">
              Sign in to view your orders
            </h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to see your order history.
            </p>
            <Link to="/auth" className="btn-primary inline-flex">
              Sign In
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0 && !isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container-main text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-serif font-semibold mb-4">
              No orders yet
            </h1>
            <p className="text-muted-foreground mb-8">
              When you place an order, it will appear here.
            </p>
            <Link to="/shop" className="btn-primary inline-flex">
              Start Shopping
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
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
            My Orders
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-4">
              {isLoading ? (
                [1, 2, 3].map((i) => <OrderCardSkeleton key={i} />)
              ) : (
                orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={cn(
                      'w-full text-left border rounded-xl p-6 transition-all hover:shadow-lg',
                      selectedOrder?.id === order.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium capitalize',
                          STATUS_STYLES[order.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.pending
                        )}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
                      {order.order_items?.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="w-14 h-18 flex-shrink-0 overflow-hidden rounded-lg bg-secondary"
                        >
                          <img
                            src={item.products?.image || '/placeholder.svg'}
                            alt={item.products?.title || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.order_items && order.order_items.length > 4 && (
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          +{order.order_items.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-semibold">R{order.total.toFixed(2)}</p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="sticky top-24 bg-secondary/30 rounded-xl p-6 space-y-6 animate-fade-in">
                  <h2 className="text-xl font-serif font-semibold">
                    Order Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                      <p className="font-medium">#{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">
                        {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium capitalize',
                          STATUS_STYLES[selectedOrder.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.pending
                        )}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shipping Address</p>
                      <p className="font-medium">
                        {selectedOrder.shipping_address}, {selectedOrder.city}
                        <br />
                        {selectedOrder.postal_code}, {selectedOrder.country}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Items</p>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedOrder.order_items?.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-12 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                            <img
                              src={item.products?.image || '/placeholder.svg'}
                              alt={item.products?.title || 'Product'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">
                              {item.products?.title || 'Product'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × R{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>R{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sticky top-24 bg-secondary/30 rounded-xl p-6 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select an order to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
