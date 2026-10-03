import React from 'react';
import { cn } from '../../utils/cn';
import { getBadgeColorClass } from '../../utils/productHelpers';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bestseller' | 'new' | 'spicy' | 'limited' | 'fanfav' | 'lowstock' | 'custom';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant, className }) => {
  const variantClass = variant ? getBadgeColorClass(variant) : getBadgeColorClass(children?.toString());

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border border-brand-black',
        variantClass,
        className
      )}
    >
      {children}
    </span>
  );
};
