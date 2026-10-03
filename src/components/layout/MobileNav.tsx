import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer } from '../common/Drawer';
import { ShoppingBag, Heart, Search, User, ShieldCheck, Box } from 'lucide-react';
import logoImg from '../../assets/branding/barely-junk-logo.png';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const location = useLocation();

  const links = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP ALL SNACKS', path: '/shop' },
    { label: 'SNACK FINDER', path: '/snack-finder' },
    { label: 'BUILD YOUR BOX 📦', path: '/build-your-box' },
    { label: 'MY WISHLIST', path: '/wishlist' },
    { label: 'MY ORDERS', path: '/orders' },
    { label: 'MY PROFILE', path: '/profile' },
    { label: 'ADMIN DASHBOARD', path: '/admin', isSpecial: true },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="left" title="MENU">
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-6 py-2">
          {/* Logo Brand Header */}
          <div className="flex justify-center p-4 bg-brand-black border-2 border-brand-black">
            <img src={logoImg} alt="BARELY JUNK" className="h-14 w-auto object-contain" />
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between p-3 bg-white border-2 border-brand-black font-mono text-sm text-gray-500 shadow-brutal-sm"
          >
            <span>Search snacks, flavors...</span>
            <Search className="w-4 h-4 text-brand-black" />
          </button>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {links.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`block px-4 py-3 font-display font-bold text-lg uppercase tracking-wider border-2 transition-all ${
                    link.isSpecial
                      ? 'bg-brand-black text-brand-lime border-brand-black'
                      : isActive
                      ? 'bg-brand-orange text-white border-brand-black shadow-brutal-sm'
                      : 'bg-white text-brand-black border-brand-black hover:bg-brand-lime'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Tagline */}
        <div className="p-4 bg-brand-lime border-2 border-brand-black text-center mt-6">
          <p className="font-mono font-bold text-xs text-brand-black uppercase tracking-widest">
            CERTIFIED TRASH. EST. 2026.
          </p>
        </div>
      </div>
    </Drawer>
  );
};
