import {Locator, Page} from '@playwright/test';

export class ToolTipsPage {
    readonly page: Page;
    readonly toolTipsButton: Locator;
    readonly hoverMeButton: Locator;
    readonly hoverMeButtonTooltip: Locator;
    constructor(page: Page) {
        this.page = page;
        this.toolTipsButton = page.locator('.show .btn-light:nth-of-type(7) .text');
        this.hoverMeButton = page.locator('#toolTipButton');
        this.hoverMeButtonTooltip = page.locator('#buttonToolTip');
    }

    async navigateToToolTipsPage() {
        await this.toolTipsButton.click();
    }

    async hoverMeButtonHover(): Promise<void> {
        await this.hoverMeButton.hover();
    }

    async waitForTooltip(): Promise<void> {
        await this.page.waitForSelector('#buttonToolTip');
    }

    async getTooltipText(): Promise<string> {
        return await this.hoverMeButtonTooltip.textContent();
    }
}