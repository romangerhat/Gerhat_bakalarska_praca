// tests/loginTest.js
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../page-objects/test');
require('chromedriver'); // Import ChromeDriver

describe('Login Test', function() {
    this.timeout(10000); // Set default timeout to 10 seconds

    let driver;
    let loginPage;

    before(async function() {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/gerha/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        loginPage = new LoginPage(driver); // Create an instance of the LoginPage object
    });

    it('should login successfully', async function() {
        await driver.get('https://practice.expandtesting.com/login'); // Replace with your test URL
        await loginPage.enterUsername('testuser');
        await loginPage.enterPassword('password');
    });

    after(async function() {
        await driver.quit();
    });
});
