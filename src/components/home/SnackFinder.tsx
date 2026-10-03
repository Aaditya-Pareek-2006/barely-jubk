import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { Sparkles, RefreshCw, Compass } from 'lucide-react';
import { Product } from '../../types/product';

export const SnackFinder: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>('Spicy');
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>('Spicy');

  const moods = [
    { id: 'Chill', label: '🍿 CHILL & BINGE', category: 'popcorn' },
    { id: 'Crunchy', label: '🥔 HEAVY CRUNCH', category: 'chips' },
    { id: 'Sweet', label: '🍫 DESSERT CRAVING', category: 'cookies' },
    { id: 'Spicy', label: '🌶️ ILLEGAL INFERNO', tag: 'Spicy' },
    { id: 'Healthy-ish', label: '🌱 GUILT-FREE FUEL', tag: 'High Protein' },
    { id: 'Midnight', label: '🌙 2 AM GAMING', tag: 'High Energy' },
  ];

  const flavors = [
    { id: 'Spicy', label: 'GHOST CHILI & SPICE' },
    { id: 'Sweet', label: 'CHOCOLATE & CARAMEL' },
    { id: 'Salty', label: 'TRUFFLE & SEA SALT' },
    { id: 'Tangy', label: 'PICKLE & LIME' },
    { id: 'Cheesy', label: 'CHEDDAR & CHEESE' },
  ];

  const getRecommendedProducts = (): Product[] => {
    let matches = [...PRODUCTS];

    if (selectedMood) {
      const moodObj = moods.find(m => m.id === selectedMood);
      if (moodObj?.category) {
        matches = matches.filter(p => p.category === moodObj.category);
      } else if (moodObj?.tag) {
        matches = matches.filter(p => p.tags.includes(moodObj.tag!));
      }
    }

    if (selectedFlavor) {
      const q = selectedFlavor.toLowerCase();
      matches = matches.filter(p => 
        p.flavor.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return matches.length > 0 ? matches.slice(0, 3) : PRODUCTS.slice(0, 3);
  };

  const recommendations = getRecommendedProducts();

  return (
    <section className="py-20 bg-brand-black text-paper relative overflow-hidden border-b-4 border-brand-black">
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-lime text-brand-black border-2 border-brand-lime font-mono text-xs font-bold uppercase mb-3">
            <Compass className="w-4 h-4" />
            INTERACTIVE SNACK MATCHMAKER
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
            WHAT KIND OF SNACK ARE YOU?
          </h2>
          <p className="font-mono text-sm text-gray-400 mt-2">
            Select your current vibe and craving. We'll tell you what to devour right now.
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="bg-brand-dark p-6 sm:p-8 border-3 border-brand-lime shadow-brutal-lime max-w-4xl mx-auto mb-12 space-y-6">
          
          {/* Step 1: Select Mood */}
          <div>
            <label className="font-mono font-bold text-xs uppercase text-brand-lime block mb-3">
              STEP 1: SELECT YOUR VIBE / MOOD
            </label>
            <div className="flex flex-wrap gap-2.5">
              {moods.map(mood => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`px-4 py-2.5 font-display font-bold text-xs uppercase tracking-wider border-2 transition-all ${
                    selectedMood === mood.id
                      ? 'bg-brand-lime text-brand-black border-brand-lime shadow-brutal-sm scale-105'
                      : 'bg-black text-white border-gray-700 hover:border-brand-lime'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Flavor Profile */}
          <div>
            <label className="font-mono font-bold text-xs uppercase text-brand-orange block mb-3">
              STEP 2: SELECT FLAVOR CRAVING
            </label>
            <div className="flex flex-wrap gap-2.5">
              {flavors.map(flavor => (
                <button
                  key={flavor.id}
                  onClick={() => setSelectedFlavor(flavor.id)}
                  className={`px-4 py-2.5 font-display font-bold text-xs uppercase tracking-wider border-2 transition-all ${
                    selectedFlavor === flavor.id
                      ? 'bg-brand-orange text-white border-brand-orange shadow-brutal-sm scale-105'
                      : 'bg-black text-white border-gray-700 hover:border-brand-orange'
                  }`}
                >
                  {flavor.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Header & Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-800">
            <h3 className="font-display font-bold text-lg uppercase text-brand-lime flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              MATCHED SNACKS ({recommendations.length})
            </h3>
            <button
              onClick={() => { setSelectedMood('Spicy'); setSelectedFlavor('Spicy'); }}
              className="text-xs font-mono text-gray-400 hover:text-brand-lime flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              RESET SELECTION
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
