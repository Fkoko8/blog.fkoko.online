'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function SmartImage({
  src,
  alt,
  className,
  fill = false,
  sizes,
  priority = false,
}: SmartImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted/50',
          fill ? 'absolute inset-0' : 'w-full h-full min-h-[200px]',
          className
        )}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-xs font-mono">No image</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={cn(
            'animate-pulse bg-muted/50',
            fill ? 'absolute inset-0' : 'w-full h-full',
            className
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes ?? (fill ? '(max-width: 768px) 100vw, 50vw' : undefined)}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          fill ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-full object-cover',
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}
