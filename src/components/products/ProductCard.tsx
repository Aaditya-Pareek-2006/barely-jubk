import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../common/Badge';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { getSpicinessLabel } from '../../utils/productHelpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white border-3 border-brand-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Top Media Container */}
      <div className="relative aspect-square overflow-hidden bg-paper-dark border-b-3 border-brand-black">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && <Badge>{product.badge}</Badge>}
          {product.spicinessLevel && product.spicinessLevel > 0 && (
            <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-brand-black">
              {getSpicinessLabel(product.spicinessLevel)}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 p-2 border-2 border-brand-black transition-all ${
            isLiked
              ? 'bg-brand-orange text-white'
              : 'bg-white text-brand-black hover:bg-brand-lime'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between font-mono text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-bold text-brand-black">
              {product.categoryName}
            </span>
            <span className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 mr-1" />
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-display font-bold text-lg text-brand-black leading-snug group-hover:text-brand-orange transition-colors line-clamp-1 uppercase">
              {product.name}
            </h3>
          </Link>

          <p className="font-sans text-xs text-gray-600 line-clamp-2 mt-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Weight & Quick Add Button */}
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
          <div>
            <span className="font-mono text-xs text-gray-500 block">{product.weight}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl text-brand-black">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-xs text-gray-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`px-3 py-2 border-2 border-brand-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-brutal-sm ${
              addedAnimation
                ? 'bg-emerald-500 text-white border-brand-black'
                : 'bg-brand-lime text-brand-black hover:bg-brand-black hover:text-brand-lime'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
