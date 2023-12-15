import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { FeedBackPage } from '../../page-objects/FeedBackPage';

    // Negative Scenario
    test('Invalid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await homePage.visit();
        await page.click('#signin_button')
        await page.fill('#user_login', 'invalid')
        await page.fill('#user_password', 'invalid')
        await page.click('text=Sign in')

        await loginPage.assertErrorMessage();
    })
    // Positive scenario + logout
    test('Valid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await homePage.visit();
        await page.getByRole('button', { name: 'Signin' }).click();
        await loginPage.login('username', 'password');
        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        await page.getByText('username').click();
        await page.getByRole('link', { name: 'Logout' }).click();
    })



        // feedback from
        test('Test feedback', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const homePage = new HomePage(page);
            await homePage.visit();
            await page.getByRole('button', { name: 'Signin' }).click();
            await loginPage.login('username', 'password');
            await page.waitForTimeout(1000);
            await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
            await page.getByRole('link', { name: 'Transfer Funds' }).click();
            await page.getByLabel('From Account').selectOption('5');
            await page.getByLabel('To Account').selectOption('6');
            await page.getByLabel('Amount').click();
            await page.getByLabel('Amount').fill('5436');
            await page.getByLabel('Description').click();
            await page.getByLabel('Description').press('CapsLock');
            await page.getByLabel('Description').fill('This is a ');
            await page.getByLabel('Description').press('CapsLock');
            await page.getByLabel('Description').fill('This is a QA test');
            await page.getByRole('button', { name: 'Continue' }).click();
        })

    test('Test feedback AGAIN', async ({ page }) => {
        const FeedBackForm = new FeedBackPage(page);
        await page.goto('http://zero.webappsecurity.com/feedback.html')
        await FeedBackForm.fillForm('name', 'email', 'subject', 'comment');
        await FeedBackForm.submitForm();
        await FeedBackForm.feedbackFormSent();
    })

    test('Search test', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visit();
        await homePage.search('online bank');
        await page.waitForTimeout(2000);
    });

    test('Challenge', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.visit();
        await page.getByRole('button', { name: 'Signin' }).click();
        await loginPage.login('username', 'password');
        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
        await page.click('a[href="#ui-tabs-3"]');
        await page.getByLabel('Currency', { exact: true }).selectOption('EUR');
        await page.getByLabel('Conversion Amount').click();
        await page.getByLabel('Conversion Amount').fill('500');
        await page.getByLabel('U.S. dollar (USD)').check();
        await page.getByRole('button', { name: 'Calculate Costs' }).click();
        const conversion = await page.locator('#pc_conversion_amount');
        await expect(conversion).toContainText('360.70 euro (EUR) = 500.00 U.S. dollar (USD)');
        await page.waitForTimeout(2000);
        const successConversion = await page.locator('#alert_content');
        await page.getByRole('button', { name: 'Purchase' }).click();
        await expect(successConversion).toHaveText('Foreign currency cash was successfully purchased.');
        await page.waitForTimeout(2000);
    });