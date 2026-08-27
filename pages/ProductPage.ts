import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    this.price = page.getByText(/£\d+\.\d{2}/).first();
    // Shopify themes usually label this "Add to cart" / "Add to Cart".
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async goto(handle: string) {
    await this.page.goto(`/products/${handle}`);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
