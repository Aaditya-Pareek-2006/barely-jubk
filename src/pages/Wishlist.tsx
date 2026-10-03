import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { WishlistItem } from '../components/wishlist/WishlistItem';
import { EmptyState } from '../components/common/EmptyState';
import { PageTransition } from '../components/layout/PageTransition';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between border-b-4 border-brand-black pb-4 mb-8">
            <div>
              <span className="font-mono font-bold text-xs uppercase bg-brand-orange text-white px-2.5 py-1 border border-brand-black">
                SAVED STASH
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-brand-black mt-1">
                MY WISHLIST ({wishlist.length})
              </h1>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="font-mono text-xs font-bold text-red-600 hover:underline uppercase"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <EmptyState
              title="NOTHING SAVED YET."
              description="Your saved stash is looking empty. Click the heart icon on any snack card to save it for later."
              actionText="EXPLORE ALL SNACKS"
              onAction={() => navigate('/shop')}
              icon={<Heart className="w-8 h-8" />}
            />
          ) : (
            <div className="space-y-4">
              {wishlist.map(product => (
                <WishlistItem key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};
