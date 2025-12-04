import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <Layout>
      <div className="py-20">
        <div className="container-main">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Order Confirmed!
            </h1>

            <p className="text-muted-foreground mb-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Thank you for your purchase.
            </p>

            {orderId && (
              <p className="text-lg font-medium mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
                Order #{orderId}
              </p>
            )}

            <div className="bg-secondary/30 rounded-xl p-6 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-5 h-5 text-accent" />
                <span className="font-medium">What's Next?</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You will receive an email confirmation shortly. We'll notify you when your order ships.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Link
                to="/orders"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                View My Orders
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
