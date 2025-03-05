module.exports = {
    elements: {
        emailField: '#email',
        passwordField: '#password',
        shoppingCartBadge: '.badge',
        shoppingCart: 'a[href="/bookstore/cart"]',
        checkout: 'a[href="/bookstore/checkout"]',
        bookStore: 'a[href="/bookstore"]',
        searchInput: '#search-input',
        searchButton: '#search-btn',
        totalPrice: '.text-danger',
    },
    dynamic: {
      bookPrice(id) {
          return `[data-testid="price-${id}"]`
      }
    },
    commands: [{
        addBookToCart(id) {
            return this.api.elementIdQuery(`a[href="/bookstore/add-to-cart/${id}"]`);
        },
        removeBookFromCart(id) {
            return this.api.elementIdQuery(`a[href="/bookstore/remove/${id}"]`);
        },
        bookPrice(id) {
            return this.api.elementIdQuery(`[data-testid="price-${id}"]`);
        },
        cardQuantity(id) {
            return this.api.elementIdQuery(`input[name="idPro"][value="${id}"]`)
                .parent()
                .find('input[name="cartQty"]');
        },
        updateQuantityButton(id) {
            return this.api.elementIdQuery(`input[name="idPro"][value="${id}"]`)
                .parent()
                .find('button[type="submit"]');
        }
    }]
};
