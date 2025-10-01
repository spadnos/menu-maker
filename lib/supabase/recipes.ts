'use server'

import { createClient } from '@/utils/supabase/server'
import type { RecipeCreateType, RecipeType } from '@/types/database.types'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export const createRecipe = async (recipe: RecipeCreateType) => {
  const supabase = await createClient()

  const recipeValidationSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().optional(),
    image_url: z.nullable(z.string()).optional(),
    ingredients: z
      .array(z.string().min(1, 'Ingredient cannot be empty'))
      .min(1, 'At least one ingredient is required'),
    instructions: z
      .array(z.string().min(1, 'Instruction cannot be empty'))
      .min(1, 'At least one instruction is required'),
    prep_time_mins: z
      .number()
      .int()
      .nonnegative('Prep time must be a non-negative number')
      .max(1440, 'Prep time must be less than 24 hours (1440 minutes)')
      .default(0),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  })

  // console.log('createRecipe:recipe', recipe)

  const isValidRecipe = recipeValidationSchema.safeParse(recipe)
  if (!isValidRecipe.success) {
    const error = new Error(`Invalid recipe: ${isValidRecipe.error.message}`)
    console.error('Error creating recipe:', error)
    throw error
  }

  try {
    const { data, error } = await supabase.from('recipes').insert(recipe)

    if (error) throw error

    return data?.[0]
  } catch (error) {
    console.error('Error creating recipe:', error)
    throw error
  }
}

export const getRecipes = async () => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('recipes').select('*')

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

export const getRecipeById = async (id: string) => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)

    if (error) throw error

    return data?.[0] as RecipeType
  } catch (error) {
    console.error('Error fetching recipe by ID:', error)
    throw error
  }
}

export const deleteRecipe = async (id: string) => {
  console.log('deleteRecipe:id', id)

  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('recipes').delete().eq('id', id)
    console.log('deleteRecipe:data', data, error)
    if (error) throw error

    revalidatePath('/recipes')
    return data
  } catch (error) {
    console.error('Error deleting recipe:', error)
    throw error
  }
}
