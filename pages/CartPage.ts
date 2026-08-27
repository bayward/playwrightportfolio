import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartIconEmpty: Locator;
  readonly noirJacketCartItem: Locator;
  readonly noirJacketPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Check Out' })
      .or(page.getByRole('link', { name: /checkout/i }));
    this.cartItems = page.locator('tr, .cart-item, [class*="cart-item"]');
    this.emptyCartMessage = page.getByText(/your cart is empty/i);
    this.cartIconEmpty = page.getByRole('link', { name: 'My Cart (0)' })
    this.noirJacketCartItem = page.getByRole('link', { name: 'Noir jacket - S / Blue' })
    this.noirJacketPrice = page.getByText('£').nth(3);
  }

  async goto() {
    await this.page.goto('/cart');
  }
}
