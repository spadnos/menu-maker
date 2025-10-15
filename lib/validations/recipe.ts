import { z } from 'zod';

export const ingredientSchema = z.object({
  id: z.string().uuid().optional(),
  recipe_id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'Ingredient name is required')
    .max(100, 'Ingredient name must be 100 characters or less'),
  amount: z.number().positive('Amount must be a positive number'),
  unit: z
    .string()
    .min(1, 'Unit is required')
    .max(20, 'Unit must be 20 characters or less'),
  order: z
    .number()
    .int()
    .nonnegative('Order must be a non-negative integer')
    .default(0),
});

export const instructionSchema = z.object({
  id: z.string().uuid().optional(),
  recipe_id: z.string().uuid().optional(),
  step: z.string().min(1, 'Instruction cannot be empty'),
  order: z
    .number()
    .int()
    .nonnegative('Order must be a non-negative integer')
    .default(0),
});

export const recipeSchema = z.object({
  id: z.string().uuid().optional(),
  menu_item_id: z.string().uuid('Invalid menu item'),
  ingredients: z
    .array(ingredientSchema)
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(instructionSchema)
    .min(1, 'At least one instruction is required'),
  prep_time: z
    .number()
    .int()
    .nonnegative('Prep time must be a non-negative number')
    .max(1440, 'Prep time must be less than 24 hours (1440 minutes)')
    .default(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type IngredientFormData = z.infer<typeof ingredientSchema>;
export type InstructionFormData = z.infer<typeof instructionSchema>;
export type RecipeFormData = z.infer<typeof recipeSchema>;
