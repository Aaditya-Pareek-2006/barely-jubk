import React, { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { VALID_COUPONS } from '../../store/cartStore';
import { Plus, Ticket, Trash2 } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState(VALID_COUPONS);
  const [newCode, setNewCode] = useState('');
  const [newDisc, setNewDisc] = useState(15);
  const [newDesc, setNewDesc] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    setCoupons(prev => [
      ...prev,
      { code: newCode.toUpperCase(), discountPercentage: Number(newDisc), description: newDesc || 'Special Promo Discount' }
    ]);
    setNewCode('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Coupon & Promo Code Management" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 shadow-xs font-sans text-xs space-y-4">
          <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-emerald-600" />
            Create Promo Coupon
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Coupon Code:</label>
              <input
                type="text"
                required
                placeholder="e.g., SUMMER25"
                value={newCode}
                onChange={e => setNewCode(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded font-mono uppercase text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Discount %:</label>
              <input
                type="number"
                min="5"
                max="50"
                value={newDisc}
                onChange={e => setNewDisc(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded font-mono text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Description:</label>
              <input
                type="text"
                placeholder="15% Off Summer Crunch"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-slate-900 text-white font-semibold text-xs rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </form>
        </div>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <h3 className="font-semibold text-sm text-slate-800 mb-4">Active Coupon Codes</h3>
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {coupons.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{c.code}</td>
                  <td className="p-3 font-bold text-emerald-600">
                    {c.discountPercentage ? `${c.discountPercentage}% OFF` : `₹${c.flatDiscount} OFF`}
                  </td>
                  <td className="p-3 text-slate-500">{c.description}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setCoupons(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
