import React,{useEffect,useMemo,useState} from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminUser,adminService } from '../../services/adminService';
import { userService } from '../../services/userService';
import { Search } from 'lucide-react';

export const AdminAccess:React.FC=()=>{
  const [users,setUsers]=useState<AdminUser[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [savingId,setSavingId]=useState<string|null>(null);const [search,setSearch]=useState('');
  const currentUser=userService.getCurrentUser();
  useEffect(()=>{adminService.users().then(setUsers).catch(e=>setError(e instanceof Error?e.message:'Could not load users.')).finally(()=>setLoading(false));},[]);
  const changeRole=async(user:AdminUser,role:'admin'|'customer')=>{
    const action=role==='admin'?'grant administrator access to':'revoke administrator access from';
    if(!window.confirm(`Are you sure you want to ${action} ${user.name} (${user.email})? Administrators can view orders and manage products.`))return;
    setSavingId(user.id);setError('');
    try{const updated=await adminService.setUserRole(user.id,role);setUsers(prev=>prev.map(u=>u.id===updated.id?updated:u));}
    catch(e){setError(e instanceof Error?e.message:'Could not change this user role.');}
    finally{setSavingId(null);}
  };
  const admins=users.filter(u=>u.role==='admin').length;
  const filtered=useMemo(()=>users.filter(u=>`${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())),[users,search]);
  return <div className="space-y-6 p-6"><AdminHeader title="Administrator Access"/>
    <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-950"><strong>Admin accounts can manage products, inventory, and customer orders.</strong> Grant access only to people who should have those permissions. Newly promoted users must sign out and sign back in before admin access works.</div>
    {error&&<p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">{error}</p>}
    <section className="bg-white border border-slate-200 rounded-lg p-5 overflow-x-auto"><div className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"><div><h2 className="font-semibold">Registered accounts ({users.length})</h2><p className="text-xs text-slate-500">Current administrators: {admins}</p></div><label className="relative"><Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find by email or name" className="border rounded py-2 pl-9 pr-3 text-sm w-full sm:w-72"/></label></div>
      <table className="w-full text-left text-xs"><thead className="bg-slate-50 border-b text-slate-500 font-semibold uppercase"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Created</th><th className="p-3">Role</th><th className="p-3">Action</th></tr></thead><tbody className="divide-y text-slate-700">
        {loading&&<tr><td colSpan={5} className="p-6 text-center">Loading accounts…</td></tr>}{!loading&&!users.length&&!error&&<tr><td colSpan={5} className="p-6 text-center">No accounts found.</td></tr>}{!loading&&users.length&&!filtered.length&&<tr><td colSpan={5} className="p-6 text-center">No accounts match that search.</td></tr>}
        {filtered.map(user=><tr key={user.id}><td className="p-3 font-semibold">{user.name}{user.id===currentUser?.id&&<span className="ml-2 text-slate-500">(you)</span>}</td><td className="p-3">{user.email}</td><td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td><td className="p-3"><span className={`rounded px-2 py-1 font-semibold ${user.role==='admin'?'bg-lime-100 text-lime-900':'bg-slate-100 text-slate-700'}`}>{user.role==='admin'?'Administrator':'Customer'}</span></td><td className="p-3">{user.role==='customer'?<button disabled={savingId===user.id} onClick={()=>void changeRole(user,'admin')} className="font-semibold underline disabled:opacity-50">{savingId===user.id?'Saving…':'Make administrator'}</button>:<button disabled={user.id===currentUser?.id||admins<=1||savingId===user.id} title={user.id===currentUser?.id?'You cannot revoke your own access here.':admins<=1?'At least one admin must remain.':''} onClick={()=>void changeRole(user,'customer')} className="font-semibold text-rose-700 underline disabled:opacity-40">{savingId===user.id?'Saving…':user.id===currentUser?.id?'Your account':admins<=1?'Last admin':'Revoke admin'}</button>}</td></tr>)}
      </tbody></table>
    </section>
  </div>;
};
