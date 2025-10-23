'use server';

import { createClient } from '@/utils/supabase/server';
import type { RecipeCreateType, RecipeType } from '@/types/database.types';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name cannot be empty'),
  amount: z.number(),
  unit: z.string(),
  order: z.number().int().nonnegative(),
});
export type IngredientType = z.infer<typeof ingredientSchema>;

const recipeValidationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  image_url: z.nullable(z.string()).optional(),
  ingredients: z.array(ingredientSchema).refine((val) => val.length > 0, {
    message: 'At least one ingredient is required',
  }),
  instructions: z
    .array(z.string().min(1, 'Instruction cannot be empty'))
    .min(1, 'At least one instruction is required'),
  prep_time_mins: z
    .number()
    .int()
    .nonnegative('Prep time must be a non-negative number')
    .max(1440, 'Prep time must be less than 24 hours (1440 minutes)')
    .default(0),
  source_url: z.nullable(z.string().url()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

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
