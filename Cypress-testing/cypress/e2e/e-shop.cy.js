import EShopPage from "../page-objects/e-shop";

describe('Dynamic e-shop test', () => {
    const eShopPage = new EShopPage();
    const jSbook = '674108466cb6226060a20d44';
    const agileBook = '67410a586cb6226060a20d8d';
    const devOpsBook = '67410b8c6cb6226060a20da4';
    let jSBookPrice = 0;
    let agileBookPrice = 0;
    let devOpsBookPrice = 0;


    before('Visit Website', () => {
        cy.visit('https://practice.expandtesting.com/bookstore')
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        eShopPage.bookPrice(jSbook)
            .invoke('text')
            .then((text) => {
                jSBookPrice = parseInt(text);
            });
        eShopPage.bookPrice(agileBook)
            .invoke('text')
            .then((text) => {
                agileBookPrice = parseInt(text);
            });
        eShopPage.bookPrice(devOpsBook)
            .invoke('text')
            .then((text) => {
                devOpsBookPrice = parseInt(text);
            });
    })

    it('Search books and add them to the cart', () => {
        eShopPage.searchInput.type('DevOps');
        eShopPage.searchButton.click();

        eShopPage.addBookToCart(jSbook).should('not.exist');
        eShopPage.addBookToCart(agileBook).should('not.exist');

        eShopPage.addBookToCart(devOpsBook).click();
        eShopPage.shoppingCartBadge.should('contain', '1');

        eShopPage.searchInput.clear();
        eShopPage.searchInput.type('Agile');
        eShopPage.searchButton.click();

        eShopPage.addBookToCart(jSbook).should('not.exist');
        eShopPage.addBookToCart(devOpsBook).should('not.exist');

        eShopPage.addBookToCart(agileBook).click();
        eShopPage.shoppingCartBadge.should('contain', '2');

    })

    it('Shopping cart actions', () => {
        eShopPage.shoppingCart.click();
        eShopPage.totalPrice.should('contain', devOpsBookPrice + agileBookPrice + '.00€');

        eShopPage.removeBookFromCart(agileBook).click();
        eShopPage.cardQuantity(devOpsBook).clear().type('3');
        eShopPage.updateQuantityButton(devOpsBook).click();
        eShopPage.shoppingCartBadge.should('contain', '3');
        eShopPage.totalPrice.should('contain', parseInt(devOpsBookPrice)*3 + '.00€');
        eShopPage.bookStore.first().click();
    })

    it('Return to store and add more books to the cart', () => {
        eShopPage.shoppingCartBadge.should('contain', '3');
        eShopPage.addBookToCart(jSbook).click();
        eShopPage.shoppingCartBadge.should('contain', '4');
    })

    it('Check cart and proceed to checkout', () => {
        eShopPage.shoppingCart.click();
        eShopPage.shoppingCartBadge.should('contain', '4');
        eShopPage.totalPrice.should('contain', parseInt(devOpsBookPrice)*3 + parseInt(jSBookPrice) + '.00€');

        eShopPage.checkout.click();
        eShopPage.emailField.should('be.visible');
        eShopPage.passwordfield.should('be.visible');
    })

})