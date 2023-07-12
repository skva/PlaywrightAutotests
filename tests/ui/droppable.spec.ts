import { test, Page } from "@playwright/test";
import { DroppablePage } from "../../pages/droppable-page";
import {MainPage} from "../../pages/main-page";

test.describe("Droppable", () => {
    let mainPage: MainPage;
    let droppablePage: DroppablePage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        droppablePage = new DroppablePage(page);
        await page.goto("/");
        await mainPage.navigateToInteractionsPage();
        await droppablePage.navigateToDroppablePage();
    });

    test('Element should be dropped to the container', async ({ page }: { page: Page }) => {
        const droppablePage = new DroppablePage(page);

        await droppablePage.performDragAndDrop();
        await droppablePage.assertDropHereElementContainsText('Dropped!');
        await droppablePage.assertDropHereElementHasColor('rgb(70, 130, 180)');
    });
});
