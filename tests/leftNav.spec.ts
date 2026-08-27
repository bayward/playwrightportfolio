import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import {LeftNav} from '../pages/leftNav';

test.describe('Sauce Demo — Left Navigation', () => {
    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
    });

    test('left navigation links point to the right places', async ({ page }) => {
        const leftNav = new LeftNav(page);
        await expect(leftNav.catalogLink).toHaveAttribute('href', '/collections/all');
        await expect(leftNav.blogLink).toHaveAttribute('href', '/blogs/news');
        await expect(leftNav.aboutUsLink).toHaveAttribute('href', '/pages/about-us');
        await expect(leftNav.wishlistLink).toHaveAttribute('href', '#sauce-show-wish-list');
        await expect(leftNav.referLink).toHaveAttribute('href', '#sauce-show-refer-friend');
    });
});