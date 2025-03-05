const eShopPage = require('../nightwatch/page-objects/e-shop');
const books = {
    jSbook: '674108466cb6226060a20d44',
    agileBook: '67410a586cb6226060a20d8d',
    devOpsBook: '67410b8c6cb6226060a20da4'
};

let jSBookPrice = 0;
let agileBookPrice = 0;
let devOpsBookPrice = 0;

module.exports = {
    '@tags': ['eshop'],

    before(browser) {
        browser.url('https://practice.expandtesting.com/bookstore').windowMaximize();

        browser.deleteCookies();
        browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    },

    'Get Book Prices': function (browser) {
        browser.getText(`[data-testid="price-${books.jSbook}"]`, function (result) {
            jSBookPrice = parseInt(result.value.replace('€', '').trim());
            console.log("JS Book Price:", jSBookPrice);
        });
        browser.getText(`[data-testid="price-${books.agileBook}"]`, function (result) {
            agileBookPrice = parseInt(result.value.replace('€', '').trim());
            console.log("Agile Book Price:", agileBookPrice);
        });
        browser.getText(`[data-testid="price-${books.devOpsBook}"]`, function (result) {
            devOpsBookPrice = parseInt(result.value.replace('€', '').trim());
            console.log("DevOps Book Price:", devOpsBookPrice);
        });
    },

    'Search books and add them to the cart': function (browser) {

        browser.setValue(eShopPage.elements.searchInput, 'DevOps');
        browser.click(eShopPage.elements.searchButton);
        browser.waitForElementNotPresent(`a[href="/bookstore/add-to-cart/${books.agileBook}"]`);
        browser.waitForElementNotPresent(`a[href="/bookstore/add-to-cart/${books.jSbook}"]`);
        browser.pause(2000);
        browser.click(`a[href="/bookstore/add-to-cart/${books.devOpsBook}"]`);
        // browser.assert.containsText(eShopPage.elements.shoppingCartBadge, '1')
        browser.element(eShopPage.elements.searchInput).clear();
        browser.setValue(eShopPage.elements.searchInput, 'Agile');
        browser.click(eShopPage.elements.searchButton);
        browser.waitForElementNotPresent(`a[href="/bookstore/add-to-cart/${books.devOpsBook}"]`);
        browser.waitForElementNotPresent(`a[href="/bookstore/add-to-cart/${books.jSbook}"]`);
        browser.click(`a[href="/bookstore/add-to-cart/${books.agileBook}"]`);
        // browser.assert.containsText(eShopPage.elements.shoppingCartBadge, '2')
    },

    'Shopping cart actions': function (browser) {
        browser.click(eShopPage.elements.shoppingCart);
        browser.assert.containsText(eShopPage.elements.totalPrice, (devOpsBookPrice + agileBookPrice).toString());

        browser.click(`a[href="/bookstore/remove/${books.agileBook}"]`);
        browser.setValue(
            'input[name="idPro"][value="67410b8c6cb6226060a20da4"] + input[name="cartQty"]',
            '3'
        ); // zmenim pocet na 3
        browser.click('input[name="idPro"][value="67410b8c6cb6226060a20da4"] ~ button[type="submit"]'); // ulozim zmeny
        browser.assert.containsText(eShopPage.elements.totalPrice, (devOpsBookPrice*3).toString());
        browser.click(eShopPage.elements.bookStore);
    },

    'Return to store and add more books to the cart': function (browser) {

        //browser.expect.element('@shoppingCartBadge').text.to.equal('3');
        browser.click(`a[href="/bookstore/add-to-cart/${books.jSbook}"]`);
        //browser.expect.element('@shoppingCartBadge').text.to.equal('4');
    },

    'Check cart and proceed to checkout': function (browser) {
        /*
        browser.click(eShopPage.elements.shoppingCart);
        //browser.expect.element('@shoppingCartBadge').text.to.equal('4');
        browser.assert.containsText(eShopPage.elements.totalPrice, parseInt(devOpsBookPrice)*3  + parseInt(jSBookPrice));
        browser.click(eShopPage.elements.checkout);
        browser.waitForElementVisible(eShopPage.elements.emailField);
        browser.waitForElementVisible(eShopPage.elements.passwordField);

        browser.end(); */
    }
};
