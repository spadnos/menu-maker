'use client';

import { RecipeForm } from '@/components/recipe-form';
import { RecipeType } from '@/types/database.types';
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
import { NewRecipeProps } from '@/types/database.types';

function RecipeEditButton({ recipe }: { recipe: RecipeType }) {
  const [open, setOpen] = useState(false);
  // const router = useRouter()

  const handleSubmit = async (e: React.FormEvent, recipe: NewRecipeProps) => {
    e.preventDefault();
    const cleanedRecipe = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients
        .split('\n')
        .filter((ingredient: string) => ingredient !== ''),
      instructions: recipe.instructions
        .split('\n')
        .filter((instruction: string) => instruction !== ''),
      image_url: null,
      prep_time_mins: 0,
      cook_time_mins: 0,
      servings: 0,
    };
    console.log('Recipe submitted:', cleanedRecipe);
    await updateRecipe(cleanedRecipe);

    setOpen(false);
    toast.success('Recipe updated successfully');
    // router.push('/recipes')
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
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>
        <RecipeForm onSubmit={handleSubmit} recipe={recipe} />
      </DialogContent>
    </Dialog>
  );
}
export default RecipeEditButton;
