import { Product } from './product';

export interface CartItem {
  id: string; // unique item id (e.g., product.id + weight/variant)
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  flatDiscount?: number;
  minSpend?: number;
  description: string;
}

export interface CartSummaryType {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  appliedCoupon?: Coupon | null;
}
