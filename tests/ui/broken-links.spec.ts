import { test, Page } from "@playwright/test";
import { BrokenLinksPage } from "../../pages/broken-links-page";
import { MainPage } from "../../pages/main-page";

test.describe("Broken Links", () => {
    let mainPage: MainPage;
    let brokenLinksPage: BrokenLinksPage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        brokenLinksPage = new BrokenLinksPage(page);
        await page.goto("/");
        await mainPage.navigateToElementsPage();
        await brokenLinksPage.navigateToBrokenLinksPage();
    });

    test('Broken image should present', async () => {
        await brokenLinksPage.verifyBrokenImagePresent();
    });
});
