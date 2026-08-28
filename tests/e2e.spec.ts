import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Md. Zahid Hasan/);
});

test('navigation links work', async ({ page }) => {
  await page.goto('/');
  
  // Click the projects / open source link.
  await page.locator('a[href$="projects"]').first().click();

  // Expects the URL to contain projects.
  await expect(page).toHaveURL(/.*projects/);
});