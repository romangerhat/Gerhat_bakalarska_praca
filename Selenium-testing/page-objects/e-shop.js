const { By } = require('selenium-webdriver');

class EShopPage {

    constructor(driver) {
        this.driver = driver;
    }

    // Fields
    get emailField() {
        return this.driver.findElement(By.id('email'));
    }

    get passwordField() {
        return this.driver.findElement(By.id('password'));
    }

    get shoppingCartBadge() {
        return this.driver.findElement(By.css('.badge'));
    }

    get shoppingCart() {
        return this.driver.findElement(By.css('a[href="/bookstore/cart"]'));
    }

    get checkout() {
        return this.driver.findElement(By.css('a[href="/bookstore/checkout"]'));
    }

    get bookStore() {
        return this.driver.findElement(By.css('a[href="/bookstore"]'));
    }

    get searchInput() {
        return this.driver.findElement(By.id('search-input'));
    }

    get searchButton() {
        return this.driver.findElement(By.id('search-btn'));
    }

    get totalPrice() {
        return this.driver.findElement(By.css('.text-danger'));
    }

    addBookToCart(id) {
        return this.driver.findElement(By.css(`a[href="/bookstore/add-to-cart/${id}"]`));
    }

    removeBookFromCart(id) {
        return this.driver.findElement(By.css(`a[href="/bookstore/remove/${id}"]`));
    }

    bookPrice(id) {
        return this.driver.findElement(By.css(`[data-testid="price-${id}"]`));
    }

    cardQuantity(id) {
        return this.driver.findElement(By.css(`input[name="idPro"][value="${id}"]`))
            .findElement(By.xpath("..")) // Move to parent container
            .findElement(By.css('input[name="cartQty"]')); // Select the quantity input
    }

    updateQuantityButton(id) {
        return this.driver.findElement(By.css(`input[name="idPro"][value="${id}"]`))
            .findElement(By.xpath("..")) // Move to parent container
            .findElement(By.css('button[type="submit"]')); // Find the submit button
    }
}

module.exports = EShopPage;
