import Link from 'next/link';
import Image from 'next/image';
import { BackToRecipes } from '@/components/back-to-recipes';
import { getRecipeById } from '@/lib/supabase/recipes';
import RecipeDeleteButton from '@/components/recipe/recipe-delete-button';
import RecipeEditButton from '@/components/recipe/recipe-edit-button';
import { createClient } from '@/utils/supabase/server';
import { formatIngredients, formatInstructions } from '@/lib/utils/recipe';
import { IngredientType } from '@/lib/supabase/recipes';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!recipe) {
    return (
      <div className="text-center">
        <p>Recipe not found</p>
        <Link href="/">
          <span className="text-primary/80 hover:text-primary">
            Return to recipe catalog
          </span>
        </Link>
      </div>
    );
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
        <div className="flex items-start">
          <div className="">
            <div className="mr-6">
              <Image
                alt={recipe.name}
                width={240}
                height={240}
                className="w-240 h-auto object-cover rounded-xl shadow-lg"
                src={recipe.image_url || '/Gemini_Food.png'}
                priority
              />
            </div>
          </div>
          <div>
            <p>{recipe.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Ingredients
            </h3>
            <ul className="space-y-3 text text-black/80 dark:text-white/80">
              {recipe.ingredients.map(
                (ingredient: IngredientType, index: number) => (
                  <li key={index}>{formatIngredients([ingredient])}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Directions
            </h3>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex gap-4">
                  <span className="text-2xl font-bold text-red-500 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text leading-relaxed text-black/80 dark:text-white/80 pt-1">
                    {formatInstructions([instruction])}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Estimated Time
          </h3>
          <div className="flex space-x-8 text-base text-black/80 dark:text-white/80">
            <p>
              <strong className="font-semibold text-black dark:text-white">
                Preparation:
              </strong>{' '}
              {recipe.prep_time_mins} minutes
            </p>
            <p>
              <strong className="font-semibold text-black dark:text-white">
                Cooking:
              </strong>{' '}
              {recipe.cook_time_mins} minutes
            </p>
          </div>
        </div>
        {recipe.created_by === user?.id && (
          <div className="flex space-x-4 mt-4">
            <RecipeDeleteButton id={recipe.id} />
            <RecipeEditButton recipe={recipe} />
          </div>
        )}
        {recipe.source_url && (
          <div className="mt-6 p-4 bg-background-light/30 dark:bg-background-dark/30 rounded-lg border border-primary/10">
            <p className="text-sm text-muted-foreground mb-2">
              Original Recipe Source:
            </p>
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {recipe.source_url}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
export default RecipePage;
