'use client'

import { use } from 'react'
import { useRecipe } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Ingredient } from '@/lib/supabase/types'

export default function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { recipe, loading, error } = useRecipe(id)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">
            Recipe not found or failed to load.
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const ingredients = recipe.ingredients as unknown as Ingredient[]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image and Info */}
          <div>
            {recipe.menu_item.image_url ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={recipe.menu_item.image_url}
                  alt={recipe.menu_item.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-muted-foreground">
                  No image available
                </span>
              </div>
            )}

            <div className="mt-6">
              <h1 className="text-4xl font-bold">{recipe.menu_item.name}</h1>
              <p className="mt-2 text-muted-foreground">
                {recipe.menu_item.description}
              </p>
              {recipe.prep_time_mins && (
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Prep time: {recipe.prep_time_mins} minutes
                </div>
              )}
            </div>
          </div>

          {/* Recipe Details */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{ingredient.name}</span>
                      <span className="text-muted-foreground">
                        {ingredient.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span className="flex-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
