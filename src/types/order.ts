import { CartItem } from './cart';

export type OrderStatus = 'ORDER PLACED' | 'PACKED' | 'SHIPPED' | 'OUT FOR DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface OrderTimeline {
  status: OrderStatus;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery' | 'Mock UPI (Test)';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
  trackingNumber: string;
  timeline: OrderTimeline[];
}
