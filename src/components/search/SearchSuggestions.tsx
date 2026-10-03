import React from 'react';
import { POPULAR_SEARCH_KEYWORDS } from '../../services/searchService';
import { TrendingUp } from 'lucide-react';

interface SearchSuggestionsProps {
  onSelectKeyword: (kw: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onSelectKeyword }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-brand-lime">
        <TrendingUp className="w-4 h-4" />
        POPULAR SEARCHES
      </div>

      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCH_KEYWORDS.map(kw => (
          <button
            key={kw}
            onClick={() => onSelectKeyword(kw)}
            className="px-3 py-1.5 bg-brand-dark text-paper border border-gray-700 hover:border-brand-lime hover:text-brand-lime font-mono text-xs font-bold transition-all"
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
};
