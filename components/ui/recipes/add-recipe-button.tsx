'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RecipeForm } from '@/components/recipe-form'
import { createRecipe } from '@/lib/supabase/recipes'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { RecipeCreateType } from '@/types/database.types'

type NewRecipeProps = {
  name: string
  description: string
  ingredients: string
  instructions: string
  image_url: string | null
  prep_time_mins: number
  cook_time_mins: number
  servings: number
}

export function AddRecipeButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent, recipe: NewRecipeProps) => {
    e.preventDefault()
    const cleanedRecipe = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients
        .split('\n')
        .filter((ingredient) => ingredient !== ''),
      instructions: recipe.instructions
        .split('\n')
        .filter((instruction) => instruction !== ''),
      image_url: null,
      prep_time_mins: 0,
      cook_time_mins: 0,
      servings: 0,
    }
    await createRecipe(cleanedRecipe)
    // console.log('Recipe submitted:', cleanedRecipe)

    setOpen(false)
    toast.success('Recipe created successfully')
    router.push('/recipes')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
          <span className="">Create new recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        aria-describedby="recipe-form"
      >
        <DialogHeader>
          <DialogTitle>Create New Recipe</DialogTitle>
        </DialogHeader>
        <RecipeForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
