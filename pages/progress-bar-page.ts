import {expect, Locator, Page} from '@playwright/test';

export class ProgressBarPage {
    readonly page: Page;
    readonly progressBarButton: Locator;
    readonly progressBar: Locator;
    readonly startStopButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.progressBarButton = page.locator('.show .btn-light:nth-of-type(5) .text');
        this.progressBar = page.locator("#progressBar .progress-bar");
        this.startStopButton = page.locator("#startStopButton");
    }

    async navigateToProgressBarPage() {
        await this.progressBarButton.click();
    }

    async clickStartStopButton() {
        await this.startStopButton.click();
    }

    async waitForProgressBarFill(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    async assertProgressBarIsEmpty() {
        const isEmpty = await this.isProgressBarEmpty();
        expect(isEmpty).toBe(true);
    }

    async assertProgressBarIsFull() {
        const isFull = await this.isProgressBarFull();
        expect(isFull).toBe(true);
    }

    private async isProgressBarEmpty(): Promise<boolean> {
        const ariaValueNow = await this.progressBar.getAttribute('aria-valuenow');
        return ariaValueNow === '0';
    }

    private async isProgressBarFull(): Promise<boolean> {
        const ariaValueNow = await this.progressBar.getAttribute('aria-valuenow');
        return ariaValueNow === '100';
    }
}