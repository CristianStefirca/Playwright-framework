import { expect, Locator, Page } from "@playwright/test";

export class HomePage{
    // define Selectors
    readonly page: Page;
    readonly SignInButton: Locator;
    readonly searchBar: Locator;
    // init selectors using selectors
    constructor(page: Page) {
    this.page = page;
    this.SignInButton = page.locator('#signin_button');
    this.searchBar = page.locator('#searchTerm');
    }



    async visit(){
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickSignInButton(){
        await this.SignInButton.click();
    }

    async search(text: string){
        await this.searchBar.fill(text);
        await this.searchBar.press('Enter');
    }
}