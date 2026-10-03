import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'CERTIFIED TRASH',
    'SNACK LOUD',
    'ZERO BORING BITES',
    'BARELY JUNK',
    'ILLEGAL FLAVORS',
    'EST. 2026',
    'HIGH CRUNCH NO CAP',
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-brand-black text-brand-lime py-3.5 border-y-4 border-brand-black overflow-hidden select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {repeatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center mx-4">
            <span className="font-display font-black text-lg sm:text-xl uppercase tracking-widest">
              {text}
            </span>
            <span className="ml-8 text-brand-orange text-lg font-mono">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
