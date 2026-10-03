import React from 'react';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const related = productService.getRelatedProducts(currentProduct, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t-4 border-brand-black">
      <div className="mb-8">
        <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2 py-0.5 border border-brand-black">
          MORE LIKE THIS
        </span>
        <h3 className="font-display font-black text-3xl uppercase tracking-tight text-brand-black mt-1">
          YOU MIGHT ALSO DEVOUR.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};
