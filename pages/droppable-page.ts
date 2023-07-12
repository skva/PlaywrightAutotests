import {expect, Locator, Page} from '@playwright/test';

export class DroppablePage {
    readonly droppableButton: Locator;
    readonly dragMeElement: Locator;
    readonly dropHereElement: Locator;

    constructor(page: Page) {
        this.droppableButton = page.locator('.show .btn-light:nth-of-type(4) .text')
        this.dragMeElement = page.locator('#draggable');
        this.dropHereElement = page.locator('#simpleDropContainer #droppable');
    }

    async navigateToDroppablePage() {
        await this.droppableButton.click();
    }

    async performDragAndDrop() {
        await this.dragMeElement.dragTo(this.dropHereElement);
    }

    async assertDropHereElementContainsText(expectedText: string) {
        const actualText = await this.dropHereElement.textContent();
        expect(actualText).toBe(expectedText);
    }

    async assertDropHereElementHasColor(expectedColor: string) {
        const actualColor = await this.dropHereElement.evaluate(el => {
            const style = window.getComputedStyle(el);
            return style.backgroundColor;
        });
        expect(actualColor).toBe(expectedColor);
    }
}