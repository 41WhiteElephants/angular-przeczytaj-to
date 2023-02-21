import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://czytaj.io');
});

test('dashboard-rendering', async ({ page }) => {
  await page.getByRole('link', { name: 'Zaloguj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/login');
  await page.getByLabel('E-mail *').fill("wacol72@gmail.com");
  await page.getByLabel('Hasło *').fill("adminP@5s");
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page).toHaveURL('https://czytaj.io/dashboard');
  await expect(page.locator('.dashboard .greeting')).toHaveText('Witaj admin2');
  await expect(page.locator('app-generate-audio')).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await page.locator('td')[1].click();
  await page.getByRole('link', { name: 'Wyloguj się' }).click();
});