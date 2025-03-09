const { By } = require('selenium-webdriver');

class ShouldBePage {
    constructor(driver) {
        this.driver = driver;
    }

    get visibleButton() {
        return this.driver.findElement(By.id('btn1'));
    }

    get invisibleButton() {
        return this.driver.findElement(By.id('btn2'));
    }

    get checkedBox() {
        return this.driver.findElement(By.id('cb1'));
    }

    get uncheckedBox() {
        return this.driver.findElement(By.id('cb2'));
    }

    get emptyDiv() {
        return this.driver.findElement(By.id('div1'));
    }

    get notEmptyDiv() {
        return this.driver.findElement(By.id('div2'));
    }

    get enabledButton() {
        return this.driver.findElement(By.id('btn3'));
    }

    get disabledButton() {
        return this.driver.findElement(By.id('btn4'));
    }
}

module.exports = ShouldBePage;
