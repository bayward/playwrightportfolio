import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly titleGreyJacket: Locator;
  readonly titleNoirJacket: Locator;
  readonly titleStripedTop: Locator;
  readonly priceGreyJacket: Locator;
  readonly priceNoirJacket: Locator;
  readonly priceStripedTop: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleGreyJacket = page.getByRole('heading', { name: 'Grey jacket' });
    this.titleNoirJacket = page.getByRole('heading', { name: 'Noir jacket' });
    this.titleStripedTop = page.getByRole('heading', { name: 'Striped top' });
    this.priceGreyJacket = page.getByText('£55.00', { exact: true });
    this.priceNoirJacket = page.getByText('£60.00', { exact: true });
    this.priceStripedTop = page.getByText('£50.00', { exact: true });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async goto(handle: string) {
    await this.page.goto(`/products/${handle}`);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
