import React, { useState } from 'react';
import { searchService } from '../services/searchService';
import { ProductGrid } from '../components/products/ProductGrid';
import { PageTransition } from '../components/layout/PageTransition';
import { Search as SearchIcon } from 'lucide-react';
import { POPULAR_SEARCH_KEYWORDS } from '../services/searchService';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const results = searchService.search(query);

  return (
    <PageTransition>
      <div className="py-12 bg-paper min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-10">
            <span className="font-mono font-bold text-xs uppercase bg-brand-lime text-brand-black px-2.5 py-1 border border-brand-black">
              VAULT SEARCH
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-brand-black mt-2">
              FIND YOUR CRUNCH.
            </h1>
          </div>

          <div className="relative max-w-xl mb-8">
            <SearchIcon className="w-6 h-6 absolute left-4 top-3.5 text-brand-black" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH BY FLAVOR, SPICE, OR NAME..."
              className="w-full pl-14 pr-4 py-3 bg-white border-3 border-brand-black font-display font-bold text-lg uppercase focus:outline-none focus:border-brand-lime shadow-brutal"
            />
          </div>

          {query.trim() === '' ? (
            <div className="space-y-4 font-mono text-xs">
              <span className="font-bold text-gray-500 uppercase block">POPULAR SEARCH KEYWORDS:</span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCH_KEYWORDS.map(kw => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-3 py-1.5 bg-white border border-brand-black hover:bg-brand-lime font-bold uppercase transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-mono font-bold text-sm uppercase text-brand-black">
                MATCHED ({results.products.length} SNACKS) FOR "{query}"
              </h3>
              <ProductGrid products={results.products} />
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};
