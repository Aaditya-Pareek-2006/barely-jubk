import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { CartProvider } from './store/cartStore';
import { WishlistProvider } from './store/wishlistStore';
import { UserProvider } from './store/userStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';
import { AppRoutes } from './routes';
import './styles/globals.css';
import { initializeCatalog } from './services/productService';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [,setCatalogReady]=useState(0);
  useEffect(()=>{void initializeCatalog().finally(()=>setCatalogReady((n)=>n+1));},[]);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-brand-black">
      {!isAdminRoute && (
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />
      )}

      <main className="flex-1">
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && (
        <>
          <CartDrawer />
          <MobileNav
            isOpen={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
