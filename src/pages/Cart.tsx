import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { CartRecommendations } from '../components/cart/CartRecommendations';
import { EmptyState } from '../components/common/EmptyState';
import { PageTransition } from '../components/layout/PageTransition';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between border-b-4 border-brand-black pb-4 mb-8">
            <div>
              <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
                YOUR SHOPPING STASH
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-brand-black mt-1">
                SHOPPING CART ({cartItems.length})
              </h1>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="font-mono text-xs font-bold text-red-600 hover:underline uppercase"
              >
                EMPTY CART
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <EmptyState
              title="YOUR CART IS SUSPICIOUSLY EMPTY."
              description="No crunchy snacks found in your bag. Load up on makhana, kettle wafers, and thick cookies right now."
              actionText="SHOP ALL SNACKS"
              onAction={() => navigate('/shop')}
              icon={<ShoppingBag className="w-8 h-8" />}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}

                <CartRecommendations />
              </div>

              <div className="lg:col-span-5 sticky top-24">
                <CartSummary />
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};
