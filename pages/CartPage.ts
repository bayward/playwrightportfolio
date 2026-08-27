import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: /checkout/i })
      .or(page.getByRole('link', { name: /checkout/i }));
    this.cartItems = page.locator('tr, .cart-item, [class*="cart-item"]');
    this.emptyCartMessage = page.getByText(/your cart is empty/i);
  }

  async goto() {
    await this.page.goto('/cart');
  }
}
