'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  prep_time: z.coerce.number().min(0, 'Prep time cannot be negative'),
  cook_time: z.coerce.number().min(0, 'Cook time cannot be negative'),
  servings: z.coerce.number().min(1, 'Servings must be at least 1'),
  instructions: z
    .string()
    .min(10, 'Instructions must be at least 10 characters'),
  ingredients: z.string().min(10, 'Ingredients list is required'),
})

type RecipeFormValues = z.infer<typeof formSchema>

export function NewRecipeForm() {
  const supabase = createClient()

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      prep_time: 15,
      cook_time: 30,
      servings: 2,
      instructions: '',
      ingredients: '',
    },
  })

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      const { error } = await supabase.from('recipes').insert([
        {
          ...data,
          ingredients: data.ingredients.split('\n').filter(Boolean),
        },
      ])

      if (error) throw error

      toast.success('Recipe has been added successfully.')

      // Close the dialog and reset form
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      form.reset()
    } catch (error) {
      console.error('Error adding recipe:', error)
      toast.error('Failed to add recipe. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter recipe name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of your recipe..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="prep_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep Time (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cook_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cook Time (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="1 cup flour\n2 eggs\n1/2 cup sugar"
                  className="min-h-[150px] font-mono"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Step by step instructions..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' })
              )
            }
          >
            Cancel
          </Button>
          <Button type="submit">Add Recipe</Button>
        </div>
      </form>
    </Form>
  )
}
