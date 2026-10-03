import React, { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { MOCK_ORDERS } from '../../data/orders';
import { formatCurrency } from '../../utils/formatCurrency';
import { Search, Eye, Filter } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders = filterStatus === 'ALL'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(o => o.status === filterStatus);

  return (
    <div className="space-y-6 p-6">
      <AdminHeader title="Customer Orders Management" />

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-700">Filter by Status:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs bg-slate-100 border border-slate-300 rounded px-2.5 py-1.5 font-medium"
            >
              <option value="ALL">All Orders ({MOCK_ORDERS.length})</option>
              <option value="ORDER PLACED">Order Placed</option>
              <option value="OUT FOR DELIVERY">Out For Delivery</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{order.id}</td>
                  <td className="p-3 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-slate-500">{order.shippingAddress.email}</p>
                    </div>
                  </td>
                  <td className="p-3">{order.items.length} snacks</td>
                  <td className="p-3 font-bold text-slate-900">{formatCurrency(order.total)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => alert(`Order ${order.id} timeline & invoice lookup`)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                    >
                      <Eye className="w-4 h-4" />
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
