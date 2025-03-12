const { Builder, By, Key, until } = require('selenium-webdriver');
const DragAndDropPage = require('../../page-objects/drag-and-drop');
const FileUploadPage = require('../../page-objects/file-upload');
const AutoCompletePage = require('../../page-objects/autocomplete');
const DropDownPage = require('../../page-objects/dropdown');
const chrome = require("selenium-webdriver/chrome");
require('chromedriver');

describe('Common website elements', function () {
    let driver;
    let dragAndDropPage;
    let fileUploadPage;
    let autoCompletePage;
    let dropDownPage;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/gerha/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        dragAndDropPage = new DragAndDropPage(driver);
        fileUploadPage = new FileUploadPage(driver);
        autoCompletePage = new AutoCompletePage(driver);
        dropDownPage = new DropDownPage(driver);
    });

    it('Drag & Drop', async function () {
        await driver.get('https://practice.expandtesting.com/drag-and-drop-circles');
        // Function to simulate drag and drop using Actions
        const { Actions, TouchActions } = require('selenium-webdriver');
        const redCircle = await dragAndDropPage.redCircle;
        const blueCircle = await dragAndDropPage.blueCircle;
        const greenCircle = await dragAndDropPage.greenCircle;
        const dropTarget = await dragAndDropPage.dropTarget;

        const action = driver.actions({ async: true });

        // Perform drag-and-drop for each circle
        await action.dragAndDrop(redCircle, dropTarget).perform();
        await dropTarget.findElement(By.css('.red')).then(() => console.log('Red circle dropped'));

        await action.dragAndDrop(blueCircle, dropTarget).perform();
        await dropTarget.findElement(By.css('.blue')).then(() => console.log('Blue circle dropped'));

        await action.dragAndDrop(greenCircle, dropTarget).perform();
        await dropTarget.findElement(By.css('.green')).then(() => console.log('Green circle dropped'));
    });

    const path = require('path'); // Import Node.js path module

    it('Upload file', async function () {
        await driver.get('https://practice.expandtesting.com/upload');

        // Get the absolute path using the relative path
        const filePath = path.resolve(__dirname, '../test-files/test.txt');  // Adjust path as needed

        const fileInput = await fileUploadPage.fileInput;
        const fileSubmit = await fileUploadPage.fileSubmit;

        // Use sendKeys() with the absolute path
        await fileInput.sendKeys(filePath);
        await fileSubmit.click();

        // Check if the file has been uploaded
        const uploadedFiles = await fileUploadPage.uploadedFiles;
        const filesText = await uploadedFiles.getText();

        if (filesText.includes('test.txt')) {
            console.log('File uploaded successfully');
        } else {
            throw new Error('File upload failed');
        }
    });


    /* it('Autocomplete', async function () {
        await driver.get('https://practice.expandtesting.com/autocomplete');
        const inputField = await autoCompletePage.inputField;
        const submitButton = await autoCompletePage.submit;

        await inputField.sendKeys('slova');
        await inputField.sendKeys(Key.ARROW_DOWN);
        await inputField.sendKeys(Key.ENTER);

        await submitButton.click();

        const result = await autoCompletePage.result;
        const resultText = await result.getText();

        if (resultText.includes('Slovakia')) {
            console.log('Autocomplete successful');
        } else {
            throw new Error('Autocomplete failed');
        }
    }); */

    it('Long wait', async function () {
        await driver.get('https://practice.expandtesting.com/slow');
        const alert = await driver.wait(until.elementLocated(By.css('.alert')), 60000);
        if (alert) {
            console.log('Alert is visible');
        } else {
            throw new Error('Alert did not appear in time');
        }
    });

    it('Dropdown', async function () {
        await driver.get('https://practice.expandtesting.com/dropdown');
        const simpleDropdown = await dropDownPage.simpleDropdown;
        const countryDropdown = await dropDownPage.countryDropdown;

        // Check the options for the simple dropdown
        const options = await simpleDropdown.findElements(By.tagName('option'));
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
