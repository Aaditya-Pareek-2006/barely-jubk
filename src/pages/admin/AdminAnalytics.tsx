import React,{useEffect,useState} from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { SalesChart } from '../../components/admin/SalesChart';
import { StatCard } from '../../components/admin/StatCard';
import { ShoppingBag,Users,DollarSign } from 'lucide-react';
import { adminService,AdminSummary } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatCurrency';

export const AdminAnalytics: React.FC = () => {
  const [data,setData]=useState<AdminSummary|null>(null);const [error,setError]=useState('');
  useEffect(()=>{adminService.summary().then(setData).catch(e=>setError(e instanceof Error?e.message:'Could not load analytics.'));},[]);
  return <div className="space-y-6 p-6"><AdminHeader title="Sales Analytics" />{error&&<p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">{error}</p>}{!data&&!error&&<p className="text-sm text-slate-500">Loading analytics…</p>}{data&&<><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><StatCard title="Revenue — last 30 days" value={formatCurrency(data.metrics.revenue)} caption="Paid and cash-on-delivery orders" icon={DollarSign}/><StatCard title="Orders — last 30 days" value={String(data.metrics.orderCount)} caption="From PostgreSQL" icon={ShoppingBag}/><StatCard title="Customer accounts" value={String(data.metrics.customerCount)} caption="Registered accounts" icon={Users}/></div><SalesChart data={data.revenue}/><p className="text-xs text-slate-500">Metrics are calculated from stored orders. Revenue includes orders marked paid and cash-on-delivery orders; pending and failed online payments are excluded.</p></>}</div>;
};
