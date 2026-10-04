import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';
import logoImg from '../assets/branding/barely-junk-logo.png';

export const ForgotPassword:React.FC=()=>{
  const [email,setEmail]=useState('');const [message,setMessage]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false);
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setBusy(true);setError('');setMessage('');try{const result=await authService.requestPasswordReset(email);setMessage(result.message);}catch(err){setError(err instanceof Error?err.message:'Could not request a reset link.');}finally{setBusy(false);}};
  return <PageTransition><div className="py-16 bg-paper min-h-screen flex items-center justify-center px-4"><div className="w-full max-w-md bg-white border-4 border-brand-black p-8 shadow-brutal-lg space-y-6"><div className="text-center space-y-3"><img src={logoImg} alt="BARELY JUNK" className="h-16 mx-auto"/><h1 className="font-display font-black text-3xl uppercase">FORGOT PASSWORD?</h1><p className="font-mono text-xs text-gray-600">Enter the email on your account and we’ll send a reset link.</p></div><form onSubmit={submit} className="space-y-4 font-mono text-xs">{error&&<p role="alert" className="text-red-700 font-bold">{error}</p>}{message&&<p role="status" className="text-emerald-800 font-bold">{message}{import.meta.env.DEV&&<span className="block mt-2 font-normal">For local development, check the backend terminal for the reset link.</span>}</p>}<label className="font-bold block">EMAIL ADDRESS<input type="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full p-3 border-2 border-brand-black font-sans text-sm"/></label><Button type="submit" variant="accent" size="lg" isFullWidth disabled={busy}>{busy?'SENDING…':'SEND RESET LINK'}</Button></form><div className="text-center font-mono text-xs"><Link to="/login" className="font-bold text-brand-orange hover:underline">BACK TO LOGIN</Link></div></div></div></PageTransition>;
};
