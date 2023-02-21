import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://czytaj.io/');
});

test('landing-rendering', async ({ page }) => {
  await page.getByRole('link', { name: 'Zaloguj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/login');
  await expect(page.locator('app-login')).toBeVisible();
});