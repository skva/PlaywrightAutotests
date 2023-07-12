import {Locator, Page} from "@playwright/test";

export class MainPage {
    readonly elementsCard: Locator;
    readonly formsCard: Locator;
    readonly widgetsCard: Locator;
    readonly interactionsCard: Locator;

    constructor(page: Page) {
        this.elementsCard = page.locator('div.card-body h5:has-text("Elements")')
        this.formsCard = page.locator('div.card-body h5:has-text("Forms")')
        this.widgetsCard = page.locator('div.card-body h5:has-text("Widgets")')
        this.interactionsCard = page.locator('div.card-body h5:has-text("Interactions")')
    }

    async navigateToElementsPage(): Promise<void> {
        await this.elementsCard.click();
    }

    async navigateToFormsPage(): Promise<void> {
        await this.formsCard.click();
    }

    async navigateToWidgetsPage(): Promise<void> {
        await this.widgetsCard.click();
    }

    async navigateToInteractionsPage(): Promise<void> {
        await this.interactionsCard.click();
    }
}
