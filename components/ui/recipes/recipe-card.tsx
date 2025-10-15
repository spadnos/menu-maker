import { RecipeType } from '@/types/database.types';
import Image from 'next/image';

type RecipeCardProps = {
  recipe: RecipeType;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <a className="group block" href={`/recipes/${recipe.id}`}>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          alt={recipe.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          src={recipe.image_url ? recipe.image_url : '/Gemini_Food.png'}
          width={80}
          height={80}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-text-light group-hover:text-primary dark:text-text-dark dark:group-hover:text-primary">
          {recipe.name}
        </h3>
        <p className="mt-1 text-sm text-subtle-light dark:text-subtle-dark">
          {recipe.prep_time_mins > 0 && `${recipe.prep_time_mins} minutes`}
        </p>
      </div>
    </a>
  );
}
export default RecipeCard;
