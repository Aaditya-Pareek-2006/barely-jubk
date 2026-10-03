import { useState, useMemo } from 'react';
import { productService } from '../services/productService';
import { ProductFilterState } from '../types/product';

export const useProducts = (initialFilters?: ProductFilterState) => {
  const [filters, setFilters] = useState<ProductFilterState>(initialFilters || {
    category: 'all',
    sortBy: 'featured',
  });

  const products = useMemo(() => {
    return productService.getProducts(filters);
  }, [filters]);

  const categories = useMemo(() => {
    return productService.getCategories();
  }, []);

  const updateFilters = (newFilters: Partial<ProductFilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({ category: 'all', sortBy: 'featured' });
  };

  return {
    products,
    categories,
    filters,
    setFilters,
    updateFilters,
    resetFilters,
    totalCount: products.length,
  };
};
