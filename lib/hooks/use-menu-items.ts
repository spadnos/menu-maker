'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { MenuItemFull } from '@/lib/supabase/types';

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItemFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from('menu_items')
          .select(
            `
            *,
            category:categories(*),
            recipe:recipes(id)
          `
          )
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setMenuItems(data as MenuItemFull[]);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch menu items')
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
}
