import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Sauce Demo — Product page', () => {
  test('displays product title, price, and description', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('grey-jacket');

    await expect(product.titleGreyJacket).toHaveText('Grey jacket');
    await expect(product.priceGreyJacket).toBeVisible();
    await expect(page.getByText(/populated by the product description/i)).toBeVisible();
  });

  test('Grey jacket page shows the correct name and price', async ({ page }) => {
        const product = new ProductPage(page);
        await page.goto('/products/grey-jacket');
        await expect(product.titleGreyJacket).toBeVisible();
        await expect(product.priceGreyJacket).toBeVisible();
      });

  test('Noir jacket page shows the correct name and price', async ({ page }) => {
        const product = new ProductPage(page);
        await page.goto('/products/noir-jacket');
        await expect(product.titleNoirJacket).toBeVisible();
        await expect(product.priceNoirJacket).toBeVisible();
      });

  test('Striped top page shows the correct name and price', async ({ page }) => {
        const product = new ProductPage(page);
        await page.goto('/products/striped-top');
        await expect(product.titleStripedTop).toBeVisible();
        await expect(product.priceStripedTop).toBeVisible();
      });

  test('adding a product to the cart updates the cart count', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('grey-jacket');

    // NOTE: verify this selector with `npx playwright codegen` against the live
    // site first — Shopify themes vary in how "Add to cart" is implemented
    // (button vs input[type=submit], form submit vs AJAX).
    await product.addToCart();

    await expect(page.getByText(/My Cart \(1\)/i).first()).toBeVisible({ timeout: 10000 });
  });
});
