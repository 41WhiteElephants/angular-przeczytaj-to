import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('landing-rendering', async ({ page }) => {

  await expect(page.locator('app-header')).toBeVisible()
  await expect(page.locator('footer p')).toHaveText('© czytaj.io');
  await expect(page.locator('h1')).toHaveText('Zatrudnij sztuczną inteligencję do czytania Twoich tekstów');

});