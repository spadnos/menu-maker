'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

export function RecipeForm({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent, recipe: NewRecipeProps) => void
}) {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    image_url: null,
    prep_time_mins: 0,
    cook_time_mins: 0,
    servings: 0,
  })

  const handleNameChange = (value: string) => {
    setRecipe((prev) => ({ ...prev, name: value }))
  }

  const handleDescriptionChange = (value: string) => {
    setRecipe((prev) => ({ ...prev, description: value }))
  }

  const handleIngredientsChange = (value: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: value,
    }))
  }

  const handleInstructionsChange = (value: string) => {
    setRecipe((prev) => ({
      ...prev,
      instructions: value,
    }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const cleanedRecipe = {
  //     name: recipe.name,
  //     description: recipe.description,
  //     ingredients: recipe.ingredients
  //       .split('\n')
  //       .filter((ingredient) => ingredient !== ''),
  //     instructions: recipe.instructions
  //       .split('\n')
  //       .filter((instruction) => instruction !== ''),
  //     image_url: null,
  //     prep_time_mins: 0,
  //     cook_time_mins: 0,
  //     servings: 0,
  //   }
  //   await createRecipe(cleanedRecipe)
  //   // console.log('Recipe submitted:', cleanedRecipe)

  //   toast.success('Recipe submitted! Check the console for details.')
  //   router.push('/recipes')
  // }

  return (
    <form onSubmit={(e) => onSubmit(e, recipe)} className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-3xl text-primary">
            Add New Recipe
          </CardTitle>
          <CardDescription>
            Create a new recipe with ingredients and instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipe Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Recipe Name
            </Label>
            <Input
              id="name"
              value={recipe.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Classic Margherita Pizza"
              required
              className="text-base"
            />
          </div>

          {/* Recipe Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={recipe.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Describe your recipe..."
              rows={4}
              className="text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients" className="text-base font-medium">
              Ingredients
            </Label>
            <p className="text-sm text-muted-foreground">
              Enter one ingredient per line
            </p>
            <Textarea
              id="ingredients"
              value={recipe.ingredients}
              onChange={(e) => handleIngredientsChange(e.target.value)}
              placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
              rows={8}
              required
              className="text-base font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-base font-medium">
              Instructions
            </Label>
            <p className="text-sm text-muted-foreground">
              Enter one instruction per line
            </p>
            <Textarea
              id="instructions"
              value={recipe.instructions}
              onChange={(e) => handleInstructionsChange(e.target.value)}
              placeholder="Preheat oven to 350°FM\nMix dry ingredients in a bowl\nAdd wet ingredients and stir until combined\nPour into greased pan and bake for 30 minutes"
              rows={10}
              required
              className="text-base font-mono"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full">
              Save Recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
