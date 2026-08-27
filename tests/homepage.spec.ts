import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Sauce Demo — Homepage', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test('loads with the correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Sauce Demo/i);
    const home = new HomePage(page);
    await expect(home.heading).toBeVisible();
  });

  test('displays the three frontpage products with prices', async ({ page }) => {
    await expect(page.getByText('Grey jacket').first()).toBeVisible();
    await expect(page.getByText('Noir jacket').first()).toBeVisible();
    await expect(page.getByText('Striped top').first()).toBeVisible();

    await expect(page.getByText('£55.00')).toBeVisible();
    await expect(page.getByText('£60.00')).toBeVisible();
    await expect(page.getByText('£50.00')).toBeVisible();
  });

  test('navigates to a product page when a product is clicked', async ({ page }) => {
    const home = new HomePage(page);
    await home.openProductByName('Grey jacket');

    await expect(page).toHaveURL(/\/products\/grey-jacket/);
    await expect(page.getByRole('heading', { name: 'Grey jacket' })).toBeVisible();
  });

  test('shows an empty cart indicator by default', async ({ page }) => {
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('header navigation links point to the right places', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Catalog' })).toHaveAttribute('href', '/collections/all');
    await expect(page.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blogs/news');
    await expect(page.getByRole('link', { name: 'About Us' }).first()).toHaveAttribute('href', '/pages/about-us');
  });
});
