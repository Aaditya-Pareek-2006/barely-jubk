import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import logoImg from '../../assets/branding/barely-junk-logo.png';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenMobileNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { setIsCartOpen, totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'CATEGORIES', path: '/shop?tab=categories' },
    { label: 'SNACK FINDER', path: '/snack-finder' },
    { label: 'BUILD YOUR BOX', path: '/build-your-box', badge: 'POPULAR' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 border-b-2 border-brand-black ${
        isScrolled
          ? 'bg-paper/95 backdrop-blur-md shadow-md py-2.5'
          : 'bg-paper py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT: Official Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="md:hidden p-2 border-2 border-brand-black bg-brand-lime text-brand-black hover:bg-brand-black hover:text-white transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="BARELY JUNK Official Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display text-sm uppercase tracking-wider font-bold transition-all hover:text-brand-orange py-1 ${
                  isActive ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-brand-black'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono bg-brand-lime text-brand-black border border-brand-black font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Action Icons */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 border-2 border-brand-black bg-white hover:bg-brand-lime transition-all shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5"
            aria-label="Search products"
          >
            <Search className="w-5 h-5 text-brand-black" />
          </button>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className="relative p-2 border-2 border-brand-black bg-white hover:bg-brand-lime transition-all shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-brand-black" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border border-brand-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Button */}
          <Link
            to="/profile"
            className="hidden sm:flex p-2 border-2 border-brand-black bg-white hover:bg-brand-lime transition-all shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5"
            aria-label="Account"
          >
            <UserIcon className="w-5 h-5 text-brand-black" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 border-2 border-brand-black bg-brand-lime text-brand-black font-display font-bold text-sm shadow-brutal-sm hover:bg-brand-black hover:text-brand-lime transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline">CART</span>
            {totalItemCount > 0 && (
              <span className="bg-brand-black text-brand-lime px-1.5 py-0.5 text-xs font-mono font-bold border border-brand-lime">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
