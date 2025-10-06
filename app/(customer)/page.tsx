'use client';

import { useEffect, useState } from 'react';
import { getRecipes } from '@/lib/supabase/recipes';
import RecipeGrid from '@/components/ui/recipes/recipe-grid';
import { AddRecipeButton } from '@/components/ui/recipes/add-recipe-button';
import { SearchBar } from '@/components/customer/search-bar';
import { useUser } from '@/lib/hooks/get-user';
import type { RecipeType } from '@/types/database.types';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

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
          {user && <AddRecipeButton />}
        </div>
        <p>Found {recipes.length} recipes</p>
        {/* Menu Categories */}
        <RecipeGrid recipes={recipes} />
      </div>
    </main>
  );
}
