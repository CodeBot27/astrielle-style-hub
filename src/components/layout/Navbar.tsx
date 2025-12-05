import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Sun, Moon, LogOut, Heart } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useThemeStore } from '@/stores/themeStore';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { toast } from '@/hooks/use-toast';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, profile, signOut } = useAuthStore();
  const { getItemCount } = useCartStore();
  const { items: wishlistItems, fetchWishlist } = useWishlistStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    }
  }, [user, fetchWishlist]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo className="h-8 md:h-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors link-underline',
                    isActive(link.href)
                      ? 'text-accent'
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {user && (
                <Link
                  to="/wishlist"
                  className="relative p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              )}

              <Link
                to="/cart"
                className="relative p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/orders"
                    className="flex items-center space-x-2 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>
                      {profile?.name ? `Hi, ${profile.name}` : 'Account'}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-accent transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-background z-50 md:hidden transition-transform duration-300 ease-out shadow-xl',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Logo className="h-8" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block px-4 py-3 rounded-lg font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-secondary text-accent'
                    : 'hover:bg-secondary/50'
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-border my-4" />
            
            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="block px-4 py-3 rounded-lg font-medium hover:bg-secondary/50 transition-colors"
                >
                  My Wishlist
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 rounded-lg font-medium hover:bg-secondary/50 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-secondary/50 transition-colors text-destructive"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-4 py-3 rounded-lg font-medium hover:bg-secondary/50 transition-colors"
              >
                Login / Register
              </Link>
            )}
          </nav>

          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Astrielle
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
