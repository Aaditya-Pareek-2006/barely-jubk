import React from 'react';
import { userService } from '../../services/userService';
import { UserProfile } from '../../types/user';
import { useNavigate } from 'react-router-dom';

export const AdminHeader: React.FC<{ title: string }> = ({ title }) => {
  const user = userService.getCurrentUser() || ({ name: 'Admin', email: '', phone: '' } as UserProfile);
  const navigate=useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <h1 className="font-sans font-bold text-xl text-slate-800 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <button onClick={()=>{userService.logoutUser();navigate('/login',{state:{from:'/admin'}});}} className="text-xs font-semibold text-slate-600 hover:text-slate-950 underline">Sign out</button>
        {/* Admin User Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white grid place-items-center text-xs font-bold" aria-label={user.name}>{user.name.slice(0,1).toUpperCase()}</div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">{user.name}</p>
            <span className="text-[10px] font-medium text-slate-500">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};
