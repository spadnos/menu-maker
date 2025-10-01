'use client'

import { Button } from '@/components/ui/button'
import { deleteRecipe } from '@/lib/supabase/recipes'
import { useRouter } from 'next/navigation'

function RecipeDeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const handleClick = async () => {
    await deleteRecipe(id)
    router.push('/recipes')
  }

  return <Button onClick={handleClick}>Delete Recipe</Button>
}
export default RecipeDeleteButton
