import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import logoImg from '../../assets/branding/barely-junk-logo.png';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-paper-texture pt-8 pb-20 md:py-24 border-b-4 border-brand-black">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Floating Streetwear Stickers */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-6 md:left-20 z-10 hidden sm:block"
      >
        <span className="px-3 py-1.5 bg-brand-lime text-brand-black border-2 border-brand-black font-mono font-bold text-xs shadow-brutal-sm uppercase">
          🔥 100% UNFORGIVING FLAVOR
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 right-6 md:right-24 z-10 hidden md:block"
      >
        <span className="px-3 py-1.5 bg-brand-orange text-white border-2 border-brand-black font-mono font-bold text-xs shadow-brutal-sm uppercase">
          ⚡ NO CORPORATE BS
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Oversized Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-black text-brand-lime border-2 border-brand-black font-mono text-xs font-bold uppercase tracking-widest">
              <Zap className="w-4 h-4 fill-brand-lime" />
              ESTABLISHED 2026 • STREETWEAR SNACK CULTURE
            </div>

            <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.85] uppercase text-brand-black">
              BARELY <br />
              <span className="bg-brand-lime px-2 py-1 border-3 border-brand-black inline-block shadow-brutal my-1">
                JUNK.
              </span>
            </h1>

            <p className="font-mono text-lg sm:text-xl text-brand-black font-bold uppercase tracking-wide max-w-xl">
              CERTIFIED TRASH. <span className="text-brand-orange">ACTUALLY DELICIOUS.</span>
            </p>

            <p className="font-sans text-base text-gray-700 max-w-lg leading-relaxed">
              We took high-grade foxnuts, kettle-cooked chips, and giant mushroom popcorn, then doused them in ungodly levels of ghost chili, black truffle, and hot honey.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/shop">
                <Button variant="accent" size="xl" className="shadow-brutal-lg">
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

            {/* Micro Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t-2 border-brand-black/20 font-mono text-xs">
              <div>
                <span className="font-bold text-lg text-brand-black block">25+</span>
                <span className="text-gray-600">CRAZY FLAVORS</span>
              </div>
              <div>
                <span className="font-bold text-lg text-brand-black block">4.9★</span>
                <span className="text-gray-600">CRUNCH RATING</span>
              </div>
              <div>
                <span className="font-bold text-lg text-brand-black block">24H</span>
                <span className="text-gray-600">DISPATCH TIME</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Floating Product Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Background Glow Circle */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-brand-lime border-4 border-brand-black shadow-brutal-lg animate-pulse-subtle" />

              {/* Main Product Hero Cutout */}
              <motion.img
                src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop"
                alt="Ghost Chili Makhana Hero"
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 object-cover border-4 border-brand-black shadow-brutal-lg rotate-3 hover:rotate-0 transition-transform duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Overlaid Official Logo Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 z-20 bg-paper p-2 border-3 border-brand-black shadow-brutal"
              >
                <img src={logoImg} alt="Barely Junk Logo" className="h-14 w-auto object-contain" />
              </motion.div>

              {/* Floating Snack Tag Sticker */}
              <div className="absolute -bottom-6 -right-2 z-20 bg-brand-orange text-white p-3 border-3 border-brand-black shadow-brutal font-mono font-bold text-xs uppercase text-center rotate-[-4deg]">
                <span>🌶️ GHOST CHILI & LIME</span>
                <span className="block text-brand-lime text-sm">₹199 ONLY</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
