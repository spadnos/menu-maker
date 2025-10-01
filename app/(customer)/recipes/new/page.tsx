import { RecipeForm } from '@/components/recipe-form'

export default function NewRecipePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-3">
            Create a Recipe
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your culinary creations with detailed ingredients and
            step-by-step instructions
          </p>
        </div>
        <RecipeForm />
      </div>
    </div>
  )
}
