const { By } = require('selenium-webdriver');

class DropDownPage {
    constructor(driver) {
        this.driver = driver;
    }

    get simpleDropdown() {
        return this.driver.findElement(By.id('dropdown'));
    }

    get countryDropdown() {
        return this.driver.findElement(By.id('country'));
    }
}

module.exports = DropDownPage;
