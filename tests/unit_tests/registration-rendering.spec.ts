import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://czytaj.io/');
});

test('registration-rendering', async ({ page }) => {
  await page.getByRole('link', { name: 'Zarejestruj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/rejestruj');
  await expect(page.locator('app-signup')).toBeVisible();
});