const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/edge');
const ShouldBePage = require('../../page-objects/should-be');
const ShouldHavePage = require('../../page-objects/should-have');
const ShouldMatchPage = require('../../page-objects/should-match');
require('edgedriver');

describe('Assertions test', function() {
    this.timeout(10000);

    let driver;
    let shouldBePage;
    let shouldHavePage;
    let shouldMatchPage;

    before(async function() {
        let options = new Options();
        options.addArguments('--user-data-dir=C:\\Users\\gerha\\AppData\\Local\\Microsoft\\Edge\\User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();

        shouldBePage = new ShouldBePage(driver);
        shouldHavePage = new ShouldHavePage(driver);
        shouldMatchPage = new ShouldMatchPage(driver);
    });

    it('Should BE assertions', async function() {
        await driver.get('https://practice.expandtesting.com/assertions/should-be');

        const visibleButton = await shouldBePage.visibleButton.isDisplayed();
        if (!visibleButton) {
            throw new Error('The visible button is not displayed');
        }

        const invisibleButton = await shouldBePage.invisibleButton.isDisplayed();
        if (invisibleButton) {
            throw new Error('The invisible button is visible when it should not be');
        }

        const isChecked = await shouldBePage.checkedBox.isSelected();
        if (!isChecked) {
            throw new Error('The checkbox is not checked');
        }

        const isUnchecked = await shouldBePage.uncheckedBox.isSelected();
        if (isUnchecked) {
            throw new Error('The checkbox is checked when it should not be');
        }

        const emptyDivText = await shouldBePage.emptyDiv.getText();
        if (emptyDivText.trim() !== '') {
            throw new Error('The div is not empty');
        }

        const notEmptyDivText = await shouldBePage.notEmptyDiv.getText();
        if (notEmptyDivText.trim() === '') {
            throw new Error('The div is empty when it should not be');
        }

        const isEnabled = await shouldBePage.enabledButton.isEnabled();
        if (!isEnabled) {
            throw new Error('The button is not enabled');
        }

        const isDisabled = await shouldBePage.disabledButton.isEnabled();
        if (isDisabled) {
            throw new Error('The button is not disabled');
        }
    });

    it('"Should HAVE" assertions', async function() {
        await driver.get('https://practice.expandtesting.com/assertions/should-have');

        const classButton = await shouldHavePage.classButton.getAttribute('class');
        if (!classButton.includes('class1')) {
            throw new Error('The button does not have the expected class "class1"');
        }

        const textButton = await shouldHavePage.textButton.getText();
        if (textButton !== 'Button 2') {
            throw new Error('The button text is not "Button 2"');
        }

        const cssColor = await shouldHavePage.cssDiv.getCssValue('color');
        const backgroundColor = await shouldHavePage.cssDiv.getCssValue('background-color');

        if (cssColor !== 'rgba(0, 0, 0, 1)') {
            throw new Error('The color of the div is not "rgba(0, 0, 0, 1)"');
        }

        if (backgroundColor !== 'rgba(77, 148, 255, 1)') {
            throw new Error('The background color of the div is not "rgba(77, 148, 255, 1)"');
        }

        const valueInput = await shouldHavePage.valueInput.getAttribute('value');
        if (valueInput !== 'first name') {
            throw new Error('The input field does not have the expected value "first name"');
        }
    });

    it('"Should MATCH" assertions', async function() {
        await driver.get('https://practice.expandtesting.com/assertions/should-match');

        const matchInputText = await shouldMatchPage.matchInput.getText();
        const regex = /^[A-Z][a-zA-Z0-9\s]*\.\.\.$/;

        if (!regex.test(matchInputText)) {
            throw new Error('The text does not match the expected pattern');
        }
    });

    after(async function() {
        await driver.quit();
    });
});
