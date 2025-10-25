import { RecipeType } from '@/types/recipes';
import RecipeCard from './recipe-card';

function RecipeGrid({ recipes }: { recipes: RecipeType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
export default RecipeGrid;
