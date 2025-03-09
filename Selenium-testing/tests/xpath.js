const { Builder, By, until } = require('selenium-webdriver');
const XPathPage = require('../page-objects/xpath');
const chrome = require("selenium-webdriver/chrome");
require('chromedriver');

describe('Common website elements', function () {
    let driver;
    let xpathPage;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/gerha/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        xpathPage = new XPathPage(driver); // Initialize XPathPage object
    });

    it('Drag & Drop', async function () {
        await driver.get('https://practice.expandtesting.com/drag-and-drop-circles');

        const redCircle = await xpathPage.redCircle;
        const blueCircle = await xpathPage.blueCircle;
        const greenCircle = await xpathPage.greenCircle;
        const dropTarget = await xpathPage.dropTarget;

        const action = driver.actions({ async: true });

        await action.dragAndDrop(redCircle, dropTarget).perform();
        await dropTarget.findElement(By.xpath('//div[contains(@class, "red")]'))
            .then(() => console.log('Red circle dropped'));

        await action.dragAndDrop(blueCircle, dropTarget).perform();
        await dropTarget.findElement(By.xpath('//div[contains(@class, "blue")]'))
            .then(() => console.log('Blue circle dropped'));

        await action.dragAndDrop(greenCircle, dropTarget).perform();
        await dropTarget.findElement(By.xpath('//div[contains(@class, "green")]'))
            .then(() => console.log('Green circle dropped'));
    });

    const path = require('path');

    it('Upload file', async function () {
        await driver.get('https://practice.expandtesting.com/upload');

        const filePath = path.resolve(__dirname, '../test-files/test.txt');

        const fileInput = await xpathPage.fileInput;
        const fileSubmit = await xpathPage.fileSubmit;

        await fileInput.sendKeys(filePath);
        await fileSubmit.click();

        const uploadedFiles = await xpathPage.uploadedFiles;
        const filesText = await uploadedFiles.getText();

        if (filesText.includes('test.txt')) {
            console.log('File uploaded successfully');
        } else {
            throw new Error('File upload failed');
        }
    });

    it('Long wait', async function () {
        await driver.get('https://practice.expandtesting.com/slow');
        const alert = await driver.wait(until.elementLocated(By.xpath('//*[contains(@class, "alert")]')), 60000);
        if (alert) {
            console.log('Alert is visible');
        } else {
            throw new Error('Alert did not appear in time');
        }
    });


    it('Dropdown', async function () {
        await driver.get('https://practice.expandtesting.com/dropdown');

        const simpleDropdown = await xpathPage.simpleDropdown;
        const countryDropdown = await xpathPage.countryDropdown;

        // Check the options for the simple dropdown
        const options = await simpleDropdown.findElements(By.xpath('.//option'));
        const optionTexts = await Promise.all(options.map(option => option.getText()));

        if (optionTexts.includes('Option 1') && optionTexts.includes('Option 2')) {
            console.log('Dropdown options verified');
        } else {
            throw new Error('Dropdown options mismatch');
        }

        // Select a country from the country dropdown
        await countryDropdown.sendKeys('Slovakia');
    });


    after(async function () {
        await driver.quit();
    });
});
