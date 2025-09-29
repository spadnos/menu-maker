'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Category } from '@/lib/supabase/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <Select
      value={selectedCategory || 'all'}
      onValueChange={(value) =>
        onSelectCategory(value === 'all' ? null : value)
      }
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
