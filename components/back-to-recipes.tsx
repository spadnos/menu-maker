import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackToRecipes() {
  return (
    <Link
      href="/recipes"
      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-6"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Recipes
    </Link>
  )
}
