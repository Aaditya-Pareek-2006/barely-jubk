import React from 'react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { Plus, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const CartRecommendations: React.FC = () => {
  const { addToCart, cartItems } = useCart();

  // Recommend products that are not currently in the cart
  const cartIds = cartItems.map(item => item.product.id);
  const recommendations = PRODUCTS.filter(p => !cartIds.includes(p.id)).slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t-2 border-brand-black space-y-3">
      <h4 className="font-display font-bold text-xs uppercase text-brand-black tracking-wider">
        JUNKIES ALSO ADDED:
      </h4>
      <div className="space-y-2">
        {recommendations.map(prod => (
          <div
            key={prod.id}
            className="flex items-center justify-between bg-white border border-brand-black p-2 shadow-brutal-sm"
          >
            <div className="flex items-center gap-2">
              <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover border border-brand-black" />
              <div>
                <h5 className="font-display font-bold text-xs uppercase line-clamp-1">{prod.name}</h5>
                <span className="font-mono text-[10px] text-brand-orange font-bold">{formatCurrency(prod.price)}</span>
              </div>
            </div>
            <button
              onClick={() => addToCart(prod)}
              className="p-1.5 bg-brand-lime text-brand-black hover:bg-brand-black hover:text-white transition-colors border border-brand-black text-xs font-mono font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
