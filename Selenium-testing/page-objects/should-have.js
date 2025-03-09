const { By } = require('selenium-webdriver');

class ShouldHavePage {
    constructor(driver) {
        this.driver = driver;
    }

    get classButton() {
        return this.driver.findElement(By.id('btn1'));
    }

    get textButton() {
        return this.driver.findElement(By.id('btn2'));
    }

    get cssDiv() {
        return this.driver.findElement(By.id('div1'));
    }

    get lengthUl() {
        return this.driver.findElement(By.id('ul1'));
    }

    get valueInput() {
        return this.driver.findElement(By.id('input1'));
    }
}

module.exports = ShouldHavePage;
