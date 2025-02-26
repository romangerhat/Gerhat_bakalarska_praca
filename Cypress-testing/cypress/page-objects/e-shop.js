class EShopPage {

    get emailField() {
        return cy.get('#email');
    }

    get passwordfield() {
        return cy.get('#password');
    }

    get shoppingCartBadge() {
        return cy.get('.badge');
    }

    get shoppingCart() {
        return cy.get('a[href="/bookstore/cart"]');
    }

    get checkout() {
        return cy.get('a[href="/bookstore/checkout"]');
    }

    get bookStore() {
        return cy.get('a[href="/bookstore"]');
    }

    get searchInput() {
        return cy.get('#search-input');
    }

    get searchButton() {
        return cy.get('#search-btn');
    }

    get totalPrice() {
        return cy.get('.text-danger');
    }

    addBookToCart(id) {
        return cy.get(`a[href="/bookstore/add-to-cart/${id}"]`);
    }

    removeBookFromCart(id) {
        return cy.get(`a[href="/bookstore/remove/${id}"]`);
    }

    bookPrice(id) {
        return cy.get(`[data-testid="price-${id}"]`);
    }

    cardQuantity(id) {
        return cy.get(`input[name="idPro"][value="${id}"]`)
            .parent() // Move to the parent container
            .find('input[name="cartQty"]'); // Select the quantity input
    }

    updateQuantityButton(id) {
        return cy.get(`input[name="idPro"][value="${id}"]`)
            .parent() // Move to the parent container
            .find('button[type="submit"]'); // Select the submit button
    }



}

export default EShopPage;
