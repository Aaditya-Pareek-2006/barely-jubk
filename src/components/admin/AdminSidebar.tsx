import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Layers, Ticket, BarChart3, ArrowLeft } from 'lucide-react';
import logoImg from '../../assets/branding/barely-junk-logo.png';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Inventory', path: '/admin/inventory', icon: Layers },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between h-screen sticky top-0 border-r border-slate-800">
      <div>
        {/* Admin Header Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Barely Junk" className="h-8 w-auto object-contain bg-slate-800 p-1 rounded" />
            <span className="font-sans font-bold text-xs uppercase text-slate-300 tracking-wider">
              ADMIN HQ
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md font-sans text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-lime-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Customer Store */}
      <div className="p-4 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-sans font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Customer Store</span>
        </Link>
      </div>
    </aside>
  );
};
