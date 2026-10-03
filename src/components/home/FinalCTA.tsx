import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowRight, Flame } from 'lucide-react';
import logoImg from '../../assets/branding/barely-junk-logo.png';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-brand-lime text-brand-black relative overflow-hidden border-b-4 border-brand-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Logo Badge Header */}
        <div className="inline-block mb-6 bg-paper p-3 border-3 border-brand-black shadow-brutal rotate-[-2deg]">
          <img src={logoImg} alt="BARELY JUNK" className="h-16 w-auto object-contain mx-auto" />
        </div>

        <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-none text-brand-black mb-6">
          GO AHEAD. <br />
          <span className="bg-brand-black text-brand-lime px-3 py-1 border-3 border-brand-black inline-block shadow-brutal mt-2">
            GET SOME JUNK.
          </span>
        </h2>

        <p className="font-mono text-base sm:text-lg text-brand-black font-bold uppercase max-w-xl mx-auto mb-8">
          Free Express Delivery on orders over ₹499. Dispatch in under 24 hours. Zero boring bites guaranteed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/shop">
            <Button variant="primary" size="xl" className="shadow-brutal-lg">
              SHOP ALL SNACKS
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>

          <Link to="/build-your-box">
            <Button variant="secondary" size="xl" className="shadow-brutal-lg">
              BUILD YOUR BOX 📦
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
