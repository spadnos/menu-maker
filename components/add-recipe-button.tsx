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
import { NewRecipeForm } from '@/components/new-recipe-form'

export function AddRecipeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add new recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Recipe</DialogTitle>
        </DialogHeader>
        <NewRecipeForm />
      </DialogContent>
    </Dialog>
  )
}
