import {expect, Locator, Page} from '@playwright/test';

export class BrokenLinksPage {
    readonly brokenLinksButton: Locator;
    readonly brokenImage: Locator;

    constructor(page: Page) {
        this.brokenLinksButton = page.locator('.show .btn-light:nth-of-type(7) .text');
        this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    }

    async navigateToBrokenLinksPage() {
        await this.brokenLinksButton.click();
    }

    async verifyBrokenImagePresent() {
        await expect(this.brokenImage).toBeVisible();
    }
}