import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  containerClassName,
  placeholder = '/placeholder.svg',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setCurrentSrc(placeholder);
        setIsLoaded(true);
      };
    }
  }, [isInView, src, placeholder]);

  return (
    <div
      ref={imgRef}
      className={cn('overflow-hidden bg-muted', containerClassName)}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-all duration-500',
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
          className
        )}
      />
    </div>
  );
}
