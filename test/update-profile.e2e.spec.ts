import { test, expect } from '@playwright/test';

test('success update profile', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();
  await page.getByLabel('Nome').fill('Pizza Shop 2');
  await page.getByLabel('Descrição').fill('Description Pizza Shop');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Perfil autalizado');

  await page.getByRole('button', { name: 'Close' }).click();
  await expect(toast).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Pizza Shop 2' }),
  ).toBeVisible();
});

test('fail update profile', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();
  await page.getByLabel('Nome').fill('Pizza Shop teste');
  await page.getByLabel('Descrição').fill('Description Pizza Shop');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Falha ao atualizar o perfil, tente novamente');

  await expect(toast).toBeVisible();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.waitForTimeout(2000);
});
