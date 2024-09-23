import { test, expect } from '@playwright/test';

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(page.getByText('R$ 200,00')).toBeVisible();
  expect(page.getByText('10% em relação ao mês passado')).toBeVisible();
});

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(page.getByText('20', { exact: true }).first()).toBeVisible();
  expect(page.getByText('-5%').first()).toBeVisible();
});

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(page.getByText('20', { exact: true }).nth(1)).toBeVisible();
  expect(
    page
      .locator('p')
      .filter({ hasText: '-5% em relação a ontem' })
      .locator('span'),
  ).toBeVisible();
});

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(page.getByText('20', { exact: true }).nth(2)).toBeVisible();
  expect(page.getByText('-5% em relação ao mês passado').nth(1)).toBeVisible();
});
