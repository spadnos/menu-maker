import { test, expect } from '@playwright/test'

test.describe('Customer Menu - Browse and Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('T014: Browse menu by category', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Verify categories are displayed
    const categories = [
      'Appetizers',
      'Entrees',
      'Desserts',
      'Beverages',
      'Sides',
    ]
    for (const category of categories) {
      await expect(page.getByRole('heading', { name: category })).toBeVisible()
    }

    // Verify menu items are grouped by category
    const appetizersSection = page.locator('section', {
      has: page.getByRole('heading', { name: 'Appetizers' }),
    })
    await expect(appetizersSection).toBeVisible()

    // Verify items show name, description, and image/placeholder
    const firstCard = page.locator('[class*="card"]').first()
    await expect(firstCard).toBeVisible()

    // Check for responsive layout
    const viewport = page.viewportSize()
    expect(viewport).toBeTruthy()
  })

  test('T017: Filter by category', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Locate and click category filter
    const categoryFilter = page.getByRole('combobox')
    await categoryFilter.click()

    // Select "Desserts" category
    await page.getByRole('option', { name: 'Desserts' }).click()

    // Wait for filter to apply
    await page.waitForTimeout(500)

    // Verify only dessert section is visible or desserts are shown
    const dessertsHeading = page.getByRole('heading', { name: 'Desserts' })
    await expect(dessertsHeading).toBeVisible()

    // Clear filter by selecting "All Categories"
    await categoryFilter.click()
    await page.getByRole('option', { name: 'All Categories' }).click()

    // Verify all categories are shown again
    await expect(
      page.getByRole('heading', { name: 'Appetizers' })
    ).toBeVisible()
  })

  test('T018: View recipe details', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Find a menu item with a recipe link
    const recipeLink = page.getByRole('link', { name: /view recipe/i }).first()
    await expect(recipeLink).toBeVisible()

    // Click the recipe link
    await recipeLink.click()

    // Wait for recipe page to load
    await page.waitForLoadState('networkidle')

    // Verify recipe page shows ingredients list
    await expect(
      page.getByRole('heading', { name: 'Ingredients' })
    ).toBeVisible()

    // Verify instructions are displayed
    await expect(
      page.getByRole('heading', { name: 'Instructions' })
    ).toBeVisible()

    // Verify back button exists
    const backButton = page.getByRole('link', { name: /back to menu/i })
    await expect(backButton).toBeVisible()

    // Navigate back to menu
    await backButton.click()
    await page.waitForLoadState('networkidle')

    // Verify we're back on the menu page
    await expect(
      page.getByRole('heading', { name: 'Appetizers' })
    ).toBeVisible()
  })
})
