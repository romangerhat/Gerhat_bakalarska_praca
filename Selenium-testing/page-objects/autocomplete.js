const { By } = require('selenium-webdriver');

class AutocompletePage {
    constructor(driver) {
        this.driver = driver;
    }

    get inputField() {
        return this.driver.findElement(By.id('country'));
    }

    get submit() {
        return this.driver.findElement(By.css('.btn'));
    }

    get result() {
        return this.driver.findElement(By.id('result'));
    }
}

module.exports = AutocompletePage;
