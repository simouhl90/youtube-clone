'use client';

import { useState } from 'react';

interface OptImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

export default function OptImage({ src, alt, className = '', style, loading = 'lazy', onClick }: OptImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style} onClick={onClick}>
      {/* Blur placeholder - dominant color base */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/[0.06] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
        }`}
      />
    </div>
  );
}
