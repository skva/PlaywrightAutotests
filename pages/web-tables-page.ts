import {expect, Locator, Page} from '@playwright/test';

export class WebTablesPage {
    readonly page: Page;
    readonly webTablesButton: Locator;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webTablesButton = page.locator('.show .menu-list .btn-light:nth-of-type(4)')
        this.addButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
    }

    async navigateToWebTablesPage() {
        await this.webTablesButton.click();
    }

    async addUser(user: any) {
        await this.addButton.click();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.ageInput.fill(user.age);
        await this.salaryInput.fill(user.salary);
        await this.departmentInput.fill(user.department);
        await this.submitButton.click();
    }

    async editUser(user: any) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.submitButton.click();
    }

    async verifyLastUser(expectedUser: any) {
        // Get all rows
        const rows = await this.page.$$('.rt-tr-group');

        // Find the last row with data
        let lastRowWithData;
        for (let i = rows.length - 1; i >= 0; i--) {
            const row = rows[i];
            const cells = await row.$$('.rt-td');
            const firstName = await cells[0].innerText();

            if (firstName.trim() !== '') {
                lastRowWithData = row;
                break;
            }
        }

        // Assert data
        const user = {};
        const details = ['firstName', 'lastName', 'age', 'email', 'salary', 'department'];

        const cells = await lastRowWithData.$$('.rt-td');

        for (let i = 0; i < details.length; i++) {
            user[details[i]] = await cells[i].innerText();
            await expect(user[details[i]]).toBe(expectedUser[details[i]]);
        }
    }

    async verifyUserById(id: number, expectedUser: any) {
        // Get all rows
        const rows = await this.page.$$('.rt-tr-group');

        // Find the row with the specified ID
        const targetRow = rows[id - 1];

        if (!targetRow) {
            throw new Error(`User with ID ${id} not found.`);
        }

        // Assert data
        const user = {};
        const details = ['firstName', 'lastName', 'age', 'email', 'salary', 'department'];

        const cells = await targetRow.$$('.rt-td');

        for (let i = 0; i < details.length; i++) {
            user[details[i]] = await cells[i].innerText();
            expect(user[details[i]]).toBe(expectedUser[details[i]]);
        }
    }


    async findEditButtonById(id: number) {
        const rows = await this.page.$$('.rt-tr-group');
        for await (let row of rows) {
            const editButton = await row.$(`[id^="edit-record-${id}"]`);
            if (editButton) {
                await editButton.click();
                break;
            }
        }
    }

    async findEditButtonByFirstName(firstName: string) {
        const rows = await this.page.$$('.rt-tr-group');
        for await (let row of rows) {
            const firstNameCell = await row.$('.rt-td:first-child');
            const cellText = await firstNameCell.textContent();
            if (cellText?.trim() === firstName) {
                const editButton = await row.$('[data-toggle="tooltip"][title="Edit"]');
                await editButton.click();
                break;
            }
        }
    }
}
