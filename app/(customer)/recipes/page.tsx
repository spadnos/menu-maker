import { AddRecipeButton } from '@/components/add-recipe-button'
import RecipeCard from './recipe-card'
import { createClient } from '@/utils/supabase/client'

async function RecipesPage() {
  const supabase = await createClient()
  const { data, error: fetchError } = await supabase.from('recipes').select('*')

  if (fetchError) {
    console.error('Failed to fetch recipes:', fetchError)
    return null
  }

  const recipes = data

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Recipes
          </h1>
          <AddRecipeButton />
        </header>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  )
}
export default RecipesPage
