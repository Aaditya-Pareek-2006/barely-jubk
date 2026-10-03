import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/common/Button';
import logoImg from '../assets/branding/barely-junk-logo.png';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const { login } = useUserStore();
  const navigate = useNavigate();
  const location=useLocation();
  const returnTo=(location.state as {from?:string}|null)?.from||'/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try{await login(email,password);navigate(returnTo,{replace:true});}catch(err){setError(err instanceof Error?err.message:'Unable to sign in.');}
    }
  };

  return (
    <PageTransition>
      <div className="py-16 bg-paper min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border-4 border-brand-black p-8 shadow-brutal-lg space-y-6">
          
          <div className="text-center space-y-3">
            <img src={logoImg} alt="BARELY JUNK" className="h-16 w-auto object-contain mx-auto" />
            <h1 className="font-display font-black text-3xl uppercase text-brand-black">
              JUNKIE LOGIN
            </h1>
            <p className="font-mono text-xs text-gray-600">
              Welcome back. Enter your email to access secret drops & points.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            {error&&<p role="alert" className="text-red-700 font-bold">{error}</p>}
            <div>
              <label className="font-bold block mb-1">EMAIL ADDRESS:</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="junkie@barelyjunk.com"
                className="w-full p-3 border-2 border-brand-black font-sans text-sm focus:outline-none focus:border-brand-lime"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">PASSWORD:</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border-2 border-brand-black font-sans text-sm focus:outline-none focus:border-brand-lime"
              />
            </div>

            <Button type="submit" variant="accent" size="lg" isFullWidth className="mt-2">
              LOG IN TO VAULT
            </Button>
          </form>

          <div className="text-center font-mono text-xs pt-4 border-t border-gray-200">
            <span>DON'T HAVE AN ACCOUNT? </span>
            <Link to="/signup" state={{from:returnTo}} className="font-bold text-brand-orange hover:underline">
              CREATE ACCOUNT
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
