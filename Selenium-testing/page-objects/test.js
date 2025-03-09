const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id('username'); // Adjust with your own selectors
        this.passwordField = By.id('password');
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

}

module.exports = LoginPage;
