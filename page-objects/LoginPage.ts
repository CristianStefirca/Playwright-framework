import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{
    // define Selectors
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    // init selectors using selectors
    constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user_login');
    this.passwordInput = page.locator('#user_password');
    this.submitButton = page.locator('text= Sign in');
    this.errorMessage = page.locator('.alert-error');
    }
    // define login page methods
    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }
}