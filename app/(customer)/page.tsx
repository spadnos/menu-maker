'use client'

import { useState, useMemo } from 'react'
import { useMenuItems, useCategories, useSearch } from '@/lib/hooks'
import { MenuItemCard } from '@/components/customer/menu-item-card'
import { SearchBar } from '@/components/customer/search-bar'
import { CategoryFilter } from '@/components/customer/category-filter'
import { EmptyState } from '@/components/customer/empty-state'

export default function MenuPage() {
  const { menuItems, loading: itemsLoading, error: itemsError } = useMenuItems()
  const { categories, loading: categoriesLoading } = useCategories()
  const {
    searchTerm,
    results,
    loading: searchLoading,
    search,
    clear,
    isSearching,
  } = useSearch()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter menu items by category and search
  const filteredItems = useMemo(() => {
    if (isSearching) {
      return selectedCategory
        ? results.filter((item) => item.category_id === selectedCategory)
        : results
    }

    return selectedCategory
      ? menuItems.filter((item) => item.category_id === selectedCategory)
      : menuItems
  }, [menuItems, results, selectedCategory, isSearching])

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = new Map<string, typeof filteredItems>()

    filteredItems.forEach((item) => {
      const categoryName = item.category?.name || 'Uncategorized'
      if (!groups.has(categoryName)) {
        groups.set(categoryName, [])
      }
      groups.get(categoryName)!.push(item)
    })

    // Sort by category display_order
    return Array.from(groups.entries()).sort((a, b) => {
      const catA = categories.find((c) => c.name === a[0])
      const catB = categories.find((c) => c.name === b[0])
      return (catA?.display_order || 0) - (catB?.display_order || 0)
    })
  }, [filteredItems, categories])

  const handleClearFilters = () => {
    clear()
    setSelectedCategory(null)
  }

  if (itemsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">
            Failed to load menu items. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Controls */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={searchTerm}
          onChange={search}
          onClear={clear}
          loading={searchLoading}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Loading State */}
      {(itemsLoading || categoriesLoading) && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Empty State */}
      {!itemsLoading && filteredItems.length === 0 && (
        <EmptyState onClear={handleClearFilters} />
      )}

      {/* Menu Items Grouped by Category */}
      {!itemsLoading && filteredItems.length > 0 && (
        <div className="space-y-12">
          {groupedItems.map(([categoryName, items]) => (
            <section key={categoryName}>
              <h2 className="mb-6 text-3xl font-bold">{categoryName}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item as any} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
