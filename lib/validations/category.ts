import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be 100 characters or less'),
  display_order: z.number().int().default(0),
  created_at: z.string().optional(),
})

export type CategoryFormData = z.infer<typeof categorySchema>
