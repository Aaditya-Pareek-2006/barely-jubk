import React from 'react';
import { ProductFilterState } from '../../types/product';
import { ArrowUpDown } from 'lucide-react';

interface ProductSortProps {
  currentSort?: ProductFilterState['sortBy'];
  onSortChange: (sortBy: ProductFilterState['sortBy']) => void;
  totalCount: number;
}

export const ProductSort: React.FC<ProductSortProps> = ({
  currentSort = 'featured',
  onSortChange,
  totalCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-2 border-brand-black p-3 mb-6 shadow-brutal-sm">
      <span className="font-mono text-xs font-bold uppercase text-brand-black">
        SHOWING <span className="text-brand-orange">{totalCount}</span> SNACKS
      </span>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-brand-black" />
        <span className="font-mono text-xs font-bold uppercase text-gray-500">SORT BY:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as ProductFilterState['sortBy'])}
          className="bg-paper-dark border-2 border-brand-black px-3 py-1.5 font-mono text-xs font-bold uppercase text-brand-black focus:outline-none focus:border-brand-lime"
        >
          <option value="featured">Featured Drops</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
};
