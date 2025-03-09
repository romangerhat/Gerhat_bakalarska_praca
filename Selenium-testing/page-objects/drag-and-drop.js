const { By } = require('selenium-webdriver');

class DragAndDropPage {
    constructor(driver) {
        this.driver = driver;
    }

    get redCircle() {
        return this.driver.findElement(By.css('.red'));
    }

    get blueCircle() {
        return this.driver.findElement(By.css('.blue'));
    }

    get greenCircle() {
        return this.driver.findElement(By.css('.green'));
    }

    get dropTarget() {
        return this.driver.findElement(By.id('target'));
    }
}

module.exports = DragAndDropPage;
