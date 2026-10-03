import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';

interface BoxProgressProps {
  targetSize: number;
  currentCount: number;
  boxPrice: number;
  boxTitle: string;
}

export const BoxProgress: React.FC<BoxProgressProps> = ({
  targetSize,
  currentCount,
  boxPrice,
  boxTitle
}) => {
  const percentage = Math.min(100, Math.round((currentCount / targetSize) * 100));
  const isFull = currentCount >= targetSize;

  return (
    <div className="bg-brand-black text-paper p-5 border-3 border-brand-black shadow-brutal mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-brand-lime" />
          <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
            {boxTitle} ({currentCount}/{targetSize} SNACKS)
          </h3>
        </div>
        <div className="font-mono text-sm font-bold text-brand-lime">
          BOX TOTAL: ₹{boxPrice}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-5 bg-brand-dark border-2 border-brand-lime p-0.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isFull ? 'bg-brand-lime' : 'bg-brand-orange'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-2 font-mono text-xs">
        <span className="text-gray-400">
          {isFull
            ? '🎉 BOX IS READY TO SHIP!'
            : `Add ${targetSize - currentCount} more snack(s) to complete box`}
        </span>
        <span className="font-bold text-white">{percentage}% FILLED</span>
      </div>
    </div>
  );
};
