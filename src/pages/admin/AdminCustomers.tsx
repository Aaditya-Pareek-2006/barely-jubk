import React,{useEffect,useState} from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { formatCurrency } from '../../utils/formatCurrency';
import { adminService,AdminCustomer } from '../../services/adminService';

export const AdminCustomers: React.FC = () => {
  const [customers,setCustomers]=useState<AdminCustomer[]>([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  useEffect(()=>{adminService.customers().then(setCustomers).catch(e=>setError(e instanceof Error?e.message:'Could not load customers.')).finally(()=>setLoading(false));},[]);
  return <div className="space-y-6 p-6"><AdminHeader title="Customer Directory" />
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs overflow-x-auto">
      {error&&<p role="alert" className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">{error}</p>}
      <table className="w-full text-left font-sans text-xs"><thead className="bg-slate-50 border-b text-slate-500 font-semibold uppercase"><tr><th className="p-3">Customer</th><th className="p-3">Email / Phone</th><th className="p-3">Joined</th><th className="p-3">Orders</th><th className="p-3">Order value</th></tr></thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">{loading&&<tr><td colSpan={5} className="p-6 text-center">Loading customers…</td></tr>}{!loading&&!customers.length&&!error&&<tr><td colSpan={5} className="p-6 text-center">No customer accounts found.</td></tr>}
          {customers.map(c=><tr key={c.id} className="hover:bg-slate-50"><td className="p-3 font-bold text-slate-900">{c.name}</td><td className="p-3">{c.email}<span className="block text-slate-400">{c.phone||'No phone saved'}</span></td><td className="p-3">{new Date(c.joinedAt).toLocaleDateString()}</td><td className="p-3 font-bold">{c.ordersCount}</td><td className="p-3 font-bold">{formatCurrency(c.totalSpent)}</td></tr>)}
        </tbody></table>
    </div>
  </div>;
};
