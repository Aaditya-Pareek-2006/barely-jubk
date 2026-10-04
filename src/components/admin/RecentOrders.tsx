import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';
import { AdminOrder } from '../../services/adminService';

export const RecentOrders: React.FC<{orders:AdminOrder[]}> = ({orders}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Recent Customer Orders</h3>
        <Link to="/admin/orders" className="text-xs font-medium text-slate-600 hover:text-slate-900">
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-slate-900">{order.id}</td>
                <td className="p-3">{order.shippingAddress.fullName}</td>
                <td className="p-3 font-bold">{formatCurrency(order.total)}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
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
