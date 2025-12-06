import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded bg-muted',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:animate-[shimmer_1.5s_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/10 before:to-transparent',
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 rounded-lg" />
      </div>
      <div className="space-y-2 px-1">
        <Skeleton className="h-3 w-1/3 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-5 w-1/4 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, columns = 3 }: { count?: number; columns?: 2 | 3 | 4 }) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6 md:gap-8', gridCols[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function ProductListItemSkeleton() {
  return (
    <div className="flex gap-6 p-4 border border-border rounded-lg animate-fade-in">
      <Skeleton className="w-32 h-40 flex-shrink-0 rounded-lg" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-6 w-2/3 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-5 w-24 rounded mt-auto" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <Skeleton className="w-24 h-32 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-24 mt-4" />
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-4 w-48" />
      <div className="flex gap-2">
        <Skeleton className="w-16 h-20 rounded" />
        <Skeleton className="w-16 h-20 rounded" />
        <Skeleton className="w-16 h-20 rounded" />
      </div>
      <Skeleton className="h-6 w-24" />
    </div>
  );
}
