import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import { PageTransition } from '../components/layout/PageTransition';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

export const Orders: React.FC = () => {
  const [orders,setOrders]=useState<Awaited<ReturnType<typeof orderService.getOrders>>>([]);
  const [error,setError]=useState('');
  useEffect(()=>{void orderService.getOrders().then(setOrders).catch(e=>setError(e.message));},[]);

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b-4 border-brand-black pb-4 mb-8">
            <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
              SNACK DISPATCH HISTORY
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-brand-black mt-1">
              MY ORDERS ({orders.length})
            </h1>
          </div>

          <div className="space-y-6">
            {error&&<p role="alert" className="text-red-700 font-bold">{error}</p>}
            {orders.map(ord => (
              <div key={ord.id} className="bg-white border-3 border-brand-black p-6 shadow-brutal space-y-4 font-mono text-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-brand-black pb-3">
                  <div>
                    <span className="font-bold text-sm text-brand-black block">ORDER {ord.id}</span>
                    <span className="text-gray-500">PLACED ON {new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>

                  <span className={`px-3 py-1 font-bold border border-brand-black uppercase ${
                    ord.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-brand-lime text-brand-black'
                  }`}>
                    STATUS: {ord.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-paper-dark p-2 border border-brand-black">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-cover border border-brand-black" />
                        <div>
                          <p className="font-bold text-brand-black uppercase">{item.product.name}</p>
                          <span className="text-[10px] text-gray-500">QTY: {item.quantity} • {item.selectedWeight || item.product.weight}</span>
                        </div>
                      </div>
                      <span className="font-bold">{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="font-bold text-sm">
                    TOTAL PAID: <span className="font-display text-lg text-brand-black">{formatCurrency(ord.total)}</span>
                  </div>

                  <Link to={`/orders/${ord.id}`}>
                    <button className="px-4 py-2 bg-brand-black text-white hover:bg-brand-orange font-display font-bold text-xs uppercase tracking-wider border-2 border-brand-black transition-colors flex items-center gap-1.5">
                      <span>VIEW ORDER DETAILS & TRACKING</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
