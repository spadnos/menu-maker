'use client';

// import { MenuCategory } from '@/components/menu-category'

// import { useState, useMemo } from 'react'
// import { useMenuItems, useCategories, useSearch } from '@/lib/hooks'
// import { SearchBar } from '@/components/customer/search-bar'
// import { CategoryFilter } from '@/components/customer/category-filter'
// import { EmptyState } from '@/components/customer/empty-state'
// import { MenuItemFull } from '@/lib/supabase/types'
// import { MenuItem } from '@/components/menu-item'
// import { MenuCategory } from '@/components/menu-category'

export default function MenuPage() {
  const collections = [
    {
      name: 'Cocktails',
      display_order: 4,
      description: 'A selection of classic cocktails.',
      items: [
        {
          id: '1',
          display_order: 1,
          name: 'Gin & Tonic',
          description: 'Gin, tonic water, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          name: 'Mojito',
          display_order: 2,
          description: 'White rum, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          id: '5',
          display_order: 3,
          name: 'Margarita',
          description: 'Tequila, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          id: '6',
          display_order: 4,
          name: 'Manhattan',
          description:
            'Bourbon or rye, vermouth, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
        {
          id: '7',
          display_order: 5,
          name: 'Old Fashioned',
          description:
            'Bourbon or rye, simple syrup, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
        {
          id: '8',
          display_order: 6,
          name: 'Whiskey Sour',
          description:
            'Whiskey, lemon, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Appetizers',
      display_order: 1,
      items: [
        {
          id: '2',
          display_order: 1,
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Main Courses',
      display_order: 2,
      items: [
        {
          id: '3',
          name: 'Grilled Salmon',
          description: 'Fresh salmon, herbs, and a side of quinoa.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Desserts',
      display_order: 3,
      items: [
        {
          id: '4',
          display_order: 1,
          name: 'Chocolate Lava Cake',
          description: 'Dark chocolate cake with a molten center.',
          price: '10.00',
        },
      ],
    },
  ];
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
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-black dark:from-primary dark:to-background-light">
            Our Menu
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            A curated selection of dishes celebrating the finest ingredients and
            culinary traditions. Experience the art of fine dining.
          </p>
        </header>

        {collections.map((collection, index) => (
          <section key={index}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
              {collection.name}
            </h2>
            {/* <MenuCategory
              key={index}
              title={collection.name}
              items={collection.items as MenuItemFull[]}
            /> */}
          </section>
        ))}
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
  );
}
