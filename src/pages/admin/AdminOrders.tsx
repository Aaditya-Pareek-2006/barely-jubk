import React,{useEffect,useState} from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { formatCurrency } from '../../utils/formatCurrency';
import { Search,Filter } from 'lucide-react';
import { adminService,AdminOrder } from '../../services/adminService';
import { OrderStatus } from '../../types/order';

const statuses:OrderStatus[]=['ORDER PLACED','PACKED','SHIPPED','OUT FOR DELIVERY','DELIVERED','CANCELLED'];
export const AdminOrders: React.FC = () => {
  const [orders,setOrders]=useState<AdminOrder[]>([]);
  const [filterStatus,setFilterStatus]=useState('ALL');
  const [query,setQuery]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  useEffect(()=>{adminService.orders().then(setOrders).catch(e=>setError(e instanceof Error?e.message:'Could not load orders.')).finally(()=>setLoading(false));},[]);
  const filtered=orders.filter(o=>(filterStatus==='ALL'||o.status===filterStatus)&&`${o.id} ${o.shippingAddress.fullName} ${o.shippingAddress.email}`.toLowerCase().includes(query.toLowerCase()));
  const updateStatus=async(order:AdminOrder,status:OrderStatus)=>{try{await adminService.updateOrderStatus(order.id,status);setOrders(prev=>prev.map(o=>o.id===order.id?{...o,status}:o));setError('');}catch(e){setError(e instanceof Error?e.message:'Could not update order status.');}};
  return <div className="space-y-6 p-6"><AdminHeader title="Customer Orders Management" />
    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
      {error&&<p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">{error}</p>}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2"><Filter className="w-4 h-4 text-slate-500"/><select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="text-xs bg-slate-100 border border-slate-300 rounded px-2.5 py-1.5 font-medium"><option value="ALL">All orders ({orders.length})</option>{statuses.map(s=><option key={s}>{s}</option>)}</select></div>
        <label className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search order or customer" className="pl-9 pr-3 py-2 text-xs border rounded w-full sm:w-64"/></label>
      </div>
      <div className="overflow-x-auto"><table className="w-full text-left font-sans text-xs"><thead className="bg-slate-50 border-b text-slate-500 font-semibold uppercase"><tr><th className="p-3">Order ID / Date</th><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Payment</th><th className="p-3">Payment status</th><th className="p-3">Fulfillment status</th></tr></thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">{loading&&<tr><td colSpan={7} className="p-6 text-center">Loading orders…</td></tr>}{!loading&&!filtered.length&&<tr><td colSpan={7} className="p-6 text-center">No matching orders.</td></tr>}
          {filtered.map(o=><tr key={o.id} className="hover:bg-slate-50"><td className="p-3"><strong className="block text-slate-900">{o.id}</strong><span className="text-slate-500">{new Date(o.createdAt).toLocaleString()}</span></td><td className="p-3"><strong className="block">{o.shippingAddress.fullName}</strong><span className="text-slate-500">{o.shippingAddress.email}</span></td><td className="p-3">{o.items.length} items</td><td className="p-3 font-bold">{formatCurrency(o.total)}</td><td className="p-3">{o.paymentMethod}</td><td className="p-3">{o.paymentStatus}</td><td className="p-3"><select value={o.status} onChange={e=>void updateStatus(o,e.target.value as OrderStatus)} className="border rounded px-2 py-1 bg-white">{statuses.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}
        </tbody></table></div>
    </div>
  </div>;
};
