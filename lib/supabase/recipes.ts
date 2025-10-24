'use server';

import { createClient } from '@/utils/supabase/server';
import type { RecipeCreateType, RecipeType } from '@/types/recipes';
import { revalidatePath } from 'next/cache';

import { recipeValidationSchema } from '../../types/recipes';

export type { IngredientType } from '../../types/recipes';

export const createRecipe = async (recipe: RecipeCreateType) => {
  // console.log('createRecipe:recipe', recipe);
  // return;
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  // console.log('createRecipe:recipe', recipe)

  const isValidRecipe = recipeValidationSchema.safeParse(recipe);
  if (!isValidRecipe.success) {
    const error = new Error(
      `Invalid recipe: ${isValidRecipe.error?.message || 'Unknown validation error'}`
    );
    console.error('Error creating recipe:', error);
    throw error;
  }

  try {
    const { data, error } = await supabase
      .from('recipes')
      .insert({ ...recipe, created_by: user?.user?.id });

    if (error) throw error;

    revalidatePath('/');
    return data?.[0];
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const getRecipes = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('recipes').select('*');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeById = async (id: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id);

    if (error) throw error;

    return data?.[0] as RecipeType;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error('Error fetching recipe by ID:', error)
    return null;
  }
};

export const deleteRecipe = async (id: string) => {
  // console.log('deleteRecipe:id', id)

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
    // console.log('deleteRecipe:data', data, error)
    if (error) throw error;

    revalidatePath('/');
    return data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

export const updateRecipe = async (recipe: Partial<RecipeType>) => {
  // console.log('updateRecipe:recipe', recipe)

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('recipes')
      .update(recipe)
      .eq('id', recipe.id);
    // console.log('updateRecipe:data', data, error)
    if (error) throw error;

    revalidatePath('/');
    return data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};
