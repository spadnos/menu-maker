'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { AddRecipeButton } from '@/components/ui/recipes/add-recipe-button'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Recipes', href: '/' },
    { name: 'Menus', href: '/menus' },
    { name: 'Collections', href: '/collections' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-4 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-light tracking-wider">
              ELEVATED BISTRO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:ml-10 lg:block">
            <div className="flex space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium hover:text-primary transition-colors',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <AddRecipeButton />

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:bg-transparent hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                    pathname === link.href
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <Link
                  href="/reservations"
                  className="w-full rounded-md border border-transparent bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Make a Reservation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
