import { Page, Locator } from '@playwright/test';

export class LeftNav {
  readonly page: Page;
  readonly homeLink: Locator
  readonly catalogLink: Locator
  readonly blogLink: Locator
  readonly aboutUsLink: Locator
  readonly wishlistLink: Locator
  readonly referLink: Locator
  readonly facebookLink: Locator
  readonly twitterLink: Locator
  readonly instagramLink: Locator
  readonly pinterestLink: Locator
  readonly newsletterLink: Locator

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.catalogLink = page.getByRole('link', { name: 'Catalog' });
    this.blogLink = page.getByRole('link', { name: 'Blog' });
    this.aboutUsLink = page.locator('#main-menu').getByRole('link', { name: 'About Us' });
    this.wishlistLink = page.getByRole('link', { name: 'Wish list' });
    this.referLink = page.getByRole('link', { name: 'Refer a friend' }); 
    this.facebookLink = page.getByRole('link').filter({ hasText: /^$/ }).first();
    this.twitterLink = page.getByRole('link').filter({ hasText: /^$/ }).nth(1);
    this.instagramLink = page.getByRole('link').filter({ hasText: /^$/ }).nth(2);
    this.pinterestLink = page.getByRole('link').filter({ hasText: /^$/ }).nth(3);
    this.newsletterLink = page.getByRole('link').filter({ hasText: /^$/ }).nth(4);
  }
}