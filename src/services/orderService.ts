import { Order, ShippingAddress } from '../types/order';
import { CartItem } from '../types/cart';
import { apiRequest } from './api';

export interface PaymentIntent { keyId:string;orderId:string;amount:number;currency:string }
export const orderService={
  getOrders:()=>apiRequest<Order[]>('/orders'),
  getOrderById:(id:string)=>apiRequest<Order>(`/orders/${encodeURIComponent(id)}`),
  createOrder:(items:CartItem[],shippingAddress:ShippingAddress,paymentMethod:Order['paymentMethod'],deliveryMethod:'express'|'standard',couponCode?:string)=>apiRequest<{order:Order;payment:PaymentIntent|null}>('/orders',{method:'POST',body:JSON.stringify({items:items.map(i=>({productId:i.product.id,quantity:i.quantity})),shippingAddress,paymentMethod,deliveryMethod,couponCode})}),
  verifyPayment:(orderId:string,response:{razorpay_order_id:string;razorpay_payment_id:string;razorpay_signature:string})=>apiRequest<{order:Order}>(`/orders/${encodeURIComponent(orderId)}/verify-payment`,{method:'POST',body:JSON.stringify(response)}),
  simulateMockPayment:(orderId:string,outcome:'success'|'failure')=>apiRequest<{order:Order}>(`/orders/${encodeURIComponent(orderId)}/mock-payment`,{method:'POST',body:JSON.stringify({outcome})}),
};
