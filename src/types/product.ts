export type CategorySlug = 'makhana' | 'chips' | 'popcorn' | 'cookies' | 'trail-mix';

export interface CategoryInfo {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  bgAccent: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar?: string;
  sodium?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  discount?: number; // percentage
  rating: number;
  reviewCount: number;
  images: string[];
  weight: string; // e.g. "70g" or "150g"
  ingredients: string[];
  nutrition: NutritionInfo;
  allergens: string[];
  stock: number;
  tags: string[]; // e.g. ["Vegan", "Gluten-Free", "Spicy", "High Protein"]
  bestseller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  flavor: string; // e.g. "Truffle Masala", "Chili Lime"
  badge?: string; // "NEW", "BESTSELLER", "SPICY", "LIMITED", "FAN FAV", "LOW STOCK"
  spicinessLevel?: 0 | 1 | 2 | 3;
}

export interface ProductFilterState {
  category?: CategorySlug | 'all';
  searchQuery?: string;
  priceRange?: [number, number];
  minRating?: number;
  flavor?: string;
  tags?: string[];
  sortBy?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  inStockOnly?: boolean;
}
