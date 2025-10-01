'use client'

// import { useState, useMemo } from 'react'
// import { useMenuItems, useCategories, useSearch } from '@/lib/hooks'
// import { SearchBar } from '@/components/customer/search-bar'
// import { CategoryFilter } from '@/components/customer/category-filter'
// import { EmptyState } from '@/components/customer/empty-state'
// import { MenuItemFull } from '@/lib/supabase/types'
// import { MenuItem } from '@/components/menu-item'
// import { MenuCategory } from '@/components/menu-category'

export default function MenuPage() {
  //   const { menuItems, loading: itemsLoading, error: itemsError } = useMenuItems()
  //   const { categories, loading: categoriesLoading } = useCategories()
  //   const {
  //     searchTerm,
  //     results,
  //     loading: searchLoading,
  //     search,
  //     clear,
  //     isSearching,
  //   } = useSearch()
  //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  //   // Filter menu items by category and search
  //   const filteredItems = useMemo(() => {
  //     if (isSearching) {
  //       return selectedCategory
  //         ? results.filter((item) => item.category_id === selectedCategory)
  //         : results
  //     }

  //     return selectedCategory
  //       ? menuItems.filter((item) => item.category_id === selectedCategory)
  //       : menuItems
  //   }, [menuItems, results, selectedCategory, isSearching])

  //   // Group items by category
  //   const groupedItems = useMemo(() => {
  //     const groups = new Map<string, typeof filteredItems>()

  //     filteredItems.forEach((item) => {
  //       const categoryName = item.category?.name || 'Uncategorized'
  //       if (!groups.has(categoryName)) {
  //         groups.set(categoryName, [])
  //       }
  //       groups.get(categoryName)!.push(item)
  //     })

  //     // Sort by category display_order
  //     return Array.from(groups.entries()).sort((a, b) => {
  //       const catA = categories.find((c) => c.name === a[0])
  //       const catB = categories.find((c) => c.name === b[0])
  //       return (catA?.display_order || 0) - (catB?.display_order || 0)
  //     })
  //   }, [filteredItems, categories])

  //   const handleClearFilters = () => {
  //     clear()
  //     setSelectedCategory(null)
  //   }

  //   if (itemsError) {
  //     return (
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
  //           <p className="text-destructive">
  //             Failed to load menu items. Please try again later.
  //           </p>
  //         </div>
  //       </div>
  //     )
  //   }

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Our Menu
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            A curated selection of dishes celebrating the finest ingredients and
            culinary traditions. Experience the art of fine dining.
          </p>
        </header>

        {/* Menu Categories */}
        {/* 
        {groupedItems.map(([categoryName, items]) => (
          <MenuCategory key={categoryName} title={categoryName} items={items} />
        ))} */}
      </div>
    </main>

    // <div className="w-full">
    //   {/* Menu Items Grouped by Category */}
    //   {!itemsLoading && filteredItems.length > 0 && (
    //     <div className="space-y-16">
    //       {groupedItems.map(([categoryName, items]) => (
    //         <MenuCategory
    //           key={categoryName}
    //           title={categoryName}
    //           items={items}
    //         />
    //       ))}
    //     </div>
    //   )}

    //   {/* Loading State */}
    //   {(itemsLoading || categoriesLoading) && (
    //     <div className="flex items-center justify-center py-16">
    //       <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
    //     </div>
    //   )}

    //   {/* Empty State */}
    //   {!itemsLoading && filteredItems.length === 0 && (
    //     <div className="text-center py-16">
    //       <p className="text-gray-500">No menu items found</p>
    //       <button
    //         onClick={handleClearFilters}
    //         className="mt-4 text-sm text-gray-600 hover:text-black underline"
    //       >
    //         Clear all filters
    //       </button>
    //     </div>
    //   )}
    // </div>
  )
}
