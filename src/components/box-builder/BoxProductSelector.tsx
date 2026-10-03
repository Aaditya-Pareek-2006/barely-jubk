import React from 'react';
import { Product } from '../../types/product';
import { Plus, Check, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

interface BoxProductSelectorProps {
  products: Product[];
  selectedProductsMap: { [productId: string]: number };
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  isDisabled: boolean;
}

export const BoxProductSelector: React.FC<BoxProductSelectorProps> = ({
  products,
  selectedProductsMap,
  onAdd,
  onRemove,
  isDisabled,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => {
        const count = selectedProductsMap[product.id] || 0;
        return (
          <div
            key={product.id}
            className={`relative bg-white border-2 border-brand-black p-3 flex flex-col justify-between transition-all ${
              count > 0 ? 'bg-brand-lime/10 shadow-brutal-sm' : ''
            }`}
          >
            {count > 0 && (
              <span className="absolute top-2 right-2 bg-brand-lime text-brand-black font-mono font-bold text-xs px-2 py-0.5 border border-brand-black z-10">
                x{count}
              </span>
            )}

            <div className="aspect-square bg-paper-dark border border-brand-black overflow-hidden mb-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="font-mono text-[10px] text-gray-500 uppercase block font-bold">
                {product.categoryName}
              </span>
              <h4 className="font-display font-bold text-xs text-brand-black uppercase line-clamp-1">
                {product.name}
              </h4>
            </div>

            <div className="mt-3 flex items-center justify-between">
              {count > 0 ? (
                <div className="flex items-center gap-1.5 w-full justify-between">
                  <button
                    onClick={() => onRemove(product.id)}
                    className="p-1 bg-brand-black text-white hover:bg-red-600 transition-colors border border-brand-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-xs">{count}</span>
                  <button
                    onClick={() => onAdd(product)}
                    disabled={isDisabled}
                    className="p-1 bg-brand-lime text-brand-black hover:bg-brand-black hover:text-white transition-colors border border-brand-black disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onAdd(product)}
                  disabled={isDisabled}
                  className="w-full py-1.5 bg-brand-black text-white hover:bg-brand-lime hover:text-brand-black font-display font-bold text-xs uppercase tracking-wider transition-colors border border-brand-black flex items-center justify-center gap-1 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD TO BOX</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
