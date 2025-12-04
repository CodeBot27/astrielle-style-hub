import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'gradient';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <span
        className={cn(
          'font-serif text-2xl md:text-3xl font-semibold tracking-tight',
          variant === 'gradient' ? 'gradient-text' : 'text-foreground'
        )}
      >
        Astrielle
      </span>
      <span
        className={cn(
          'ml-0.5 w-1.5 h-1.5 rounded-full',
          variant === 'gradient' ? 'bg-champagne' : 'bg-accent'
        )}
      />
    </div>
  );
}
