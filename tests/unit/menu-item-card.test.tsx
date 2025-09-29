import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MenuItemCard } from '@/components/customer/menu-item-card'
import type { MenuItemFull } from '@/lib/supabase/types'

describe('MenuItemCard', () => {
  const mockMenuItem: MenuItemFull = {
    id: '123',
    name: 'Test Dish',
    description: 'A delicious test dish',
    category_id: 'cat-1',
    image_url: 'https://example.com/image.jpg',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    category: {
      id: 'cat-1',
      name: 'Test Category',
      display_order: 0,
      created_at: '2024-01-01',
    },
    recipe: {
      id: 'recipe-1',
      menu_item_id: '123',
      ingredients: [],
      instructions: [],
      prep_time_mins: null,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
  }

  it('T020: Renders with all props', () => {
    render(<MenuItemCard item={mockMenuItem} />)

    expect(screen.getByText('Test Dish')).toBeInTheDocument()
    expect(screen.getByText('A delicious test dish')).toBeInTheDocument()
  })

  it('T020: Shows placeholder when no image', () => {
    const itemWithoutImage = {
      ...mockMenuItem,
      image_url: null,
    }

    render(<MenuItemCard item={itemWithoutImage} />)

    expect(screen.getByText('No image available')).toBeInTheDocument()
  })

  it('T020: Shows recipe link only when recipe exists', () => {
    render(<MenuItemCard item={mockMenuItem} />)

    const recipeLink = screen.getByRole('link', { name: /view recipe/i })
    expect(recipeLink).toBeInTheDocument()
    expect(recipeLink).toHaveAttribute('href', '/recipe/123')
  })

  it('T020: Does not show recipe link when recipe is null', () => {
    const itemWithoutRecipe = {
      ...mockMenuItem,
      recipe: null,
    }

    render(<MenuItemCard item={itemWithoutRecipe} />)

    const recipeLink = screen.queryByRole('link', { name: /view recipe/i })
    expect(recipeLink).not.toBeInTheDocument()
  })

  it('T020: Displays description correctly', () => {
    const longDescription =
      'This is a very long description that should be displayed correctly in the card component without breaking the layout or causing any issues with the UI rendering.'

    const itemWithLongDescription = {
      ...mockMenuItem,
      description: longDescription,
    }

    render(<MenuItemCard item={itemWithLongDescription} />)

    expect(screen.getByText(longDescription)).toBeInTheDocument()
  })
})
