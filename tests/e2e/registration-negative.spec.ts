import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://czytaj.io/');
});

test('registration-negative', async ({ page }) => {
  await page.getByRole('link', { name: 'Zarejestruj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/rejestruj');
  await page.getByLabel('Nazwa użytkownika *').fill("admin");
  await page.getByLabel('E-mail *').fill("test@gmail.com");
  await page.getByLabel('Hasło *').fill("MoCneHa$$lo");
  await page.getByRole('button', { name: 'Zarejestruj się' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
});