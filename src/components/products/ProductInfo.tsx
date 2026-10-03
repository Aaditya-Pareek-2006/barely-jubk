import React, { useState } from 'react';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../common/Badge';
import { QuantitySelector } from '../common/QuantitySelector';
import { Button } from '../common/Button';
import { Heart, ShoppingBag, Zap, ShieldCheck, Flame, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { getSpicinessLabel } from '../../utils/productHelpers';
import { useNavigate } from 'react-router-dom';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const weights = [product.weight, 'Pouch Pack (2x)', 'Party Bucket (4x)'];

  return (
    <div className="space-y-6">
      
      {/* Category & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>{product.badge || 'PREMIUM SNACK'}</Badge>
          <span className="font-mono text-xs uppercase font-bold text-gray-600">
            {product.categoryName}
          </span>
          {product.spicinessLevel && product.spicinessLevel > 0 && (
            <span className="bg-red-600 text-white font-mono text-xs font-bold px-2 py-0.5 border border-brand-black">
              {getSpicinessLabel(product.spicinessLevel)}
            </span>
          )}
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-black leading-none">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mt-3 font-mono text-xs">
          <div className="flex items-center text-amber-500 font-bold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-500' : 'text-gray-300'}`} />
            ))}
            <span className="ml-1 text-brand-black">{product.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{product.reviewCount} Certified Junkie Reviews</span>
          <span className="text-gray-400">•</span>
          <span className={product.stock > 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
            {product.stock > 0 ? `IN STOCK (${product.stock} LEFT)` : 'SOLD OUT'}
          </span>
        </div>
      </div>

      {/* Pricing Banner */}
      <div className="bg-paper-dark p-4 border-2 border-brand-black flex items-baseline gap-3">
        <span className="font-display font-black text-4xl text-brand-black">
          {formatCurrency(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="font-mono text-sm text-gray-400 line-through">
            {formatCurrency(product.compareAtPrice)}
          </span>
        )}
        {product.discount && (
          <span className="bg-brand-orange text-white font-mono text-xs font-bold px-2 py-0.5 border border-brand-black">
            SAVE {product.discount}%
          </span>
        )}
      </div>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        {product.description}
      </p>

      {/* Weight Selector */}
      <div>
        <label className="font-mono font-bold text-xs uppercase text-brand-black block mb-2">
          PACK SIZE / WEIGHT:
        </label>
        <div className="flex flex-wrap gap-2">
          {weights.map((w, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWeight(w)}
              className={`px-3 py-2 font-mono text-xs font-bold uppercase border-2 transition-all ${
                selectedWeight === w
                  ? 'bg-brand-lime text-brand-black border-brand-black shadow-brutal-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-black'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            size="lg"
          />

          <Button
            variant="accent"
            size="lg"
            className="flex-1 shadow-brutal"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5 mr-1" />
            ADD TO CART
          </Button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`p-3.5 border-2 border-brand-black transition-all ${
              isLiked ? 'bg-brand-orange text-white' : 'bg-white text-brand-black hover:bg-brand-lime'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <Button
          variant="secondary"
          size="lg"
          isFullWidth
          onClick={handleBuyNow}
        >
          <Zap className="w-5 h-5 mr-1" />
          BUY IT NOW (1-CLICK CHECKOUT)
        </Button>
      </div>

      {/* Ingredients & Nutrition Tabs */}
      <div className="border-t-2 border-brand-black pt-4 space-y-4 font-mono text-xs">
        <div>
          <h4 className="font-bold text-brand-black uppercase mb-1">INGREDIENTS:</h4>
          <p className="text-gray-600">{product.ingredients.join(', ')}</p>
        </div>

        <div>
          <h4 className="font-bold text-brand-black uppercase mb-1">NUTRITION FACTS (PER 100g):</h4>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 bg-paper-dark p-3 border border-brand-black text-center">
            <div><span className="text-gray-500 block">CALORIES</span><span className="font-bold text-brand-black">{product.nutrition.calories}</span></div>
            <div><span className="text-gray-500 block">PROTEIN</span><span className="font-bold text-brand-black">{product.nutrition.protein}</span></div>
            <div><span className="text-gray-500 block">CARBS</span><span className="font-bold text-brand-black">{product.nutrition.carbs}</span></div>
            <div><span className="text-gray-500 block">FAT</span><span className="font-bold text-brand-black">{product.nutrition.fat}</span></div>
            <div><span className="text-gray-500 block">FIBER</span><span className="font-bold text-brand-black">{product.nutrition.fiber}</span></div>
          </div>
        </div>

        {product.allergens && product.allergens.length > 0 && (
          <div>
            <h4 className="font-bold text-red-600 uppercase mb-1">ALLERGEN INFO:</h4>
            <p className="text-gray-600">{product.allergens.join(', ')}</p>
          </div>
        )}
      </div>

    </div>
  );
};
