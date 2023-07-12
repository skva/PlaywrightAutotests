import { test, Page } from "@playwright/test";
import { WebTablesPage } from "../../pages/web-tables-page";
import users from "../../fixtures/users.json"
import {MainPage} from "../../pages/main-page";

test.describe("Web Elements", () => {
    let mainPage: MainPage;
    let webTablesPage: WebTablesPage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        webTablesPage = new WebTablesPage(page);
        await page.goto("/");
        await mainPage.navigateToElementsPage();
        await webTablesPage.navigateToWebTablesPage();
    });

    // Add afterEach data cleaner

    test('User should be created with correct data', async ({ page }: { page: Page }) => {
        const elementsPage = new WebTablesPage(page);
        await elementsPage.addUser(users.newUser);
        await elementsPage.verifyLastUser(users.newUser);
    });

    test('User should be edited with correct data', async ({ page }: { page: Page }) => {
        const elementsPage = new WebTablesPage(page);
        await elementsPage.findEditButtonById(users.editUser.id);
        await elementsPage.editUser(users.editUser);
        await elementsPage.verifyUserById(users.editUser.id, users.editUser);
    });
});
