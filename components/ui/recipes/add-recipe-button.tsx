'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RecipeForm } from '@/components/recipe-form';
import { createRecipe } from '@/lib/supabase/recipes';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { RecipeCreateType } from '@/types/database.types'
import { RecipeCreateType } from '@/types/recipes';

export function AddRecipeButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent, recipe: RecipeCreateType) => {
    e.preventDefault();
    const cleanedRecipe = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image_url: recipe.image_url,
      prep_time_mins: recipe.prep_time_mins || 0,
      cook_time_mins: recipe.cook_time_mins || 0,
      servings: recipe.servings || 0,
      source_url: recipe.source_url || null,
    };
    await createRecipe(cleanedRecipe);
    // console.log('Recipe submitted:', cleanedRecipe)

    setOpen(false);
    toast.success('Recipe created successfully');
    router.push('/');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
          <span className="">Create new recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        aria-describedby="recipe-form"
      >
        <DialogHeader>
          <DialogTitle className="text-primary">Create New Recipe</DialogTitle>
        </DialogHeader>
        <RecipeForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
