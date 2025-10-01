// import { SearchBar } from '@/components/customer/search-bar'
// import { CategoryFilter } from '@/components/customer/category-filter'
// import { EmptyState } from '@/components/customer/empty-state'
// import { MenuItemFull } from '@/lib/supabase/types'
// import { MenuItem } from '@/components/menu-item'
// import { MenuCategory } from '@/components/menu-category'
import { getRecipes } from '@/lib/supabase/recipes'
import RecipeGrid from '@/components/ui/recipes/recipe-grid'
import { AddRecipeButton } from '@/components/ui/recipes/add-recipe-button'
// import { Button } from '@/components/ui/button'

export default async function RecipesPage() {
  const recipes = await getRecipes()
  // const { menuItems, loading: itemsLoading, error: itemsError } = useMenuItems()
  // const { categories, loading: categoriesLoading } = useCategories()
  // const {
  //   searchTerm,
  //   results,
  //   loading: searchLoading,
  //   search,
  //   clear,
  //   isSearching,
  // } = useSearch()
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Recipes
          </h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <p>Found {recipes.length} recipes</p>
          <AddRecipeButton />
        </div>
        {/* Menu Categories */}
        <RecipeGrid recipes={recipes} />
      </div>
    </main>
  )
}
