import { test, expect } from '@playwright/test';

test.describe('Admin Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await expect(page).toHaveURL('/admin/login');
    await expect(
      page.getByRole('heading', { name: /admin login/i })
    ).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  test('should log in with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/admin/dashboard');
    await expect(
      page.getByRole('heading', { name: /dashboard/i })
    ).toBeVisible();
  });

  test('should persist session across refreshes', async ({ page }) => {
    // Login first
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Refresh page
    await page.reload();
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('should log out and clear session', async ({ page }) => {
    // Login first
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Logout
    await page.click('button[data-testid="user-menu"]');
    await page.click('button:has-text("Sign Out")');

    // Should be redirected to login
    await expect(page).toHaveURL('/admin/login');

    // Try to access dashboard directly
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL('/admin/login');
  });
});
