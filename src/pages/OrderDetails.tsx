import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowLeft, CheckCircle2, Clock, Truck, Package } from 'lucide-react';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order,setOrder]=useState<Awaited<ReturnType<typeof orderService.getOrderById>>|null>(null);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{if(id)void orderService.getOrderById(id).then(setOrder).catch(()=>setOrder(null)).finally(()=>setLoaded(true));},[id]);

  if (!order && !loaded) return <div className="py-20 text-center font-mono">LOADING ORDER…</div>;
  if (!order) {
    return (
      <div className="py-20 text-center font-mono">
        <h2 className="text-2xl font-black uppercase text-brand-orange mb-3">
          ORDER NOT FOUND
        </h2>
        <Link to="/orders" className="underline font-bold">Return to Orders History</Link>
      </div>
    );
  }

  const timelineSteps = [
    'ORDER PLACED',
    'PACKED',
    'SHIPPED',
    'OUT FOR DELIVERY',
    'DELIVERED'
  ];

  const currentStatusIndex = timelineSteps.indexOf(order.status);

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/orders"
            className="inline-flex items-center font-mono text-xs font-bold text-gray-600 hover:text-brand-black mb-6 uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            BACK TO ORDERS
          </Link>

          {/* Order Header */}
          <div className="bg-white border-3 border-brand-black p-6 shadow-brutal space-y-6 mb-8 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-brand-black pb-4 gap-2">
              <div>
                <span className="font-mono text-xs text-gray-500 block font-bold">ORDER ID: {order.id}</span>
                <h1 className="font-display font-black text-2xl uppercase text-brand-black">
                  STATUS: {order.status}
                </h1>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block">ESTIMATED DELIVERY</span>
                <span className="font-bold text-emerald-600 text-sm">{order.estimatedDelivery}</span>
              </div>
            </div>

            {/* Tracking Timeline Component */}
            <div>
              <h3 className="font-bold text-brand-black uppercase mb-4">LIVE DISPATCH TIMELINE:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {timelineSteps.map((st, idx) => {
                  const isDone = idx <= currentStatusIndex;
                  return (
                    <div
                      key={st}
                      className={`p-3 border-2 border-brand-black text-center font-mono text-[10px] font-bold uppercase ${
                        isDone
                          ? 'bg-brand-lime text-brand-black shadow-brutal-sm'
                          : 'bg-paper-dark text-gray-400'
                      }`}
                    >
                      <div className="mb-1">{isDone ? '✓' : '○'}</div>
                      <span>{st}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <span className="font-bold text-gray-500 block mb-1">SHIPPING ADDRESS:</span>
                <p className="font-sans font-medium text-slate-800">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-500 block mb-1">PAYMENT DETAILS:</span>
                <p className="font-sans font-medium text-slate-800">
                  METHOD: {order.paymentMethod}<br />
                  STATUS: {order.paymentStatus}<br />
                  TOTAL PAID: {formatCurrency(order.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="bg-white border-3 border-brand-black p-6 shadow-brutal space-y-4 font-mono text-xs">
            <h3 className="font-display font-black text-lg uppercase text-brand-black pb-2 border-b-2 border-brand-black">
              PACKED ITEMS ({order.items.length})
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-paper-dark p-3 border border-brand-black">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover border border-brand-black" />
                    <div>
                      <h4 className="font-bold text-brand-black uppercase text-xs">{item.product.name}</h4>
                      <p className="text-gray-500 text-[10px]">WEIGHT: {item.selectedWeight || item.product.weight} • QTY: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-sm text-brand-black">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
