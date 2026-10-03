import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';
import { Tag, ArrowRight, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartSummary: React.FC<{ onCheckoutSuccess?: () => void }> = ({ onCheckoutSuccess }) => {
  const { cartSummary, applyCoupon, removeCoupon, couponError, setIsCartOpen } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    if (onCheckoutSuccess) onCheckoutSuccess();
    navigate('/checkout');
  };

  return (
    <div className="bg-paper-dark border-3 border-brand-black p-5 shadow-brutal space-y-4 font-mono text-xs">
      <h3 className="font-display font-black text-lg uppercase text-brand-black pb-2 border-b-2 border-brand-black">
        ORDER SUMMARY
      </h3>

      {/* Subtotal, Discount, Shipping, Tax */}
      <div className="space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>SUBTOTAL</span>
          <span className="font-bold text-brand-black">{formatCurrency(cartSummary.subtotal)}</span>
        </div>

        {cartSummary.discount > 0 && (
          <div className="flex justify-between text-brand-orange font-bold">
            <span>COUPON DISCOUNT</span>
            <span>-{formatCurrency(cartSummary.discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>ESTIMATED SHIPPING</span>
          <span>{cartSummary.shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(cartSummary.shipping)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>ESTIMATED TAX (5% GST)</span>
          <span className="font-bold text-brand-black">{formatCurrency(cartSummary.tax)}</span>
        </div>
      </div>

      {/* Coupon Field */}
      <div className="pt-3 border-t border-gray-300">
        {cartSummary.appliedCoupon ? (
          <div className="flex items-center justify-between bg-brand-lime/20 border border-brand-black p-2 text-brand-black">
            <div className="flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{cartSummary.appliedCoupon.code} APPLIED</span>
            </div>
            <button
              onClick={removeCoupon}
              className="p-0.5 hover:bg-brand-black hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-1.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="COUPON (e.g. TRASH10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 bg-white border border-brand-black font-mono text-xs uppercase focus:outline-none focus:border-brand-lime"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-brand-black text-white font-display font-bold text-xs uppercase hover:bg-brand-lime hover:text-brand-black transition-colors border border-brand-black"
              >
                APPLY
              </button>
            </div>
            {couponError && <p className="text-red-600 text-[10px] font-bold">{couponError}</p>}
          </form>
        )}
      </div>

      {/* Total */}
      <div className="pt-3 border-t-2 border-brand-black flex justify-between items-baseline font-mono">
        <span className="font-bold text-sm text-brand-black uppercase">GRAND TOTAL</span>
        <span className="font-display font-black text-2xl text-brand-black">
          {formatCurrency(cartSummary.total)}
        </span>
      </div>

      <Button
        variant="accent"
        size="lg"
        isFullWidth
        className="shadow-brutal"
        onClick={handleProceedCheckout}
      >
        <span>PROCEED TO CHECKOUT</span>
        <ArrowRight className="w-5 h-5 ml-1" />
      </Button>
    </div>
  );
};
