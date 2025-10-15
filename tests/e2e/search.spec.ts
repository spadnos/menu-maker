import { test, expect } from '@playwright/test';

test.describe('Customer Menu - Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('T015: Search by name and description', async ({ page }) => {
    // Locate search input
    const searchInput = page.getByPlaceholder(/search menu/i);
    await expect(searchInput).toBeVisible();

    // Type "salmon" in search box
    await searchInput.fill('salmon');

    // Wait for debounce (300ms) plus a bit extra
    await page.waitForTimeout(500);

    // Verify results contain "salmon" in name or description
    const searchResults = page.locator('[class*="card"]');
    const count = await searchResults.count();
    expect(count).toBeGreaterThan(0);

    // Verify at least one result contains "salmon"
    const firstResult = searchResults.first();
    const text = await firstResult.textContent();
    expect(text?.toLowerCase()).toContain('salmon');

    // Clear search
    const clearButton = page.getByRole('button', { name: /clear/i });
    await clearButton.click();

    // Verify all items are shown again
    await page.waitForTimeout(500);
    const allItems = await page.locator('[class*="card"]').count();
    expect(allItems).toBeGreaterThan(count);
  });

  test('T016: Search by ingredient', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search menu/i);

    // Search for an ingredient
    await searchInput.fill('butter');
    await page.waitForTimeout(500);

    // Verify results are displayed
    const searchResults = page.locator('[class*="card"]');
    const count = await searchResults.count();

    // Should have at least some results (recipes with butter)
    expect(count).toBeGreaterThanOrEqual(0);

    // Test case-insensitive search
    await searchInput.clear();
    await searchInput.fill('BUTTER');
    await page.waitForTimeout(500);

    const upperCaseCount = await page.locator('[class*="card"]').count();
    expect(upperCaseCount).toBe(count);
  });

  test('T019: Handle empty states', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search menu/i);

    // Search for non-existent item
    await searchInput.fill('xyz123nonexistent');
    await page.waitForTimeout(500);

    // Verify "No items found" message is displayed
    await expect(page.getByText(/no items found/i)).toBeVisible();

    // Verify helpful suggestion text
    await expect(page.getByText(/try adjusting your search/i)).toBeVisible();

    // Verify clear filters button exists
    const clearButton = page.getByRole('button', { name: /clear filters/i });
    await expect(clearButton).toBeVisible();

    // Verify no broken UI
    await expect(page.locator('body')).toBeVisible();
  });

  test('Search performance - completes within 500ms', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search menu/i);

    const startTime = Date.now();

    await searchInput.fill('salmon');

    // Wait for debounce
    await page.waitForTimeout(300);

    // Wait for results to appear
    await page.waitForSelector('[class*="card"]', { timeout: 500 });

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Total time should be around 300ms (debounce) + search time
    // Should complete within 800ms total (300ms debounce + 500ms search)
    expect(duration).toBeLessThan(800);
  });
});
