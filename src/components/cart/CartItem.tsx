import React from 'react';
import { CartItem as CartItemType } from '../../types/cart';
import { QuantitySelector } from '../common/QuantitySelector';
import { formatCurrency } from '../../utils/formatCurrency';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedWeight, id } = item;

  return (
    <div className="flex gap-3 bg-white border-2 border-brand-black p-3 shadow-brutal-sm relative">
      {/* Item Image */}
      <div className="w-20 h-20 bg-paper-dark border border-brand-black flex-shrink-0 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="pr-6">
          <h4 className="font-display font-bold text-xs uppercase text-brand-black line-clamp-1">
            {product.name}
          </h4>
          <p className="font-mono text-[10px] text-gray-500 font-bold uppercase mt-0.5">
            SIZE: {selectedWeight || product.weight}
          </p>
          <p className="font-display font-black text-sm text-brand-black mt-1">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => updateQuantity(id, quantity + 1)}
            onDecrease={() => updateQuantity(id, quantity - 1)}
            size="sm"
          />

          <button
            onClick={() => removeFromCart(id)}
            className="text-red-600 hover:text-red-800 p-1 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
