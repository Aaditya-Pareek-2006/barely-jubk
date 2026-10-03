import React from 'react';
import { SearchResultGroup } from '../../services/searchService';
import { ProductCard } from '../products/ProductCard';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  results: SearchResultGroup;
  query: string;
  onItemClick: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, query, onItemClick }) => {
  if (results.totalMatches === 0 && query.trim() !== '') {
    return (
      <div className="py-12 text-center font-mono">
        <p className="text-xl font-bold text-brand-orange uppercase mb-2">
          "NOTHING CRUNCHY HERE."
        </p>
        <p className="text-xs text-gray-400">
          No snacks matched "{query}". Try searching for 'Ghost Chili', 'Truffle', or 'Cookies'.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Results */}
      {results.categories.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-bold uppercase text-brand-lime mb-3">
            MATCHED CATEGORIES ({results.categories.length})
          </h4>
          <div className="flex flex-wrap gap-3">
            {results.categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={onItemClick}
                className="px-4 py-2 bg-brand-orange text-white border border-brand-black font-display font-bold text-xs uppercase hover:bg-brand-lime hover:text-brand-black transition-colors"
              >
                {cat.name} ({cat.itemCount})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product Results */}
      {results.products.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-bold uppercase text-brand-lime mb-3">
            MATCHED SNACKS ({results.products.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pr-1">
            {results.products.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
