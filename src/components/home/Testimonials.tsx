import React from 'react';
import { MOCK_REVIEWS } from '../../data/reviews';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-paper relative border-b-4 border-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="font-mono font-bold text-xs uppercase bg-brand-black text-brand-lime px-2.5 py-1 border border-brand-black">
              REAL REVIEWS FROM REAL JUNKIES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-brand-black mt-2">
              WHAT THE STREETS SAY.
            </h2>
          </div>
          <p className="font-mono text-sm text-gray-700 max-w-sm mt-4 md:mt-0">
            Over 10,000+ happy mouths and destroyed diet plans across India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="bg-white border-3 border-brand-black p-6 shadow-brutal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-lime opacity-80" />
                </div>

                <h3 className="font-display font-bold text-base uppercase text-brand-black mb-2">
                  "{rev.title}"
                </h3>

                <p className="font-sans text-xs text-gray-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-6 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-brand-black uppercase">{rev.userName}</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  VERIFIED JUNKIE
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
