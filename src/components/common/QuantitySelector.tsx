import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  max = 99,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  return (
    <div className={cn('inline-flex items-center border-2 border-brand-black bg-white shadow-brutal-sm', sizeClasses[size], className)}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-1 hover:bg-brand-lime transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="font-mono font-bold w-8 text-center text-brand-black">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="p-1 hover:bg-brand-lime transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
