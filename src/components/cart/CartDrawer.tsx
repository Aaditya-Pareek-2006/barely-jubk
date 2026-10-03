import React from 'react';
import { Drawer } from '../common/Drawer';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { CartRecommendations } from './CartRecommendations';
import { EmptyState } from '../common/EmptyState';
import { ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      title={`YOUR CART (${cartItems.length})`}
      position="right"
    >
      {cartItems.length === 0 ? (
        <div className="py-8">
          <EmptyState
            title="YOUR CART IS SUSPICIOUSLY EMPTY."
            description="Looks like you haven't snatched any certified trash snacks yet. Explore our vault and load up."
            actionText="START SHOPPING"
            onAction={() => setIsCartOpen(false)}
            icon={<ShoppingBag className="w-8 h-8" />}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Cart Items List */}
          <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-1">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Quick Cross Sell Recommendations */}
          <CartRecommendations />

          {/* Sticky Summary & Checkout */}
          <CartSummary />
        </div>
      )}
    </Drawer>
  );
};
