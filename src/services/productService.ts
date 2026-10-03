import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product, ProductFilterState, CategoryInfo, CategorySlug } from '../types/product';
import { apiRequest } from './api';

let catalogProducts=[...PRODUCTS];
let catalogCategories=[...CATEGORIES];
export async function initializeCatalog(){
  try{const [products,categories]=await Promise.all([apiRequest<Product[]>('/products'),apiRequest<CategoryInfo[]>('/categories')]);catalogProducts=products;catalogCategories=categories;}
  catch(error){console.error('Catalog API unavailable; showing bundled preview catalog.',error);}
}

export const productService = {
  getProducts: (filters?: ProductFilterState): Product[] => {
    let result = [...catalogProducts];

    if (!filters) return result;

    if (filters.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.flavor.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    if (filters.minRating) {
      result = result.filter(p => p.rating >= filters.minRating!);
    }

    if (filters.flavor) {
      result = result.filter(p => p.flavor.toLowerCase() === filters.flavor!.toLowerCase());
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(p => filters.tags!.some(tag => p.tags.includes(tag)));
    }

    if (filters.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
          break;
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    return result;
  },

  getProductBySlug: (slug: string): Product | undefined => {
    return catalogProducts.find(p => p.slug === slug);
  },

  getProductById: (id: string): Product | undefined => {
    return catalogProducts.find(p => p.id === id);
  },

  getFeaturedProducts: (limit = 8): Product[] => {
    return catalogProducts.filter(p => p.featured || p.bestseller).slice(0, limit);
  },

  getCategories: (): CategoryInfo[] => {
    return catalogCategories;
  },

  getCategoryBySlug: (slug: CategorySlug | string): CategoryInfo | undefined => {
    return catalogCategories.find(c => c.slug === slug);
  },

  getRelatedProducts: (currentProduct: Product, limit = 4): Product[] => {
    return catalogProducts
      .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.tags.some(t => currentProduct.tags.includes(t))))
      .slice(0, limit);
  }
};
