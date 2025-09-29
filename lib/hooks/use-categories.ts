'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/lib/supabase/types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true })

        if (fetchError) throw fetchError

        setCategories(data)
        setError(null)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch categories')
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}
