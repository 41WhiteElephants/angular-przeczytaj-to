import { test, expect } from '@playwright/test';

test('login-negative', async ({ page }) => {
  await page.goto('https://czytaj.io/');
  await page.getByRole('link', { name: 'Zaloguj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/login');
  await page.getByLabel('Hasło *').fill('testP@5');
  await page.getByLabel('E-mail *').fill('test@czytaj.io');
  await page.getByRole('button', { name: 'Zaloguj' }).click();

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

});