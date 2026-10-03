import React from 'react';
import { BoxBuilder } from '../box-builder/BoxBuilder';
import { Package } from 'lucide-react';

export const BuildYourBoxSection: React.FC = () => {
  return (
    <section className="py-20 bg-paper relative border-b-4 border-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white border-2 border-brand-black font-mono text-xs font-bold uppercase mb-3">
            <Package className="w-4 h-4" />
            CUSTOM SNACK HEIST
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-brand-black">
            BUILD YOUR OWN SNACK BOX.
          </h2>
          <p className="font-mono text-sm text-gray-700 mt-2">
            Mix and match your favorite makhanas, chips, popcorn, and cookies into a single discounted bundle box.
          </p>
        </div>

        <BoxBuilder />

      </div>
    </section>
  );
};
