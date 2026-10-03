import React from 'react';
import { ProductFilterState, CategorySlug } from '../../types/product';
import { CATEGORIES } from '../../data/categories';
import { Filter, X, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFilterState;
  onFilterChange: (filters: Partial<ProductFilterState>) => void;
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset
}) => {
  const flavorOptions = ['Ghost Chili', 'Truffle', 'Cheddar', 'Hot Honey', 'Dark Chocolate', 'Rosemary'];

  return (
    <div className="bg-paper-dark border-3 border-brand-black p-5 shadow-brutal space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-brand-black">
        <h3 className="font-display font-black text-lg uppercase tracking-wider text-brand-black flex items-center gap-2">
          <Filter className="w-5 h-5" />
          FILTER SNACKS
        </h3>
        <button
          onClick={onReset}
          className="font-mono text-xs font-bold text-gray-600 hover:text-brand-orange flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESET
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="font-mono font-bold text-xs uppercase text-brand-black block mb-2">
          CATEGORY
        </label>
        <div className="space-y-1.5 font-mono text-xs">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={`w-full text-left px-3 py-2 border font-bold uppercase transition-all ${
              !filters.category || filters.category === 'all'
                ? 'bg-brand-black text-brand-lime border-brand-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-brand-black'
            }`}
          >
            ALL CATEGORIES
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => onFilterChange({ category: cat.slug as CategorySlug })}
              className={`w-full text-left px-3 py-2 border font-bold uppercase transition-all ${
                filters.category === cat.slug
                  ? 'bg-brand-black text-brand-lime border-brand-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-black'
              }`}
            >
              {cat.name} ({cat.itemCount})
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="font-mono font-bold text-xs uppercase text-brand-black block mb-2">
          MAX PRICE: ₹{filters.priceRange ? filters.priceRange[1] : 500}
        </label>
        <input
          type="range"
          min="100"
          max="500"
          step="10"
          value={filters.priceRange ? filters.priceRange[1] : 500}
          onChange={(e) => onFilterChange({ priceRange: [0, Number(e.target.value)] })}
          className="w-full accent-brand-orange cursor-pointer"
        />
        <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
          <span>₹100</span>
          <span>₹500</span>
        </div>
      </div>

      {/* Spiciness / Rating Filter */}
      <div>
        <label className="font-mono font-bold text-xs uppercase text-brand-black block mb-2">
          MIN RATING
        </label>
        <div className="flex gap-2">
          {[0, 4.5, 4.8].map(r => (
            <button
              key={r}
              onClick={() => onFilterChange({ minRating: r })}
              className={`flex-1 py-1.5 font-mono text-xs font-bold border transition-all ${
                filters.minRating === r
                  ? 'bg-brand-orange text-white border-brand-black'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {r === 0 ? 'ALL' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-2 border-t border-gray-300">
        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-brand-black select-none">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-brand-black"
          />
          IN STOCK ONLY
        </label>
      </div>

    </div>
  );
};
