import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { PageTransition } from '../components/layout/PageTransition';
import { User, MapPin, Package, Settings, Award, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user) {
    return (
      <div className="py-20 text-center font-mono">
        <h2 className="text-2xl font-black uppercase text-brand-orange mb-3">
          PLEASE LOG IN
        </h2>
        <Link to="/login" className="underline font-bold">Go to Login Page</Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
    alert('Profile details updated!');
  };

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Card */}
          <div className="bg-brand-black text-paper border-4 border-brand-black p-6 sm:p-8 shadow-brutal mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-brand-lime object-cover shadow-brutal-sm"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="bg-brand-lime text-brand-black font-mono text-[10px] font-bold px-2 py-0.5 border border-brand-black uppercase">
                  {user.junkieTier}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
                  {user.name}
                </h1>
                <p className="font-mono text-xs text-gray-400">{user.email} • {user.phone}</p>
                <p className="font-mono text-xs text-brand-orange font-bold">
                  ⚡ JUNK REWARD POINTS: {user.junkPoints} PTS
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b-3 border-brand-black mb-8 font-mono text-xs font-bold uppercase gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 border-t-2 border-x-2 border-brand-black transition-all ${
                activeTab === 'profile' ? 'bg-brand-lime text-brand-black shadow-brutal-sm' : 'bg-white text-gray-600'
              }`}
            >
              PROFILE DETAILS
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2.5 border-t-2 border-x-2 border-brand-black transition-all ${
                activeTab === 'addresses' ? 'bg-brand-lime text-brand-black shadow-brutal-sm' : 'bg-white text-gray-600'
              }`}
            >
              SAVED ADDRESSES ({user.addresses.length})
            </button>
            <Link
              to="/orders"
              className="px-4 py-2.5 border-t-2 border-x-2 border-brand-black bg-white text-gray-600 hover:text-brand-black"
            >
              MY ORDERS
            </Link>
          </div>

          {/* Tab Content */}
          <div className="bg-white border-3 border-brand-black p-6 shadow-brutal font-mono text-xs">
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <h3 className="font-display font-black text-xl uppercase text-brand-black">
                  EDIT PROFILE
                </h3>

                <div>
                  <label className="font-bold block mb-1">FULL NAME:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 border-2 border-brand-black font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">EMAIL (READ ONLY):</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full p-2.5 border-2 border-brand-black bg-gray-100 font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">PHONE NUMBER:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 border-2 border-brand-black font-sans text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-black text-white font-display font-bold text-xs uppercase hover:bg-brand-lime hover:text-brand-black transition-colors border-2 border-brand-black shadow-brutal-sm"
                  >
                    SAVE CHANGES
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="text-red-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    LOG OUT
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-xl uppercase text-brand-black">
                  SAVED DELIVERY ADDRESSES
                </h3>
                {user.addresses.map((addr, idx) => (
                  <div key={idx} className="p-4 bg-paper-dark border-2 border-brand-black space-y-1">
                    <span className="font-bold text-brand-black uppercase block">{addr.fullName}</span>
                    <p className="font-sans text-gray-700">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-gray-500">PHONE: {addr.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
