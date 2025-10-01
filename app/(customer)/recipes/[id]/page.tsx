import Link from 'next/link'
import Image from 'next/image'
import { BackToRecipes } from '@/components/back-to-recipes'
import { getRecipeById } from '@/lib/supabase/recipes'

interface RecipePageProps {
  params: Promise<{ id: string }>
}

async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = await getRecipeById(id)

  if (!recipe) {
    return (
      <div className="text-center">
        <p>Recipe not found</p>
        <Link href="/recipes">
          <span className="text-primary/80 hover:text-primary">
            Return to recipe catalog
          </span>
        </Link>
      </div>
    )
  }

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-8">
      <div className="max-w-4xl mx-auto">
        <BackToRecipes />
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
            {recipe.name}
          </h2>
        </div>
        <div className="mb-12">
          <Image
            alt={recipe.name}
            width={240}
            height={500}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            src={recipe.image_url || '/Gemini_Food.png'}
            priority
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-1 bg-background-light/50 dark:bg-background-dark/50 p-6 rounded-lg border border-primary/10">
            <h3 className="text-2xl font-bold mb-4 border-b border-primary/20 pb-2 text-black dark:text-white">
              Ingredients
            </h3>
            <ul className="space-y-3 text-base text-black/80 dark:text-white/80">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 border-b border-primary/20 pb-2 text-black dark:text-white">
                Instructions
              </h3>
              <ol className="space-y-4 text-base leading-relaxed text-black/80 dark:text-white/80 list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 border-b border-primary/20 pb-2 text-black dark:text-white">
                Estimated Time
              </h3>
              <div className="flex space-x-8 text-base text-black/80 dark:text-white/80">
                <p>
                  <strong className="font-semibold text-black dark:text-white">
                    Preparation:
                  </strong>{' '}
                  10 minutes
                </p>
                <p>
                  <strong className="font-semibold text-black dark:text-white">
                    Cooking:
                  </strong>{' '}
                  15 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default RecipePage
