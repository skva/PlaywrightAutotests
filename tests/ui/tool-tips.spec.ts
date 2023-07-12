import { expect, test, Page } from "@playwright/test";
import { ToolTipsPage } from "../../pages/tool-tips-page";
import {MainPage} from "../../pages/main-page";

test.describe("Tool Tips", () => {
    let mainPage: MainPage;
    let toolTipsPage: ToolTipsPage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        toolTipsPage = new ToolTipsPage(page);
        await page.goto("/");
        await mainPage.navigateToWidgetsPage();
        await toolTipsPage.navigateToToolTipsPage();
    });

    test('Tooltip should appear', async ({ page }: { page: Page }) => {
        const toolTipsPage = new ToolTipsPage(page);
        await toolTipsPage.hoverMeButtonHover();
        await toolTipsPage.waitForTooltip();
        expect(await toolTipsPage.getTooltipText()).toBe('You hovered over the Button');
    });
});
