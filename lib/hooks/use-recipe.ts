'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RecipeWithMenuItem } from '@/lib/supabase/types'

export function useRecipe(menuItemId: string | null) {
  const [recipe, setRecipe] = useState<RecipeWithMenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!menuItemId) {
      setLoading(false)
      return
    }

    async function fetchRecipe() {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data, error: fetchError } = await supabase
          .from('recipes')
          .select(
            `
            *,
            menu_item:menu_items(*)
          `
          )
          .eq('menu_item_id', menuItemId)
          .single()

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // No recipe found
            setRecipe(null)
            setError(null)
          } else {
            throw fetchError
          }
        } else {
          setRecipe(data as RecipeWithMenuItem)
          setError(null)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch recipe')
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [menuItemId])

  return { recipe, loading, error }
}
