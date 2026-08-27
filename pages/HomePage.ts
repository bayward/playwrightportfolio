import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly loginLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sauce Demo' });
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.cartLink = page.getByRole('link', { name: /My Cart/i }).first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async openProductByName(name: string) {
    await this.page.getByRole('link', { name, exact: false }).first().click();
  }

  async getProductCardNames() {
    // Product cards render as links whose text includes the name and price,
    // e.g. "Grey jacket Grey jacket £55.00" — grab the distinct link texts.
    return this.page
      .locator('a')
      .filter({ hasText: '£' })
      .allTextContents();
  }
}
