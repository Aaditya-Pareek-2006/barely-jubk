import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { SearchSuggestions } from './SearchSuggestions';
import { SearchResults } from './SearchResults';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { query, setQuery, results } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-black/95 text-paper backdrop-blur-md overflow-y-auto p-4 sm:p-8"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Top Close Bar */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <span className="font-mono text-xs font-bold uppercase text-brand-lime">
                SEARCH THE VAULT
              </span>
              <button
                onClick={onClose}
                className="p-2 bg-brand-dark text-white hover:bg-brand-orange border border-gray-700 transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Input Field */}
            <div className="relative">
              <Search className="w-8 h-8 absolute left-4 top-4 text-brand-lime" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="TYPE A FLAVOR, SPICE, OR CATEGORY..."
                className="w-full bg-brand-dark text-white font-display font-black text-2xl sm:text-4xl pl-16 pr-4 py-4 border-3 border-brand-lime focus:outline-none shadow-brutal-lime uppercase"
              />
            </div>

            {/* Body Content */}
            {query.trim() === '' ? (
              <SearchSuggestions onSelectKeyword={(kw) => setQuery(kw)} />
            ) : (
              <SearchResults results={results} query={query} onItemClick={onClose} />
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
