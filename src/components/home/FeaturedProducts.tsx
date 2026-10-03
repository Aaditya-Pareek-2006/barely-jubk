import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../products/ProductCard';
import { productService } from '../../services/productService';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const featured = productService.getFeaturedProducts(8);

  return (
    <section className="py-20 bg-paper-texture border-b-4 border-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
              TOP CRUNCH SELECTION
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-brand-black mt-2">
              THE GOOD STUFF.
            </h2>
          </div>
          
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center font-display font-bold text-sm uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors group"
          >
            <span>VIEW ALL 25+ FLAVORS</span>
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
