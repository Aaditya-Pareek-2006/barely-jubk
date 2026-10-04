import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Categories: React.FC = () => {
  const {totalItemCount}=useCart();
  return <PageTransition><main className="min-h-screen bg-paper"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-end"><Link to="/cart" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime border-2 border-brand-black shadow-brutal-sm font-display font-bold text-sm uppercase hover:bg-brand-black hover:text-brand-lime"><ShoppingBag className="w-4 h-4"/>View Cart ({totalItemCount})</Link></div><CategoryShowcase /></main></PageTransition>;
};
