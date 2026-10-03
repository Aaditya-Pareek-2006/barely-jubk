import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/layout/PageTransition';
import { ShieldCheck, CheckCircle2, Truck, CreditCard, MapPin, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types/order';
import { getAccessToken, setAccessToken } from '../services/api';

export const Checkout: React.FC = () => {
  const { cartItems, cartSummary, clearCart } = useCart();
  const navigate=useNavigate();
  const currentUser = userService.getCurrentUser();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [address, setAddress] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    street: '42 Cyberpunk Enclave, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    landmark: 'Near Neon Tower',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery'>('UPI');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [checkoutError,setCheckoutError]=useState('');
  const deliveryFee=deliveryMethod==='express'&&cartSummary.appliedCoupon?.code!=='FREESHIP'?49:0;
  const taxAmount=Math.round((cartSummary.subtotal-cartSummary.discount)*0.05);
  const checkoutTotal=Math.max(0,cartSummary.subtotal-cartSummary.discount+deliveryFee+taxAmount);

  useEffect(()=>{if(!getAccessToken())navigate('/login',{replace:true,state:{from:'/checkout'}});},[navigate]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const finishOrder=(order:Order)=>{setConfirmedOrder(order);clearCart();setStep(5);confetti({particleCount:150,spread:80,origin:{y:.5}});};
  const handleConfirmOrder = async () => {
    setCheckoutError('');
    try{
      const result=await orderService.createOrder(cartItems,address,paymentMethod,deliveryMethod,cartSummary.appliedCoupon?.code);
      if(!result.payment){finishOrder(result.order);return;}
      const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.async=true;
      script.onerror=()=>setCheckoutError('Could not load the secure payment window. Please try again.');
      script.onload=()=>{
        const RazorpayCtor=(window as any).Razorpay;
        if(!RazorpayCtor){setCheckoutError('Secure payment is unavailable. Please try again.');return;}
        const checkout=new RazorpayCtor({key:result.payment!.keyId,amount:result.payment!.amount,currency:result.payment!.currency,name:'Barely Junk',description:'Snack order',order_id:result.payment!.orderId,prefill:{name:address.fullName,email:address.email,contact:address.phone},handler:async(response:any)=>{
          try{const verified=await orderService.verifyPayment(result.order.id,response);finishOrder(verified.order);}catch(err){setCheckoutError(err instanceof Error?err.message:'Payment confirmation failed. Contact support with your order ID.');}
        },modal:{ondismiss:()=>setCheckoutError('Payment was not completed. Your order is still pending.')},theme:{color:'#f97316'}});
        checkout.open();
      };
      document.body.appendChild(script);
    }catch(err){
      const message=err instanceof Error?err.message:'Could not place your order. Please try again.';
      if(/authentication required|session expired/i.test(message)){setAccessToken(null);navigate('/login',{replace:true,state:{from:'/checkout'}});return;}
      setCheckoutError(message);
    }
  };

  if(!getAccessToken())return <PageTransition><div className="py-20 text-center font-mono">REDIRECTING TO SECURE SIGN IN…</div></PageTransition>;

  if (step === 5 && confirmedOrder) {
    return (
      <PageTransition>
        <div className="py-16 bg-paper min-h-screen">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
            <div className="w-20 h-20 bg-brand-lime border-4 border-brand-black shadow-brutal mx-auto flex items-center justify-center text-brand-black">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="font-mono font-bold text-xs uppercase bg-brand-orange text-white px-3 py-1 border border-brand-black inline-block">
              CERTIFIED TRASH DISPATCHED
            </span>

            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-brand-black">
              ORDER CONFIRMED!
            </h1>

            <p className="font-mono text-sm font-bold text-gray-700">
              ORDER ID: <span className="text-brand-orange">{confirmedOrder.id}</span>
            </p>

            <div className="bg-white border-3 border-brand-black p-6 shadow-brutal text-left space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b-2 border-brand-black pb-3">
                <span className="font-bold uppercase">ESTIMATED DELIVERY</span>
                <span className="font-bold text-emerald-600">{confirmedOrder.estimatedDelivery}</span>
              </div>

              <div>
                <span className="font-bold text-gray-500 block mb-2 uppercase">TRACKING TIMELINE:</span>
                <div className="space-y-2">
                  {confirmedOrder.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className={item.completed ? 'font-bold text-brand-black' : 'text-gray-400'}>
                        {item.completed ? '✓' : '○'} {item.status}
                      </span>
                      <span className="text-gray-500">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-500 block mb-1 uppercase">DELIVERY ADDRESS:</span>
                <p className="text-gray-700 font-sans">{address.fullName}, {address.street}, {address.city}, {address.state} - {address.pincode}</p>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-sm">
                <span>TOTAL PAID ({confirmedOrder.paymentMethod})</span>
                <span className="font-display text-lg text-brand-black">{formatCurrency(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href={`/orders/${confirmedOrder.id}`}>
                <Button variant="accent" size="lg">
                  TRACK YOUR ORDER
                </Button>
              </a>
              <a href="/shop">
                <Button variant="outline" size="lg">
                  CONTINUE SHOPPING
                </Button>
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="border-b-4 border-brand-black pb-4 mb-8">
            <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
              SAFE & SECURE
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-brand-black mt-1">
              CHECKOUT.
            </h1>
          </div>

          {/* Stepper Header */}
          <div className="grid grid-cols-4 gap-2 mb-8 font-mono text-xs font-bold text-center">
            {['1. ADDRESS', '2. DELIVERY', '3. PAYMENT', '4. REVIEW'].map((stTitle, idx) => (
              <div
                key={idx}
                className={`py-2 border-2 border-brand-black uppercase ${
                  step === idx + 1
                    ? 'bg-brand-lime text-brand-black shadow-brutal-sm'
                    : step > idx + 1
                    ? 'bg-brand-black text-white'
                    : 'bg-white text-gray-400'
                }`}
              >
                {stTitle}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Steps Left Column */}
            <div className="lg:col-span-7 bg-white border-3 border-brand-black p-6 shadow-brutal space-y-6">
              
              {/* Step 1: Address */}
              {step === 1 && (
                <form onSubmit={handleAddressSubmit} className="space-y-4 font-mono text-xs">
                  <h3 className="font-display font-black text-xl uppercase text-brand-black flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                    1. SHIPPING ADDRESS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold block mb-1">FULL NAME:</label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={e => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full p-2.5 border-2 border-brand-black"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">PHONE NUMBER:</label>
                      <input
                        type="text"
                        required
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        className="w-full p-2.5 border-2 border-brand-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">EMAIL ADDRESS:</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={e => setAddress({ ...address, email: e.target.value })}
                      className="w-full p-2.5 border-2 border-brand-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">STREET ADDRESS / HOUSE NO.:</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={e => setAddress({ ...address, street: e.target.value })}
                      className="w-full p-2.5 border-2 border-brand-black"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold block mb-1">CITY:</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-2 border-2 border-brand-black"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">STATE:</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={e => setAddress({ ...address, state: e.target.value })}
                        className="w-full p-2 border-2 border-brand-black"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">PINCODE:</label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-2 border-2 border-brand-black"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="accent" size="lg" isFullWidth className="mt-4">
                    PROCEED TO DELIVERY METHOD
                  </Button>
                </form>
              )}

              {/* Step 2: Delivery Method */}
              {step === 2 && (
                <form onSubmit={handleDeliverySubmit} className="space-y-4 font-mono text-xs">
                  <h3 className="font-display font-black text-xl uppercase text-brand-black flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-lime" />
                    2. SELECT DELIVERY METHOD
                  </h3>

                  <div className="space-y-3">
                    <label
                      onClick={() => setDeliveryMethod('express')}
                      className={`block p-4 border-2 border-brand-black cursor-pointer transition-all ${
                        deliveryMethod === 'express' ? 'bg-brand-lime/20 border-brand-black shadow-brutal-sm font-bold' : 'bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-display font-bold text-sm uppercase">⚡ EXPRESS DISPATCH (1–2 DAYS)</span>
                        <span className="font-bold">₹49</span>
                      </div>
                      <p className="text-gray-600 mt-1 font-sans text-xs">Priority packing & express air courier handling.</p>
                    </label>

                    <label
                      onClick={() => setDeliveryMethod('standard')}
                      className={`block p-4 border-2 border-brand-black cursor-pointer transition-all ${
                        deliveryMethod === 'standard' ? 'bg-brand-lime/20 border-brand-black shadow-brutal-sm font-bold' : 'bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-display font-bold text-sm uppercase">📦 STANDARD GROUND (3–5 DAYS)</span>
                        <span className="text-emerald-600 font-bold">FREE</span>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>BACK</Button>
                    <Button type="submit" variant="accent" className="flex-1">PROCEED TO PAYMENT</Button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4 font-mono text-xs">
                  <h3 className="font-display font-black text-xl uppercase text-brand-black flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-orange" />
                    3. PAYMENT METHOD
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {['UPI', 'Card', 'NetBanking', 'Cash on Delivery'].map((pm) => (
                      <button
                        type="button"
                        key={pm}
                        onClick={() => setPaymentMethod(pm as any)}
                        className={`p-4 border-2 border-brand-black font-display font-bold text-xs uppercase transition-all ${
                          paymentMethod === pm
                            ? 'bg-brand-orange text-white shadow-brutal-sm'
                            : 'bg-white text-gray-700 hover:border-brand-black'
                        }`}
                      >
                        {pm === 'UPI' ? '⚡ UPI / GPAY' : pm === 'Card' ? '💳 CREDIT/DEBIT CARD' : pm}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-paper-dark border border-brand-black text-gray-600 text-xs font-mono">
                    ℹ️ Card, UPI and net banking payments are securely processed by Razorpay.
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>BACK</Button>
                    <Button type="submit" variant="accent" className="flex-1">REVIEW ORDER</Button>
                  </div>
                </form>
              )}

              {/* Step 4: Order Review */}
              {step === 4 && (
                <div className="space-y-4 font-mono text-xs">
                  {checkoutError&&<p role="alert" className="p-3 bg-red-100 border border-red-700 text-red-800 font-bold">{checkoutError}</p>}
                  <h3 className="font-display font-black text-xl uppercase text-brand-black">
                    4. FINAL ORDER REVIEW
                  </h3>

                  <div className="bg-paper-dark p-4 border border-brand-black space-y-2">
                    <p><span className="font-bold">SHIPPING TO:</span> {address.fullName}, {address.street}, {address.city}</p>
                    <p><span className="font-bold">PAYMENT:</span> {paymentMethod}</p>
                    <p><span className="font-bold">DELIVERY:</span> {deliveryMethod==='express'?'EXPRESS (1–2 DAYS)':'STANDARD (3–5 DAYS)'}</p>
                  </div>

                  <Button variant="accent" size="xl" isFullWidth onClick={handleConfirmOrder}>
                    CONFIRM & PLACE ORDER ({formatCurrency(checkoutTotal)})
                  </Button>
                </div>
              )}

            </div>

            {/* Order Summary Right Column */}
            <div className="lg:col-span-5 bg-paper-dark border-3 border-brand-black p-5 shadow-brutal space-y-4 font-mono text-xs">
              <h3 className="font-display font-black text-lg uppercase text-brand-black border-b-2 border-brand-black pb-2">
                ORDER ITEMS ({cartItems.length})
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white p-2 border border-brand-black">
                    <span className="font-bold truncate max-w-[180px]">{item.product.name} (x{item.quantity})</span>
                    <span className="font-bold">{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t-2 border-brand-black space-y-1">
                <div className="flex justify-between"><span>SUBTOTAL</span><span>{formatCurrency(cartSummary.subtotal)}</span></div>
                {cartSummary.discount > 0 && <div className="flex justify-between text-brand-orange"><span>DISCOUNT</span><span>-{formatCurrency(cartSummary.discount)}</span></div>}
                <div className="flex justify-between"><span>{deliveryMethod==='express'?'EXPRESS DELIVERY':'STANDARD DELIVERY'}</span><span>{deliveryFee===0?'FREE':formatCurrency(deliveryFee)}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span>{formatCurrency(taxAmount)}</span></div>
                <div className="flex justify-between font-bold text-sm text-brand-black pt-2 border-t border-gray-300">
                  <span>TOTAL</span>
                  <span className="font-display font-black text-xl text-brand-black">{formatCurrency(checkoutTotal)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
};
