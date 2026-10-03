import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { Category } from '../pages/Category';
import { ProductDetails } from '../pages/ProductDetails';
import { SearchPage } from '../pages/Search';
import { Wishlist } from '../pages/Wishlist';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { Orders } from '../pages/Orders';
import { OrderDetails } from '../pages/OrderDetails';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { SnackFinderPage } from '../pages/SnackFinder';
import { BuildYourBoxPage } from '../pages/BuildYourBox';

// Admin imports
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminCustomers } from '../pages/admin/AdminCustomers';
import { AdminInventory } from '../pages/admin/AdminInventory';
import { AdminCoupons } from '../pages/admin/AdminCoupons';
import { AdminAnalytics } from '../pages/admin/AdminAnalytics';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Customer Store Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/snack-finder" element={<SnackFinderPage />} />
      <Route path="/build-your-box" element={<BuildYourBoxPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Panel Nested Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="py-24 text-center font-mono bg-paper min-h-screen">
            <h1 className="text-6xl font-black uppercase text-brand-orange mb-2">404</h1>
            <p className="text-xl font-bold uppercase text-brand-black mb-4">
              "OOPS. THIS PAGE GOT JUNKED."
            </p>
            <a href="/" className="px-4 py-2 bg-brand-black text-white font-bold uppercase border-2 border-brand-black">
              Return Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};
