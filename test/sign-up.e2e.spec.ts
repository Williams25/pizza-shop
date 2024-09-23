import { test, expect } from '@playwright/test';

test('create a new restaurant', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' });

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop');
  await page.getByLabel('Seu nome').fill('William Gabriel');
  await page.getByLabel('Seu e-mail').fill('william007.gabriel@gmail.com');
  await page.getByLabel('Seu celular').fill('16981230085');
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click();
  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Restaurante cadastrado com sucesso!');

  await expect(toast).toBeVisible();
  await page.waitForTimeout(2000);
});

test('fail create a new restaurant', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' });

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop 2');
  await page.getByLabel('Seu nome').fill('William Gabriel');
  await page.getByLabel('Seu e-mail').fill('william007.gabriel@gmail.com');
  await page.getByLabel('Seu celular').fill('16981230085');
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click();
  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Erro ao cadastrar restaurante');

  await expect(toast).toBeVisible();
  await page.waitForTimeout(2000);
});
