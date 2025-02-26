// musel som naistalovat xpath plugin npm install -D cypress-xpath
import 'cypress-xpath';

class XPathPage {

    get redCircle() {
        return cy.xpath('//div[contains(@class, "red")]');
    }

    get blueCircle() {
        return cy.xpath('//div[contains(@class, "blue")]');
    }

    get greenCircle() {
        return cy.xpath('//div[contains(@class, "green")]');
    }

    get dropTarget() {
        return cy.xpath('//div[@id="target"]');
    }

    get fileInput() {
        return cy.xpath('//input[@type="file"]');
    }

    get fileSubmit() {
        return cy.xpath('//*[@id="fileSubmit"]');
    }

    get uploadedFiles() {
        return cy.xpath('//*[@id="uploaded-files"]');
    }

    get inputField() {
        return cy.xpath('//*[@id="country"]');
    }

    get submit() {
        return cy.xpath('/html/body/main/div[3]/div/div[1]/div/div/div[2]/button');
    }

    get result() {
        return cy.xpath('//*[@id="result"]');
    }


}

export default XPathPage;
