const { Builder } = require('selenium-webdriver');
const PasswordPage = require('../page-objects/password');
const passwords = require('../test-files/passwords.json');
require('chromedriver');
const chrome = require("selenium-webdriver/chrome");

describe('Password check', function() {
    this.timeout(10000);

    let driver;
    let passwordPage;

    before(async function() {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/gerha/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        passwordPage = new PasswordPage(driver);
    });

    it('Password validator', async function() {
        const passwordKeys = Object.keys(passwords);
        await driver.get('https://practice.expandtesting.com/secure-password-checker');

        for (let i = 0; i < passwordKeys.length; i++) {
            const key = passwordKeys[i];
            const { value, validatorsActive, validatorsNonActive } = passwords[key];

            await passwordPage.passwordField.clear();
            await passwordPage.passwordField.sendKeys(value);

            for (let j = 0; j < validatorsActive.length; j++) {
                const validator = await passwordPage[validatorsActive[j]].isDisplayed();
                if (!validator) {
                    throw new Error(`${validatorsActive[j]} is not visible when it should be`);
                }
            }

            for (let j = 0; j < validatorsNonActive.length; j++) {
                const validator = await passwordPage[validatorsNonActive[j]].isDisplayed();
                if (validator) {
                    throw new Error(`${validatorsNonActive[j]} is visible when it should not be`);
                }
            }
        }
    });

    after(async function() {
        await driver.quit();
    });
});
