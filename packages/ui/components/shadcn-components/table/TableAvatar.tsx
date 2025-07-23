import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number; // in pixels
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={`rounded-full object-cover ${className}`}
    style={{ width: size, height: size }}
  />
);
