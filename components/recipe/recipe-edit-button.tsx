'use client';

import { RecipeForm } from '@/components/recipe-form';
import type { RecipeType } from '@/types/database.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation'
import { updateRecipe } from '@/lib/supabase/recipes';
// Remove unused imports

function RecipeEditButton({ recipe }: { recipe: RecipeType }) {
  const [open, setOpen] = useState(false);
  // const router = useRouter()

  const handleSubmit = async (
    e: React.FormEvent,
    formData: Omit<
      RecipeType,
      'id' | 'created_at' | 'updated_at' | 'created_by'
    >
  ) => {
    e.preventDefault();

    // Create the recipe data with the existing ID from props
    const recipeData: Partial<RecipeType> = {
      ...formData,
      id: recipe.id, // Use the ID from the original recipe
      created_at: recipe.created_at, // Preserve the original creation date
      updated_at: new Date().toISOString(), // Update the last modified date
      created_by: recipe.created_by, // Preserve the original creator
    };

    try {
      await updateRecipe(recipeData);
      setOpen(false);
      toast.success('Recipe updated successfully');
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast.error('Failed to update recipe');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg">
          <span className="">Edit Recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        aria-describedby="recipe-form"
      >
        <DialogHeader>
          <DialogTitle className="text-primary">Edit Recipe</DialogTitle>
        </DialogHeader>
        <RecipeForm
          onSubmit={handleSubmit}
          recipe={{
            ...recipe,
            // Ensure all required fields are present
            prep_time_mins: recipe.prep_time_mins || 0,
            cook_time_mins: recipe.cook_time_mins || 0,
            servings: recipe.servings || 0,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
export default RecipeEditButton;
