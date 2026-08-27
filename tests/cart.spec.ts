import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Sauce Demo — Cart', () => {
  test('validate that the cart is empty on a fresh session', async ({ page }) => {
    const cart = new CartPage(page);
    // Navigate to the homepage and click on the cart icon to check if the cart is empty.
    await page.goto('/');
    await cart.cartIcon.click();
    await expect(cart.emptyCartMessage).toBeVisible();
  });

  test('validate that adding a product to a cart displays it correctly', async ({ page }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    //navigate to the product page and add an item to the cart.
    await product.goto('noir-jacket');
    await product.addToCart();
    //navigate to the cart page and check if the item is visible in the cart with the correct price.
    await cart.goto();
    await expect(page.getByText(/Noir jacket/i).first()).toBeVisible();
    await expect(page.getByText('£60.00').first()).toBeVisible();
  });

  test('validate that when a user adds an item to the cart, the checkout button becomes available', async ({ page }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    // Navigate to the product page and add an item to the cart.
    await product.goto('striped-top');
    await product.addToCart();
    //Navigate to the cart page and check if the checkout button is visible.
    await cart.goto();
    await expect(cart.checkoutButton).toBeVisible();
  });
});
