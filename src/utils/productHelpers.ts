import { Product } from '../types/product';

export const getBadgeColorClass = (badge?: string): string => {
  if (!badge) return 'bg-brand-black text-white';
  switch (badge.toUpperCase()) {
    case 'BESTSELLER':
      return 'bg-brand-orange text-white shadow-brutal-sm';
    case 'NEW':
      return 'bg-brand-lime text-brand-black shadow-brutal-sm font-bold';
    case 'SPICY':
      return 'bg-red-600 text-white shadow-brutal-sm';
    case 'LIMITED':
      return 'bg-purple-600 text-white shadow-brutal-sm';
    case 'FAN FAV':
      return 'bg-brand-black text-brand-lime shadow-brutal-sm';
    case 'LOW STOCK':
      return 'bg-yellow-400 text-black shadow-brutal-sm';
    default:
      return 'bg-brand-black text-white';
  }
};

export const calculateDiscountPercentage = (price: number, compareAtPrice?: number): number => {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};

export const getSpicinessLabel = (level?: number): string => {
  switch (level) {
    case 1: return 'Mild Flame 🌶️';
    case 2: return 'Hot & Heavy 🌶️🌶️';
    case 3: return 'Illegal Inferno 🌶️🌶️🌶️';
    default: return 'No Spice';
  }
};
