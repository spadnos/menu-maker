'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { MenuItemWithCategory } from '@/lib/supabase/types';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState<MenuItemWithCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Debounce search term by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Perform search when debounced term changes
  useEffect(() => {
    if (!debouncedTerm) {
      setResults([]);
      setLoading(false);
      return;
    }

    async function performSearch() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Search by name or description
        const { data, error: searchError } = await supabase
          .from('menu_items')
          .select('*, category:categories(*)')
          .or(
            `name.ilike.%${debouncedTerm}%,description.ilike.%${debouncedTerm}%`
          )
          .limit(50);

        if (searchError) throw searchError;

        setResults(data as MenuItemWithCategory[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Search failed'));
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [debouncedTerm]);

  const search = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const clear = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
    setResults([]);
  }, []);

  return {
    searchTerm,
    results,
    loading,
    error,
    search,
    clear,
    isSearching: searchTerm.length > 0,
  };
}
