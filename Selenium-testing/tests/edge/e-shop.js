const { Builder } = require('selenium-webdriver');
const EShopPage = require('../../page-objects/e-shop');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

describe('Dynamic e-shop test', function () {
    let driver;
    let eShopPage;
    const jSbook = '674108466cb6226060a20d44';
    const agileBook = '67410a586cb6226060a20d8d';
    const devOpsBook = '67410b8c6cb6226060a20da4';
    let jSBookPrice = 0;
    let agileBookPrice = 0;
    let devOpsBookPrice = 0;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/gerha/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=Default');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        eShopPage = new EShopPage(driver);

        await driver.get('https://practice.expandtesting.com/bookstore');
        await driver.manage().deleteAllCookies();
        await driver.executeScript('window.localStorage.clear();');
        await driver.executeScript('window.sessionStorage.clear();');

        const jsBookPriceElement = await eShopPage.bookPrice(jSbook);
        const agileBookPriceElement = await eShopPage.bookPrice(agileBook);
        const devOpsBookPriceElement = await eShopPage.bookPrice(devOpsBook);

        jSBookPrice = parseInt(await jsBookPriceElement.getText());
        agileBookPrice = parseInt(await agileBookPriceElement.getText());
        devOpsBookPrice = parseInt(await devOpsBookPriceElement.getText());
    });

    it('Search books and add them to the cart', async function () {
        await eShopPage.searchInput.sendKeys('DevOps');
        await eShopPage.searchButton.click();

        // Scroll into view before clicking
        const devOpsBookElement = await eShopPage.addBookToCart(devOpsBook);
        await driver.executeScript("arguments[0].scrollIntoView();", devOpsBookElement);
        await driver.sleep(2000);
        await devOpsBookElement.click();

        const shoppingCartBadge1 = await eShopPage.shoppingCartBadge;
        const badgeText1 = await shoppingCartBadge1.getText();
        if (badgeText1 !== '1') throw new Error('Shopping cart badge does not contain "1"');

        await eShopPage.searchInput.clear();
        await eShopPage.searchInput.sendKeys('Agile');
        await eShopPage.searchButton.click();

        await driver.sleep(2000);

        // Scroll into view before clicking
        const agileBookElement = await eShopPage.addBookToCart(agileBook);
        await driver.executeScript("arguments[0].scrollIntoView();", agileBookElement);
        await driver.sleep(2000);
        await agileBookElement.click();

        const shoppingCartBadge2 = await eShopPage.shoppingCartBadge;
        const badgeText2 = await shoppingCartBadge2.getText();
        if (badgeText2 !== '2') throw new Error('Shopping cart badge does not contain "2"');
    });


    it('Shopping cart actions', async function () {
        await eShopPage.shoppingCart.click();
        const totalPriceElement = await eShopPage.totalPrice;
        const totalPriceText = await totalPriceElement.getText();
        if (!totalPriceText.includes(`${devOpsBookPrice + agileBookPrice}.00€`)) {
            throw new Error('Total price does not match expected value');
        }

        await eShopPage.removeBookFromCart(agileBook).click();
        const devOpsQuantityInput = await eShopPage.cardQuantity(devOpsBook);
        await devOpsQuantityInput.clear();
        await devOpsQuantityInput.sendKeys('3');

        const updateQuantityButton = await eShopPage.updateQuantityButton(devOpsBook);
        await updateQuantityButton.click();

        const shoppingCartBadge3 = await eShopPage.shoppingCartBadge;
        const badgeText3 = await shoppingCartBadge3.getText();
        if (badgeText3 !== '3') throw new Error('Shopping cart badge does not contain "3"');

        const totalPriceUpdatedElement = await eShopPage.totalPrice;
        const totalPriceUpdatedText = await totalPriceUpdatedElement.getText();
        if (!totalPriceUpdatedText.includes(`${devOpsBookPrice * 3}.00€`)) {
            throw new Error('Total price does not match updated value');
        }

        const bookStoreLink = await eShopPage.bookStore;
        await bookStoreLink.click();
    });

    it('Return to store and add more books to the cart', async function () {
        const shoppingCartBadge4 = await eShopPage.shoppingCartBadge;
        const badgeText4 = await shoppingCartBadge4.getText();
        if (badgeText4 !== '3') throw new Error('Shopping cart badge does not contain "3"');

        // Scroll into view before clicking
        const jsBookElement = await eShopPage.addBookToCart(jSbook);
        await driver.executeScript("arguments[0].scrollIntoView();", jsBookElement);
        await driver.sleep(2000);
        await jsBookElement.click();

        const shoppingCartBadge5 = await eShopPage.shoppingCartBadge;
        const badgeText5 = await shoppingCartBadge5.getText();
        if (badgeText5 !== '4') throw new Error('Shopping cart badge does not contain "4"');
    });


    it('Check cart and proceed to checkout', async function () {
        await eShopPage.shoppingCart.click();
        const shoppingCartBadge6 = await eShopPage.shoppingCartBadge;
        const badgeText6 = await shoppingCartBadge6.getText();
        if (badgeText6 !== '4') throw new Error('Shopping cart badge does not contain "4"');

        const totalPriceText = await eShopPage.totalPrice.getText();
        if (!totalPriceText.includes(`${devOpsBookPrice * 3 + jSBookPrice}.00€`)) {
            throw new Error('Total price does not match expected value');
        }

        await eShopPage.checkout.click();
        const emailField = await eShopPage.emailField;
        const passwordField = await eShopPage.passwordField;

        if (!await emailField.isDisplayed()) throw new Error('Email field is not visible');
        if (!await passwordField.isDisplayed()) throw new Error('Password field is not visible');
    });

    after(async function () {
        await driver.quit();
    });
});
