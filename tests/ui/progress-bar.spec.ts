import { test, Page } from "@playwright/test";
import { ProgressBarPage } from "../../pages/progress-bar-page";
import {MainPage} from "../../pages/main-page";

test.describe("Progress Bar", () => {
    let mainPage: MainPage;
    let progressBarPage: ProgressBarPage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        progressBarPage = new ProgressBarPage(page);
        await page.goto("/");
        await mainPage.navigateToWidgetsPage()
        await progressBarPage.navigateToProgressBarPage();
    });

    test('Progress bar should filling up', async ({ page }: { page: Page }) => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.assertProgressBarIsEmpty();
        await progressBarPage.clickStartStopButton();
        await progressBarPage.waitForProgressBarFill(10000);
        await progressBarPage.assertProgressBarIsFull();

        // Add color assert as is it in DragAndDrop
    });
});
