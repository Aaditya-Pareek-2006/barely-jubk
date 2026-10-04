import { apiRequest } from './api';
import { OrderStatus } from '../types/order';
import { Product } from '../types/product';

export interface AdminOrder {
  id:string; status:OrderStatus; paymentStatus:'Paid'|'Pending'|'Failed'; paymentMethod:string; total:number;
  shippingAddress:{fullName:string;email:string}; items:unknown[]; createdAt:string;
}
export interface AdminSummary {
  metrics:{revenue:number;orderCount:number;customerCount:number;lowStockCount:number};
  revenue:{day:string;revenue:number}[]; recentOrders:AdminOrder[]; lowStockProducts:{id:string;name:string;stock:number}[];
}
export interface AdminCustomer {
  id:string;name:string;email:string;phone:string;joinedAt:string;ordersCount:number;totalSpent:number;
}
export interface AdminProductInput {
  slug:string;name:string;category:string;shortDescription:string;description:string;price:number;compareAtPrice:number|null;
  images:string[];weight:string;stock:number;flavor:string;badge:string|null;tags:string[];
}
export interface AdminUser {id:string;name:string;email:string;role:'admin'|'customer';createdAt:string}

export const adminService={
  summary:()=>apiRequest<AdminSummary>('/admin/summary'),
  products:()=>apiRequest<Product[]>('/admin/products'),
  createProduct:(product:AdminProductInput)=>apiRequest<Product>('/admin/products',{method:'POST',body:JSON.stringify(product)}),
  updateProduct:(id:string,product:AdminProductInput)=>apiRequest<Product>(`/admin/products/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(product)}),
  deleteProduct:(id:string)=>apiRequest<void>(`/admin/products/${encodeURIComponent(id)}`,{method:'DELETE'}),
  updateStock:(id:string,stock:number)=>apiRequest<{id:string;stock:number}>(`/admin/products/${encodeURIComponent(id)}/stock`,{method:'PATCH',body:JSON.stringify({stock})}),
  orders:()=>apiRequest<AdminOrder[]>('/admin/orders'),
  updateOrderStatus:(id:string,status:OrderStatus)=>apiRequest<{id:string;status:OrderStatus}>(`/admin/orders/${encodeURIComponent(id)}/status`,{method:'PATCH',body:JSON.stringify({status})}),
  customers:()=>apiRequest<AdminCustomer[]>('/admin/customers'),
  users:()=>apiRequest<AdminUser[]>('/admin/users'),
  setUserRole:(id:string,role:'admin'|'customer')=>apiRequest<AdminUser>(`/admin/users/${encodeURIComponent(id)}/role`,{method:'PATCH',body:JSON.stringify({role})}),
};
