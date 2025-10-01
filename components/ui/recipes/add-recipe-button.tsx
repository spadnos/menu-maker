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

export function AddRecipeButton() {
  return (
    <Dialog>
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
        <RecipeForm />
      </DialogContent>
    </Dialog>
  )
}
