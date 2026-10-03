import { useState, useMemo } from 'react';
import { searchService } from '../services/searchService';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    return searchService.search(query);
  }, [query]);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  return {
    query,
    setQuery,
    isOpen,
    openSearch,
    closeSearch,
    results,
  };
};
