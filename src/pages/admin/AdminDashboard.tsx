import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { SalesChart } from '../../components/admin/SalesChart';
import { RecentOrders } from '../../components/admin/RecentOrders';
import { DollarSign,ShoppingBag,Users,AlertTriangle } from 'lucide-react';
import { adminService,AdminSummary } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatCurrency';

export const AdminDashboard: React.FC = () => {
  const [data,setData]=useState<AdminSummary|null>(null);const [error,setError]=useState('');
  useEffect(()=>{adminService.summary().then(setData).catch(e=>setError(e instanceof Error?e.message:'Could not load dashboard.'));},[]);
  return <div className="space-y-6 p-6"><AdminHeader title="Store Overview" />
    {error&&<p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">{error}</p>}
    {!data&&!error&&<p className="text-sm text-slate-500">Loading store data…</p>}
    {data&&<>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Revenue — last 30 days" value={formatCurrency(data.metrics.revenue)} caption="Paid and cash-on-delivery orders" icon={DollarSign} iconBgColor="bg-emerald-100 text-emerald-800" />
        <StatCard title="Orders — last 30 days" value={String(data.metrics.orderCount)} caption="From PostgreSQL" icon={ShoppingBag} iconBgColor="bg-blue-100 text-blue-800" />
        <StatCard title="Customer accounts" value={String(data.metrics.customerCount)} caption="Registered customer accounts" icon={Users} iconBgColor="bg-purple-100 text-purple-800" />
        <StatCard title="Low stock products" value={String(data.metrics.lowStockCount)} caption="Fewer than 25 units" icon={AlertTriangle} iconBgColor="bg-amber-100 text-amber-800" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"><div className="lg:col-span-7"><SalesChart data={data.revenue} /></div><div className="lg:col-span-5"><RecentOrders orders={data.recentOrders} /></div></div>
      <section className="bg-white p-5 border border-slate-200 rounded-lg"><div className="flex justify-between mb-3"><h2 className="font-semibold">Stock alerts</h2><Link to="/admin/inventory" className="text-sm underline">Manage inventory</Link></div>{data.lowStockProducts.length?data.lowStockProducts.map(p=><div key={p.id} className="flex justify-between py-2 border-t text-sm"><span>{p.name}</span><strong>{p.stock} units</strong></div>):<p className="text-sm text-slate-500">No products below the low-stock threshold.</p>}</section>
    </>}
  </div>;
};
