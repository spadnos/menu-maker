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
  price: z
    .number()
    .positive('Price must be a positive number')
    .max(1000, 'Price must be $1000 or less')
    .refine((val) => Math.round(val * 100) / 100 === val, {
      message: 'Price can have up to 2 decimal places',
    }),
  category_id: z.string().uuid('Invalid category'),
  image_url: z
    .string()
    .url('Invalid image URL')
    .startsWith('https://', 'Image URL must be HTTPS')
    .nullable()
    .optional(),
  is_available: z.boolean().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type MenuItemFormData = z.infer<typeof menuItemSchema>
