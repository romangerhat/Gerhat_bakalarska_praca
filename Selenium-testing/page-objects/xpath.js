const { By } = require('selenium-webdriver');

class XPathPage {
    constructor(driver) {
        this.driver = driver;
    }

    get redCircle() {
        return this.driver.findElement(By.xpath('//div[contains(@class, "red")]'));
    }

    get blueCircle() {
        return this.driver.findElement(By.xpath('//div[contains(@class, "blue")]'));
    }

    get greenCircle() {
        return this.driver.findElement(By.xpath('//div[contains(@class, "green")]'));
    }

    get dropTarget() {
        return this.driver.findElement(By.xpath('//div[@id="target"]'));
    }

    get fileInput() {
        return this.driver.findElement(By.xpath('//input[@type="file"]'));
    }

    get fileSubmit() {
        return this.driver.findElement(By.xpath('//*[@id="fileSubmit"]'));
    }

    get uploadedFiles() {
        return this.driver.findElement(By.xpath('//*[@id="uploaded-files"]'));
    }

    get inputField() {
        return this.driver.findElement(By.xpath('//*[@id="country"]'));
    }

    get submit() {
        return this.driver.findElement(By.xpath('/html/body/main/div[3]/div/div[1]/div/div/div[2]/button'));
    }

    get result() {
        return this.driver.findElement(By.xpath('//*[@id="result"]'));
    }

    get simpleDropdown() {
        return this.driver.findElement(By.xpath('//*[@id="dropdown"]'));
    }

    get countryDropdown() {
        return this.driver.findElement(By.xpath('//*[@id="country"]'));
    }
}

module.exports = XPathPage;
