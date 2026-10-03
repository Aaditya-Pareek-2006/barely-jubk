import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-4 border-brand-black pb-6">
          <div>
            <span className="font-mono font-bold text-xs uppercase bg-brand-orange text-white px-2 py-1 border border-brand-black">
              EXPLORE OUR VAULT
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-brand-black mt-2">
              FIVE WAYS TO <br />
              <span className="text-stroke-md text-transparent">JUNK UP YOUR DAY.</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-gray-700 max-w-sm mt-4 md:mt-0">
            From light-as-air makhana to heavyweight 150g stuffed cookies. Pick your poison.
          </p>
        </div>

        {/* Asymmetrical Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. MAKHANA - Hero Card (6 cols) */}
          <Link
            to={`/category/${CATEGORIES[0].slug}`}
            className="md:col-span-6 group relative bg-brand-lime border-3 border-brand-black p-6 sm:p-8 shadow-brutal hover:shadow-brutal-lg transition-all overflow-hidden flex flex-col justify-between min-h-[360px]"
          >
            <div className="relative z-10 flex justify-between items-start">
              <span className="px-3 py-1 bg-brand-black text-white font-mono text-xs font-bold uppercase border border-brand-black">
                01 / {CATEGORIES[0].name}
              </span>
              <div className="w-10 h-10 bg-brand-black text-brand-lime border-2 border-brand-black flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 my-4">
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-brand-black group-hover:translate-x-1 transition-transform">
                {CATEGORIES[0].name}
              </h3>
              <p className="font-mono text-xs text-brand-black font-bold mt-2 max-w-sm">
                {CATEGORIES[0].tagline}
              </p>
            </div>

            <img
              src={CATEGORIES[0].image}
              alt={CATEGORIES[0].name}
              className="absolute right-[-20px] bottom-[-20px] w-60 h-60 object-cover border-2 border-brand-black rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 shadow-brutal-sm"
            />
          </Link>

          {/* 2. CHIPS - 6 cols */}
          <Link
            to={`/category/${CATEGORIES[1].slug}`}
            className="md:col-span-6 group relative bg-brand-orange text-white border-3 border-brand-black p-6 sm:p-8 shadow-brutal hover:shadow-brutal-lg transition-all overflow-hidden flex flex-col justify-between min-h-[360px]"
          >
            <div className="relative z-10 flex justify-between items-start">
              <span className="px-3 py-1 bg-brand-black text-brand-lime font-mono text-xs font-bold uppercase border border-brand-black">
                02 / {CATEGORIES[1].name}
              </span>
              <div className="w-10 h-10 bg-brand-black text-white border-2 border-brand-black flex items-center justify-center group-hover:bg-brand-lime group-hover:text-brand-black transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 my-4">
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white group-hover:translate-x-1 transition-transform">
                {CATEGORIES[1].name}
              </h3>
              <p className="font-mono text-xs text-paper font-bold mt-2 max-w-sm">
                {CATEGORIES[1].tagline}
              </p>
            </div>

            <img
              src={CATEGORIES[1].image}
              alt={CATEGORIES[1].name}
              className="absolute right-[-10px] bottom-[-10px] w-60 h-60 object-cover border-2 border-brand-black -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 shadow-brutal-sm"
            />
          </Link>

          {/* 3. POPCORN - 4 cols */}
          <Link
            to={`/category/${CATEGORIES[2].slug}`}
            className="md:col-span-4 group relative bg-brand-black text-paper border-3 border-brand-black p-6 shadow-brutal hover:shadow-brutal-lg transition-all flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 bg-brand-lime text-brand-black font-mono text-xs font-bold">
                03 / POPCORN
              </span>
              <ArrowUpRight className="w-6 h-6 text-brand-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="my-4">
              <h3 className="font-display font-black text-2xl uppercase text-brand-lime">
                {CATEGORIES[2].name}
              </h3>
              <p className="font-mono text-xs text-gray-300 mt-1">
                {CATEGORIES[2].tagline}
              </p>
            </div>

            <img
              src={CATEGORIES[2].image}
              alt={CATEGORIES[2].name}
              className="w-full h-40 object-cover border-2 border-brand-lime shadow-brutal-sm"
            />
          </Link>

          {/* 4. COOKIES - 4 cols */}
          <Link
            to={`/category/${CATEGORIES[3].slug}`}
            className="md:col-span-4 group relative bg-paper-dark border-3 border-brand-black p-6 shadow-brutal hover:shadow-brutal-lg transition-all flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 bg-brand-black text-white font-mono text-xs font-bold">
                04 / COOKIES
              </span>
              <ArrowUpRight className="w-6 h-6 text-brand-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="my-4">
              <h3 className="font-display font-black text-2xl uppercase text-brand-black">
                {CATEGORIES[3].name}
              </h3>
              <p className="font-mono text-xs text-gray-700 mt-1">
                {CATEGORIES[3].tagline}
              </p>
            </div>

            <img
              src={CATEGORIES[3].image}
              alt={CATEGORIES[3].name}
              className="w-full h-40 object-cover border-2 border-brand-black shadow-brutal-sm"
            />
          </Link>

          {/* 5. TRAIL MIX - 4 cols */}
          <Link
            to={`/category/${CATEGORIES[4].slug}`}
            className="md:col-span-4 group relative bg-brand-lime/30 border-3 border-brand-black p-6 shadow-brutal hover:shadow-brutal-lg transition-all flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 bg-brand-orange text-white font-mono text-xs font-bold">
                05 / TRAIL MIX
              </span>
              <ArrowUpRight className="w-6 h-6 text-brand-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <div className="my-4">
              <h3 className="font-display font-black text-2xl uppercase text-brand-black">
                {CATEGORIES[4].name}
              </h3>
              <p className="font-mono text-xs text-gray-800 mt-1">
                {CATEGORIES[4].tagline}
              </p>
            </div>

            <img
              src={CATEGORIES[4].image}
              alt={CATEGORIES[4].name}
              className="w-full h-40 object-cover border-2 border-brand-black shadow-brutal-sm"
            />
          </Link>

        </div>
      </div>
    </section>
  );
};
