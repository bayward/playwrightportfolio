import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Sauce Demo — Cart', () => {
  test('cart is empty on a fresh session', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();

    await expect(cart.emptyCartMessage).toBeVisible();
  });

  test('adding a product from the product page makes it appear in the cart', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('noir-jacket');
    await product.addToCart();

    const cart = new CartPage(page);
    await cart.goto();

    await expect(page.getByText(/Noir jacket/i).first()).toBeVisible();
    await expect(page.getByText('£60.00').first()).toBeVisible();
  });

  test('checkout is reachable once the cart has an item', async ({ page }) => {
    const product = new ProductPage(page);
    await product.goto('striped-top');
    await product.addToCart();

    const cart = new CartPage(page);
    await cart.goto();

    await expect(cart.checkoutButton).toBeVisible();
  });
});
