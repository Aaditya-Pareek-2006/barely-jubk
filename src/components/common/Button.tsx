import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isFullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-brand-black text-white hover:bg-brand-dark border-2 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
    accent: 'bg-brand-lime text-brand-black hover:bg-brand-lime-dark border-2 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
    secondary: 'bg-brand-orange text-white hover:bg-brand-orange-dark border-2 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
    outline: 'bg-transparent text-brand-black hover:bg-brand-black hover:text-white border-2 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
    ghost: 'bg-transparent text-brand-black hover:bg-brand-black/10 border-2 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-2 border-brand-black shadow-brutal hover:shadow-none',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
    xl: 'text-lg px-9 py-4 gap-3',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isFullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Crunching...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
