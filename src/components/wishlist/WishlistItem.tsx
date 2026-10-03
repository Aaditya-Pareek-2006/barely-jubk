import React from 'react';
import { Product } from '../../types/product';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistItem: React.FC<{ product: Product }> = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = () => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-white border-3 border-brand-black p-4 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-20 h-20 object-cover border-2 border-brand-black bg-paper-dark flex-shrink-0"
        />
        <div>
          <span className="font-mono text-[10px] font-bold text-gray-500 uppercase block">
            {product.categoryName}
          </span>
          <Link to={`/product/${product.slug}`}>
            <h4 className="font-display font-bold text-base text-brand-black hover:text-brand-orange uppercase">
              {product.name}
            </h4>
          </Link>
          <div className="font-display font-black text-lg text-brand-black mt-1">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
        <Button variant="accent" size="sm" onClick={handleMoveToCart}>
          <ShoppingBag className="w-4 h-4 mr-1" />
          MOVE TO CART
        </Button>
        <button
          onClick={() => removeFromWishlist(product.id)}
          className="p-2 border-2 border-brand-black bg-paper-dark hover:bg-red-600 hover:text-white transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
