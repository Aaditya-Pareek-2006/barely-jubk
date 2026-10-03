import React from 'react';
import { Flame, ShieldAlert, Award } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black text-paper relative overflow-hidden border-b-4 border-brand-black">
      <div className="absolute inset-0 bg-dark-texture opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Asymmetrical Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3 py-1 bg-brand-lime text-brand-black font-mono font-bold text-xs uppercase border border-brand-black inline-block">
              OUR MANIFESTO
            </span>

            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight leading-none text-white">
              WE MAKE SNACKS. <br />
              <span className="text-brand-lime">NOT BORING SNACKS.</span>
            </h2>

            <div className="space-y-4 font-sans text-base text-gray-300 leading-relaxed max-w-xl">
              <p>
                In 2026, we looked at grocery shelves and saw endless rows of beige, polite, corporate snack bags that tasted like flavored cardboard.
              </p>
              <p className="font-mono text-sm text-brand-lime font-bold border-l-2 border-brand-lime pl-4 py-1">
                "Snacking should feel like a concert encore, not a corporate wellness seminar."
              </p>
              <p>
                So we built Barely Junk. We source premium organic popped makhana, thick kettle-cut russet potatoes, and jumbo butterfly corn—then hit them with ungodly levels of ghost chili, black truffle, and hot honey habanero.
              </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-800 font-mono text-xs">
              <div className="bg-brand-dark p-4 border border-gray-800">
                <Flame className="w-5 h-5 text-brand-orange mb-2" />
                <h4 className="font-bold text-white uppercase">UNFORGIVING HEAT</h4>
                <p className="text-gray-400 mt-1">Real Bhut Jolokia & habanero peppers.</p>
              </div>
              <div className="bg-brand-dark p-4 border border-gray-800">
                <ShieldAlert className="w-5 h-5 text-brand-lime mb-2" />
                <h4 className="font-bold text-white uppercase">ZERO FILLERS</h4>
                <p className="text-gray-400 mt-1">No artificial msg or palm oil junk.</p>
              </div>
              <div className="bg-brand-dark p-4 border border-gray-800">
                <Award className="w-5 h-5 text-brand-orange mb-2" />
                <h4 className="font-bold text-white uppercase">STREET CULTURE</h4>
                <p className="text-gray-400 mt-1">Designed like luxury streetwear.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <img
                src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop"
                alt="Barely Junk Kettle Wafers"
                className="w-full h-80 object-cover border-3 border-brand-lime shadow-brutal-lime -rotate-3"
              />

              <div className="absolute -bottom-8 -left-6 bg-brand-orange text-white p-4 border-3 border-brand-black shadow-brutal font-mono font-bold text-xs uppercase max-w-xs rotate-3">
                <p className="text-brand-lime font-display font-black text-lg">CERTIFIED TRASH™</p>
                <p>Taste the chaos. Order today.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
