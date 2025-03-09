const { By } = require('selenium-webdriver');

class ShouldMatchPage {
    constructor(driver) {
        this.driver = driver;
    }

    get matchInput() {
        return this.driver.findElement(By.id('div1'));
    }
}

module.exports = ShouldMatchPage;
