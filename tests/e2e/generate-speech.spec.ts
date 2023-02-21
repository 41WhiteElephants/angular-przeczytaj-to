import { test, expect } from '@playwright/test';

test('generate-speech', async ({ page }) => {
  await page.getByRole('link', { name: 'Zaloguj się' }).click();
  await expect(page).toHaveURL('https://czytaj.io/login');
  await page.getByLabel('E-mail *').fill("wacol72@gmail.com");
  await page.getByLabel('Hasło *').fill("adminP@5s");
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page).toHaveURL('https://czytaj.io/dashboard');
  await page.getByPlaceholder('Wpisz tekst *').fill("Ala ma kota, a Zbyszek chomika.")
  await page.getByRole('button', { name: 'Przeczytaj tekst' }).click();
  await page.getByRole('link', { name: 'Wyloguj się' }).click();

});