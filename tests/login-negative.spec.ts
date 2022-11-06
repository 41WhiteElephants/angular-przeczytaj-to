import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://czytaj.io/');
  await page.getByRole('link', { name: 'Zaloguj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/login');
  await page.getByLabel('E-mail *').click();
  await page.getByLabel('E-mail *').click();
  await page.getByLabel('Hasło *').click();
  await page.getByLabel('Hasło *').fill('tettP@5');
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await page.getByLabel('E-mail *').click();
  await page.getByLabel('E-mail *').fill('test@czytaj.io');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Zaloguj' }).click();
});