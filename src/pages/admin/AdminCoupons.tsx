import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';

const coupons=[
  {code:'TRASH10',discount:'10% off',details:'Applied by the checkout backend.'},
  {code:'JUNKIE20',discount:'20% off orders of ₹999 or more',details:'Minimum subtotal is enforced by the backend.'},
  {code:'FREESHIP',discount:'Free express delivery',details:'Waives the ₹49 express delivery charge.'},
];
export const AdminCoupons: React.FC = () => <div className="space-y-6 p-6"><AdminHeader title="Checkout Coupons"/><section className="bg-white border border-slate-200 rounded-lg p-5"><p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded p-3 mb-4">These are the coupon rules currently enforced by checkout. Adding or editing coupons from this screen is not available yet; rules are currently configured in backend code.</p><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs"><tr><th className="p-3">Code</th><th className="p-3">Benefit</th><th className="p-3">Checkout rule</th></tr></thead><tbody className="divide-y">{coupons.map(c=><tr key={c.code}><td className="p-3 font-mono font-bold">{c.code}</td><td className="p-3">{c.discount}</td><td className="p-3 text-slate-600">{c.details}</td></tr>)}</tbody></table></div></section></div>;
