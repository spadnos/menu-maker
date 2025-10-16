import { getRecipes } from '@/lib/supabase/recipes';
import RecipeGrid from '@/components/ui/recipes/recipe-grid';
import { AddRecipeButton } from '@/components/ui/recipes/add-recipe-button';
import { ImportRecipeButton } from '@/components/ui/recipes/import-recipe-button';
import { SearchBar } from '@/components/customer/search-bar';
import { createClient } from '@/utils/supabase/server';

export default async function RecipesPage() {
  const recipes = await getRecipes();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <main className="min-h-screen bg-background px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Recipes
          </h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <SearchBar />
          {user && (
            <div className="flex gap-2">
              <ImportRecipeButton />
              <AddRecipeButton />
            </div>
          )}
        </div>
        <p>Found {recipes.length} recipes</p>
        {/* Menu Categories */}
        <RecipeGrid recipes={recipes} />
      </div>
    </main>
  );
}
