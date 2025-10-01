import RecipeGrid from '@/components/ui/recipes/recipe-grid'
import { RecipeType } from '@/types/database.types'

// interface MenuItemData {
//   name: string
//   description: string
//   price: string
// }

interface MenuCategoryProps {
  title: string
  recipes: RecipeType[]
}

export function MenuCategory({ title, recipes }: MenuCategoryProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center mb-3">
          {title}
        </h2>
        <div className="w-full h-px bg-primary/30 max-w-sm mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        <RecipeGrid recipes={recipes} />
      </div>
    </section>
  )
}
