import { z } from 'zod'

export const menuItemSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be 200 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must be 2000 characters or less'),
  category_id: z.string().uuid('Invalid category'),
  image_url: z.string().url('Invalid image URL').nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type MenuItemFormData = z.infer<typeof menuItemSchema>
