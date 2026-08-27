import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Sauce Demo — Product page', () => {
  test('displays product title, price, and description', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('grey-jacket');

    await expect(product.title).toHaveText('Grey jacket');
    await expect(product.price).toBeVisible();
    await expect(page.getByText(/populated by the product description/i)).toBeVisible();
  });

  test('shows related products under "You Might Also Like"', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('grey-jacket');

    await expect(page.getByText('You Might Also Like')).toBeVisible();
    await expect(page.getByRole('link', { name: /Noir jacket/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Striped top/i }).first()).toBeVisible();
  });

  test.describe('for each frontpage product', () => {
    const products = [
      { handle: 'grey-jacket', name: 'Grey jacket', price: '£55.00' },
      { handle: 'noir-jacket', name: 'Noir jacket', price: '£60.00' },
      { handle: 'striped-top', name: 'Striped top', price: '£50.00' },
    ];

    for (const { handle, name, price } of products) {
      test(`${name} page shows the correct name and price`, async ({ page }) => {
        const product = new ProductPage(page);
        await product.goto(handle);

        await expect(product.title).toHaveText(name);
        await expect(page.getByText(price).first()).toBeVisible();
      });
    }
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
