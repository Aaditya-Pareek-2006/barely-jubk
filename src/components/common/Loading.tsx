import React from 'react';

export const Loading: React.FC<{ text?: string }> = ({ text = 'CRUNCHING DATA...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[250px]">
      <div className="relative w-16 h-16 border-4 border-brand-black bg-brand-lime animate-spin shadow-brutal mb-4 flex items-center justify-center">
        <div className="w-6 h-6 bg-brand-orange" />
      </div>
      <p className="font-mono font-bold text-sm tracking-widest text-brand-black uppercase animate-pulse">
        {text}
      </p>
    </div>
  );
};
