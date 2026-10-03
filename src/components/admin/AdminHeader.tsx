import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { userService } from '../../services/userService';
import { UserProfile } from '../../types/user';

export const AdminHeader: React.FC<{ title: string }> = ({ title }) => {
  const user = userService.getCurrentUser() || ({ name: 'Admin', email: '', phone: '' } as UserProfile);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <h1 className="font-sans font-bold text-xl text-slate-800 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:border-slate-400 w-60"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-2 right-2" />
        </button>

        {/* Admin User Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">{user.name}</p>
            <span className="text-[10px] font-medium text-slate-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
