import {expect, Locator, Page} from '@playwright/test';

export class PracticeFormPage {
    readonly page: Page;
    readonly practiceFormButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly maleRadioButton: Locator;
    readonly femaleRadioButton: Locator;
    readonly otherRadioButton: Locator;
    readonly mobileInput: Locator;
    readonly birthInput: Locator;
    readonly subjectsInput: Locator;
    readonly sportsHobbyCheckbox: Locator;
    readonly readingHobbyCheckbox: Locator;
    readonly musicHobbyCheckbox: Locator;
    readonly pictureUpload: Locator;
    readonly currentAddressInput: Locator;
    readonly stateMenu: Locator;
    readonly cityMenu: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.practiceFormButton = page.locator('.show .btn-light')
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.maleRadioButton = page.locator('label[for="gender-radio-1"]');
        this.femaleRadioButton = page.locator('label[for="gender-radio-2"]');
        this.otherRadioButton = page.locator('label[for="gender-radio-3"]');
        this.mobileInput = page.locator('#userNumber');
        this.birthInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsContainer');
        this.sportsHobbyCheckbox = page.locator('label[for="hobbies-checkbox-1"]');
        this.readingHobbyCheckbox = page.locator('label[for="hobbies-checkbox-2"]');
        this.musicHobbyCheckbox = page.locator('label[for="hobbies-checkbox-3"]');
        this.pictureUpload = page.locator('#uploadPicture');
        this.currentAddressInput = page.locator('#currentAddress');
        this.stateMenu = page.locator('#state');
        this.cityMenu = page.locator('#city');
        this.submitButton = page.locator('#submit');
    }

    async navigateToFormsPage() {
        await this.practiceFormButton.click();
    }

    async addUser(student: any) {
        await this.firstNameInput.fill(student.firstName);
        await this.lastNameInput.fill(student.lastName);
        await this.emailInput.fill(student.email);
        await this.selectGender(student.gender);
        await this.mobileInput.fill(student.mobile);
        await this.birthInput.fill(student.birth);
        await this.selectHobby(student.hobbies);
        await this.uploadPicture(student.picturePath);
        await this.currentAddressInput.fill(student.address);
        await this.selectState(student.state);
        await this.selectCity(student.city);
        await this.submitButton.click();
    }

    async selectGender(value: string) {
        let genderSelector: Locator;
        switch (value.toLowerCase()) {
            case 'male':
                genderSelector = this.maleRadioButton;
                break;
            case 'female':
                genderSelector = this.femaleRadioButton;
                break;
            case 'other':
                genderSelector = this.otherRadioButton;
                break;
            default:
                throw new Error(`Unknown gender: ${value}`);
        }
        await genderSelector.click();
    }

    async selectHobby(value: string) {
        let hobbySelector: Locator;
        switch (value.toLowerCase()) {
            case 'sports':
                hobbySelector = this.sportsHobbyCheckbox;
                break;
            case 'reading':
                hobbySelector = this.readingHobbyCheckbox;
                break;
            case 'music':
                hobbySelector = this.musicHobbyCheckbox;
                break;
            default:
                throw new Error(`Unknown hobby: ${value}`);
        }
        await hobbySelector.click();
    }

    async uploadPicture(filePath: string) {
        await this.pictureUpload.setInputFiles(`fixtures/${filePath}`);
    }

    async selectState(state: string) {
        await this.selectOption(this.stateMenu, state);
    }

    async selectCity(city: string) {
        await this.selectOption(this.cityMenu, city);
    }

    private async selectOption(menu: Locator, optionText: string) {
        await menu.click();
        const optionSelector = `.css-11unzgr div[tabindex="-1"]:has-text("${optionText}")`;
        await this.page.click(optionSelector);
    }

    async verifyStudentDetails(student: any) {
        const tableSelector = '.table';
        await this.page.waitForSelector(tableSelector);

        const tableData = await this.page.$$eval(`${tableSelector} tbody tr`, (rows) => {
            const data: { [key: string]: string } = {};
            rows.forEach((row) => {
                const cells = Array.from(row.getElementsByTagName('td'));
                const label = cells[0].textContent?.trim();
                const value = cells[1].textContent?.trim();
                if (label && value) {
                    data[label] = value;
                }
            });
            return data;
        });

        const expectedData: { [key: string]: string } = {
            "Student Name": `${student.firstName} ${student.lastName}`,
            "Student Email": student.email,
            "Gender": student.gender,
            "Mobile": student.mobile,
            "Date of Birth": student.birth,
            "Hobbies": student.hobbies,
            "Picture": student.picturePath,
            "Address": student.address,
            "State and City": `${student.state} ${student.city}`
        };

        expect(tableData).toEqual(expectedData);
    }
}