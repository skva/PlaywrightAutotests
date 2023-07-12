import { test, Page } from "@playwright/test";
import { PracticeFormPage } from "../../pages/practice-form-page";
import students from "../../fixtures/students.json"
import {MainPage} from "../../pages/main-page";

test.describe("Practice Form", () => {
    let mainPage: MainPage;
    let practiceFormsPage: PracticeFormPage;
    test.beforeEach(async ({ page }: { page: Page }) => {
        mainPage = new MainPage(page);
        practiceFormsPage = new PracticeFormPage(page);
        await page.goto("/");
        await mainPage.navigateToFormsPage();
        await practiceFormsPage.navigateToFormsPage();
    });

    test('Practice form should contain correct data', async ({ page }: { page: Page }) => {
        const practiceFormPage = new PracticeFormPage(page);
        await page.addStyleTag({content: '#fixedban { display: none !important; }'});
        await page.addStyleTag({ content: 'footer { display: none !important; }' });
        await practiceFormPage.selectGender('male');
        await practiceFormPage.addUser(students.newStudent);
        await practiceFormPage.verifyStudentDetails(students.newStudent);
    });
});
