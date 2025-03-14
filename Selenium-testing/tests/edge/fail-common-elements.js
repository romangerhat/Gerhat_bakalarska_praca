const { Builder, By, Key, until } = require('selenium-webdriver');
const DragAndDropPage = require('../../page-objects/drag-and-drop');
const FileUploadPage = require('../../page-objects/file-upload');
const DropDownPage = require('../../page-objects/dropdown');
const { Options } = require('selenium-webdriver/edge');
require('edgedriver');
const path = require("path");

describe('Common website elements', function () {
    let driver;
    let dragAndDropPage;
    let fileUploadPage;
    let dropDownPage;

    before(async function () {
        let options = new Options();
        options.addArguments('--user-data-dir=C:\\Users\\gerha\\AppData\\Local\\Microsoft\\Edge\\User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();
        dragAndDropPage = new DragAndDropPage(driver);
        fileUploadPage = new FileUploadPage(driver);
        dropDownPage = new DropDownPage(driver);
    });

    it('Drag & Drop', async function () {
        await driver.get('https://practice.expandtesting.com/drag-and-drop-circles');
        const { Actions, TouchActions } = require('selenium-webdriver');
        const redCircle = await dragAndDropPage.redCircle;
        const blueCircle = await dragAndDropPage.blueCircle;
        const greenCircle = await dragAndDropPage.greenCircle;
        const dropTarget = await dragAndDropPage.dropTarget;

        const action = driver.actions({ async: true });

        await action.dragAndDrop(redCircle, dropTarget).perform();
        await dropTarget.findElement(By.css('.red')).then(() => console.log('Red circle dropped'));

        try {
            await dropTarget.findElement(By.css('.blue'));
        } catch (error) {
            throw new Error('The green circle was not dropped:', error.message);
        }

        await action.dragAndDrop(greenCircle, dropTarget).perform();
        await dropTarget.findElement(By.css('.green')).then(() => console.log('Green circle dropped'));
    });

    const path = require('path');

    it('Upload file', async function () {
        await driver.get('https://practice.expandtesting.com/upload');

        try {
            const filePath = path.resolve(__dirname, '../../test-files/tst.txt');
        } catch {
            throw new Error('File was not found.')
        }

        const fileInput = await fileUploadPage.fileInput;
        const fileSubmit = await fileUploadPage.fileSubmit;

        await fileInput.sendKeys(filePath);
        await fileSubmit.click();

        const uploadedFiles = await fileUploadPage.uploadedFiles;
        const filesText = await uploadedFiles.getText();

        if (filesText.includes('test.txt')) {
            console.log('File uploaded successfully');
        } else {
            throw new Error('File upload failed');
        }
    });

    it('Long wait', async function () {
        await driver.get('https://practice.expandtesting.com/slow');
        try {
            await driver.wait(until.elementLocated(By.css('.alert')), 1000);
        } catch {
            throw new Error('The element did not appear on time.')
        }
    });

    it('Dropdown', async function () {
        await driver.get('https://practice.expandtesting.com/dropdown');
        const simpleDropdown = await dropDownPage.simpleDropdown;
        const countryDropdown = await dropDownPage.countryDropdown;

        const options = await simpleDropdown.findElements(By.tagName('option'));
        const optionTexts = await Promise.all(options.map(option => option.getText()));

        if (optionTexts.includes('Option 1') && optionTexts.includes('Option 3')) {
            console.log('Dropdown options verified');
        } else {
            throw new Error('Dropdown options was not found.');
        }

        await countryDropdown.sendKeys('Slovakia');
    });

    after(async function () {
        await driver.quit();
    });
});