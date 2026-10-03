import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { userService } from '../../services/userService';
import { UserProfile } from '../../types/user';
import { formatCurrency } from '../../utils/formatCurrency';

export const AdminCustomers: React.FC = () => {
  const user = userService.getCurrentUser() || ({ id: '', name: 'No customer signed in', email: '', phone: '', junkieTier: 'TRASH ROOKIE', junkPoints: 0, joinedDate: '', addresses: [] } as UserProfile);

  const mockCustomers = [
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      ordersCount: 8,
      totalSpent: 4890,
      tier: user.junkieTier,
      status: 'Active',
    },
    {
      id: 'usr-102',
      name: 'Ananya Sharma',
      email: 'ananya@gmail.com',
      phone: '+91 98111 22334',
      ordersCount: 5,
      totalSpent: 3120,
      tier: 'SNACK FIEND',
      status: 'Active',
    },
    {
      id: 'usr-103',
      name: 'Karan Mehta',
      email: 'karan.m@yahoo.com',
      phone: '+91 99000 88776',
      ordersCount: 12,
      totalSpent: 8450,
      tier: 'CERTIFIED TRASH LEGEND',
      status: 'VIP',
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Customer CRM Directory" />

      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Email / Phone</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Total Lifetime Spend</th>
              <th className="p-3">Junkie Tier</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {mockCustomers.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{c.name}</td>
                <td className="p-3">
                  <div>
                    <p>{c.email}</p>
                    <p className="text-slate-400 text-[10px]">{c.phone}</p>
                  </div>
                </td>
                <td className="p-3 font-bold">{c.ordersCount} orders</td>
                <td className="p-3 font-bold text-slate-900">{formatCurrency(c.totalSpent)}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-lime-100 text-slate-900 font-bold rounded text-[10px]">
                    {c.tier}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
