import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TableText: React.FC<TextProps> = ({ children, size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  return <p className={`${sizeClass} ${className}`}>{children}</p>;
};
