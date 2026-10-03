import React from 'react';
import { Product } from '../../types/product';
import { Button } from '../common/Button';
import { ShoppingBag, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BoxSummaryProps {
  selectedItems: { product: Product; quantity: number }[];
  targetSize: number;
  boxPrice: number;
  onClear: () => void;
  onAddToCart: () => void;
}

export const BoxSummary: React.FC<BoxSummaryProps> = ({
  selectedItems,
  targetSize,
  boxPrice,
  onClear,
  onAddToCart
}) => {
  const totalCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const isComplete = totalCount === targetSize;

  const handleCompleteBox = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onAddToCart();
  };

  return (
    <div className="bg-paper-dark border-3 border-brand-black p-6 shadow-brutal flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b-2 border-brand-black mb-4">
          <h4 className="font-display font-black text-lg uppercase text-brand-black">
            YOUR CUSTOM BOX
          </h4>
          {selectedItems.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs font-mono text-red-600 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              CLEAR ALL
            </button>
          )}
        </div>

        {selectedItems.length === 0 ? (
          <p className="font-mono text-xs text-gray-500 text-center py-8">
            Your box is empty. Click "+ ADD TO BOX" on your favorite snacks to start packing!
          </p>
        ) : (
          <ul className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {selectedItems.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between bg-white border border-brand-black p-2 text-xs font-mono"
              >
                <span className="font-bold truncate max-w-[180px]">{product.name}</span>
                <span className="bg-brand-lime text-brand-black px-2 py-0.5 font-bold border border-brand-black">
                  x{quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 pt-4 border-t-2 border-brand-black space-y-4">
        <div className="flex justify-between items-baseline font-mono">
          <span className="text-xs text-gray-600 uppercase font-bold">BUNDLE PRICE</span>
          <span className="font-display font-black text-2xl text-brand-black">₹{boxPrice}</span>
        </div>

        <Button
          variant={isComplete ? 'accent' : 'primary'}
          size="lg"
          isFullWidth
          disabled={!isComplete}
          onClick={handleCompleteBox}
        >
          <ShoppingBag className="w-5 h-5 mr-1" />
          {isComplete ? 'ADD BUNDLE TO CART' : `FILL ${targetSize - totalCount} MORE ITEMS`}
        </Button>
      </div>
    </div>
  );
};
