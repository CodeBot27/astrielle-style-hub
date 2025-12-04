import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-8xl md:text-9xl font-serif font-semibold gradient-text mb-4 animate-fade-in">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
