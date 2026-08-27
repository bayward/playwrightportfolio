import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    this.price = page.getByRole('heading', { name: '£' })
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async goto(handle: string) {
    await this.page.goto(`/products/${handle}`);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
