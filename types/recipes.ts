import { z } from 'zod';

// // Database types
// export interface IngredientType {
//   id: string;
//   recipe_id: string;
//   name: string;
//   amount: number;
//   unit: string;
//   order: number;
// }

// export interface InstructionType {
//   id: string;
//   recipe_id: string;
//   step: string;
//   order: number;
// }

// Validation schemas
export const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name cannot be empty'),
  amount: z.number(),
  unit: z.string(),
  order: z.number().int().nonnegative(),
});

export type IngredientType = z.infer<typeof ingredientSchema>;
export type IngredientCreateType = Omit<IngredientType, 'id' | 'recipe_id'>;

// export const instructionSchema = z.object({
//   step: z.string().min(1, 'Instruction cannot be empty'),
//   // order: z.number().int().nonnegative(),
// });

// export type InstructionType = z.infer<typeof instructionSchema>;
// export type InstructionCreateType = Omit<InstructionType, 'id' | 'recipe_id'>;

export interface RecipeType {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  ingredients: IngredientType[];
  instructions: string[];
  prep_time_mins: number;
  cook_time_mins: number;
  servings: number;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export type RecipeCreateType = Omit<
  RecipeType,
  'id' | 'created_at' | 'updated_at' | 'created_by'
> & {
  ingredients: IngredientCreateType[];
};

export const recipeValidationSchema = z.object({
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

export type RecipeValidationType = z.infer<typeof recipeValidationSchema>;
