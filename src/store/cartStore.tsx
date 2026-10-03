import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon, CartSummaryType } from '../types/cart';
import { Product } from '../types/product';

const STORAGE_KEY_CART = 'barely_junk_cart_items';
const STORAGE_KEY_COUPON = 'barely_junk_cart_coupon';

export const VALID_COUPONS: Coupon[] = [
  { code: 'TRASH10', discountPercentage: 10, description: '10% OFF for Certified Junkies' },
  { code: 'JUNKIE20', discountPercentage: 20, minSpend: 999, description: '20% OFF orders over ₹999' },
      { code: 'FREESHIP', flatDiscount: 49, description: 'Free Express Delivery' },
];

interface CartContextType {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  couponError: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedWeight?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSummary: CartSummaryType;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEY_COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEY_COUPON);
      }
    } catch (e) {
      console.error('Failed to save coupon', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1, selectedWeight?: string) => {
    const weightToUse = selectedWeight || product.weight;
    const itemId = `${product.id}-${weightToUse}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { id: itemId, product, quantity, selectedWeight: weightToUse }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanedCode = code.trim().toUpperCase();
    const found = VALID_COUPONS.find(c => c.code === cleanedCode);

    if (!found) {
      setCouponError('Invalid coupon code. Try TRASH10 or JUNKIE20');
      return false;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (found.minSpend && subtotal < found.minSpend) {
      setCouponError(`Min order value ₹${found.minSpend} required for ${found.code}`);
      return false;
    }

    setAppliedCoupon(found);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.flatDiscount && appliedCoupon.code !== 'FREESHIP') {
      discount = appliedCoupon.flatDiscount;
    }
  }

  const shipping = subtotal > 499 || subtotal === 0 || appliedCoupon?.code === 'FREESHIP' ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const total = Math.max(0, subtotal - discount + shipping + tax);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSummary: CartSummaryType = {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    appliedCoupon
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        appliedCoupon,
        couponError,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartSummary,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};
