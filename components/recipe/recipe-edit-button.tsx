'use client'

import { Button } from '@/components/ui/button'

function RecipeEditButton({ id }: { id: string }) {
  return (
    <Button onClick={() => console.log('Edit Recipe', id)}>Edit Recipe</Button>
  )
}
export default RecipeEditButton
