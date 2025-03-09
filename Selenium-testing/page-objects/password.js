const { By } = require('selenium-webdriver');

class PasswordPage {
    constructor(driver) {
        this.driver = driver;
    }

    get lengthValidator() {
        return this.driver.findElement(By.className('length'));
    }

    get lowercaseValidator() {
        return this.driver.findElement(By.className('lowercase'));
    }

    get uppercaseValidator() {
        return this.driver.findElement(By.className('uppercase'));
    }

    get specialValidator() {
        return this.driver.findElement(By.className('special'));
    }

    get passwordField() {
        return this.driver.findElement(By.className('password'));
    }
}

module.exports = PasswordPage;
