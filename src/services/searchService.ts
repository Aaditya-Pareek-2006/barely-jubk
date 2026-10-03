import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product, CategoryInfo } from '../types/product';

export const POPULAR_SEARCH_KEYWORDS = [
  'Ghost Chili',
  'Truffle Makhana',
  'Hot Honey Chips',
  'Thick Cookies',
  'Salted Caramel',
  'Wasabi Nuts',
  'Build Box'
];

export interface SearchResultGroup {
  products: Product[];
  categories: CategoryInfo[];
  totalMatches: number;
}

export const searchService = {
  search: (query: string): SearchResultGroup => {
    const q = query.toLowerCase().trim();

    if (!q) {
      return { products: [], categories: [], totalMatches: 0 };
    }

    const matchedProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedCategories = CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      categories: matchedCategories,
      totalMatches: matchedProducts.length + matchedCategories.length
    };
  }
};
