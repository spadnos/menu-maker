import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.string().min(1, 'Amount is required'),
})

export const recipeSchema = z.object({
  id: z.string().uuid().optional(),
  menu_item_id: z.string().uuid('Invalid menu item'),
  ingredients: z
    .array(ingredientSchema)
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(z.string().min(1, 'Instruction cannot be empty'))
    .min(1, 'At least one instruction is required'),
  prep_time_mins: z
    .number()
    .int()
    .positive('Prep time must be positive')
    .nullable()
    .optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type IngredientFormData = z.infer<typeof ingredientSchema>
export type RecipeFormData = z.infer<typeof recipeSchema>
