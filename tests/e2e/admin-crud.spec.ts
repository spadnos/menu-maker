import { test, expect } from '@playwright/test'

import { Page } from '@playwright/test'

// Helper function to login as admin
async function loginAsAdmin(page: Page) {
  await page.goto('/admin/login')
  await page.fill('input[name="email"]', 'admin@example.com')
  await page.fill('input[name="password"]', 'admin123')
  await page.click('button[type="submit"]')
  await page.waitForURL('/admin/dashboard')
}

test.describe('Admin CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
  })

  test('should create a new menu item', async ({ page }) => {
    // Navigate to menu items
    await page.click('a[href="/admin/menu-items"]')
    await page.click('button:has-text("Add New Item")')

    // Fill the form
    await page.fill('input[name="name"]', 'Test Burger')
    await page.fill(
      'textarea[name="description"]',
      'Delicious test burger with cheese'
    )
    await page.fill('input[name="price"]', '12.99')
    await page.selectOption('select[name="category"]', { label: 'Entrees' })

    // Upload image
    const filePath = 'public/placeholder.jpg'
    await page.setInputFiles('input[type="file"]', filePath)

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success message and redirect
    await expect(page.getByText('Menu item created successfully')).toBeVisible()
    await expect(page).toHaveURL('/admin/menu-items')

    // Verify item appears in the list
    await expect(page.getByText('Test Burger')).toBeVisible()

    // Verify in customer view
    await page.goto('/')
    await expect(page.getByText('Test Burger')).toBeVisible()
  })

  test('should edit an existing menu item', async ({ page }) => {
    await page.click('a[href="/admin/menu-items"]')

    // Find and click edit on the first item
    const editButton = page.locator('button:has-text("Edit")').first()
    await editButton.click()

    // Update fields
    await page.fill('input[name="name"]', 'Updated Item Name')
    await page.fill('input[name="price"]', '15.99')
    await page.click('button[type="submit"]')

    // Verify update
    await expect(page.getByText('Menu item updated')).toBeVisible()
    await expect(page.getByText('Updated Item Name')).toBeVisible()

    // Verify in customer view
    await page.goto('/')
    await expect(page.getByText('Updated Item Name')).toBeVisible()
  })

  test('should delete a menu item', async ({ page }) => {
    await page.click('a[href="/admin/menu-items"]')

    // Find and click delete on the first item
    const deleteButton = page.locator('button:has-text("Delete")').first()
    await deleteButton.click()

    // Confirm in modal
    await page.click('button:has-text("Confirm")')

    // Verify deletion
    await expect(page.getByText('Menu item deleted')).toBeVisible()
    const itemName = await page.locator('td:first-child').first().textContent()
    await expect(page.getByText(itemName!)).not.toBeVisible()

    // Verify not in customer view
    await page.goto('/')
    await expect(page.getByText(itemName!)).not.toBeVisible()
  })

  test('should create a recipe for a menu item', async ({ page }) => {
    await page.click('a[href="/admin/recipes"]')

    // Select a menu item without a recipe
    await page.selectOption('select[name="menuItem"]', { index: 1 })

    // Add ingredients
    await page.click('button:has-text("Add Ingredient")')
    await page.fill('input[name="ingredients.0.name"]', 'Test Ingredient')
    await page.fill('input[name="ingredients.0.amount"]', '100')
    await page.selectOption('select[name="ingredients.0.unit"]', { label: 'g' })

    // Add instructions
    await page.click('button:has-text("Add Step")')
    await page.fill(
      'textarea[name="instructions.0.step"]',
      'Test instruction step'
    )

    // Set prep time
    await page.fill('input[name="prepTime"]', '30')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page.getByText('Recipe saved successfully')).toBeVisible()

    // Verify in customer view
    const menuItemName = await page
      .locator('select[name="menuItem"] > option:checked')
      .textContent()
    await page.goto('/')
    await page.getByText(menuItemName!).first().click()
    await expect(page.getByText('View Recipe')).toBeVisible()
  })

  test('should manage categories', async ({ page }) => {
    await page.click('a[href="/admin/categories"]')

    // Create new category
    await page.fill('input[name="newCategory"]', 'Test Category')
    await page.click('button:has-text("Add Category")')
    await expect(page.getByText('Category added')).toBeVisible()

    // Reorder categories (move new category up)
    const moveUpButton = page.locator('button:has-text("Move Up")').last()
    await moveUpButton.click()

    // Verify order is saved
    await expect(page.getByText('Category order updated')).toBeVisible()

    // Try to delete category with items (should show error)
    const deleteButtons = page.locator('button:has-text("Delete")')
    await deleteButtons.first().click()
    await expect(
      page.getByText('Cannot delete category with items')
    ).toBeVisible()
  })
})
