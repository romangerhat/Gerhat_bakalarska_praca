const { By } = require('selenium-webdriver');

class FileUploadPage {
    constructor(driver) {
        this.driver = driver;
    }

    get fileInput() {
        return this.driver.findElement(By.css('input[type=file]'));
    }

    get fileSubmit() {
        return this.driver.findElement(By.id('fileSubmit'));
    }

    get uploadedFiles() {
        return this.driver.findElement(By.id('uploaded-files'));
    }
}

module.exports = FileUploadPage;
