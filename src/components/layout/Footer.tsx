import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Zap, Globe, Share2 } from 'lucide-react';
import logoImg from '../../assets/branding/barely-junk-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-paper border-t-4 border-brand-black mt-20 relative overflow-hidden">
      {/* Top Banner Grid */}
      <div className="border-b-2 border-brand-dark grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-dark bg-brand-dark/50">
        <div className="p-6 flex items-center gap-4">
          <Truck className="w-8 h-8 text-brand-lime flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase">FAST EXPRESS DELIVERY</h4>
            <p className="font-mono text-xs text-gray-400">Dispatch in under 24 hours</p>
          </div>
        </div>
        <div className="p-6 flex items-center gap-4">
          <Zap className="w-8 h-8 text-brand-orange flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase">ZERO BORING BITES</h4>
            <p className="font-mono text-xs text-gray-400">Illegal levels of flavor</p>
          </div>
        </div>
        <div className="p-6 flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-brand-lime flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase">100% QUALITY GUARANTEE</h4>
            <p className="font-mono text-xs text-gray-400">Fresh crunchy batches</p>
          </div>
        </div>
        <div className="p-6 flex items-center gap-4">
          <RefreshCw className="w-8 h-8 text-brand-orange flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase">EASY RE-ORDERING</h4>
            <p className="font-mono text-xs text-gray-400">1-click snack refills</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Info & Logo */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="BARELY JUNK" className="h-16 w-auto object-contain bg-paper p-2 border-2 border-brand-lime" />
            </Link>
            <p className="font-mono text-sm text-gray-300 max-w-sm leading-relaxed">
              CERTIFIED TRASH. EST. 2026. Snacks designed by streetwear culture for people who demand loud crunch, bold spice, and zero compromise.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="p-2.5 bg-brand-dark hover:bg-brand-lime hover:text-brand-black transition-colors border border-gray-700" aria-label="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-brand-dark hover:bg-brand-lime hover:text-brand-black transition-colors border border-gray-700" aria-label="Social">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-brand-lime tracking-wider">SNACKS</h3>
            <ul className="space-y-2.5 font-mono text-sm">
              <li><Link to="/category/makhana" className="hover:text-brand-lime transition-colors">POPPED MAKHANA</Link></li>
              <li><Link to="/category/chips" className="hover:text-brand-lime transition-colors">POTATO WAFERS</Link></li>
              <li><Link to="/category/popcorn" className="hover:text-brand-lime transition-colors">BUTTERFLY POPCORN</Link></li>
              <li><Link to="/category/cookies" className="hover:text-brand-lime transition-colors">THICK COOKIES</Link></li>
              <li><Link to="/category/trail-mix" className="hover:text-brand-lime transition-colors">NUTS & TRAIL MIX</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-brand-lime tracking-wider">EXPLORE</h3>
            <ul className="space-y-2.5 font-mono text-sm">
              <li><Link to="/snack-finder" className="hover:text-brand-lime transition-colors">SNACK FINDER</Link></li>
              <li><Link to="/build-your-box" className="hover:text-brand-lime transition-colors">BUILD YOUR BOX</Link></li>
              <li><Link to="/shop" className="hover:text-brand-lime transition-colors">ALL PRODUCTS</Link></li>
              <li><Link to="/orders" className="hover:text-brand-lime transition-colors">TRACK ORDER</Link></li>
              <li><Link to="/admin" className="text-brand-orange hover:underline font-bold">ADMIN PORTAL 🔒</Link></li>
            </ul>
          </div>

          {/* Newsletter / Junk Club */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-brand-lime tracking-wider">JOIN THE JUNK CLUB</h3>
            <p className="font-mono text-xs text-gray-400">
              Get secret drop links, unreleased flavors & 15% off your first crunch.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Barely Junk VIP Drops!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="YOUR EMAIL..."
                required
                className="w-full px-3 py-2 bg-brand-dark text-white font-mono text-xs border border-gray-700 focus:outline-none focus:border-brand-lime"
              />
              <button
                type="submit"
                className="w-full py-2 bg-brand-orange text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-brand-lime hover:text-brand-black transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-dark flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <p>© 2026 BARELY JUNK INC. ALL RIGHTS RESERVED. CERTIFIED TRASH.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white transition-colors cursor-pointer">NO NUTRITIONAL GUILT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
