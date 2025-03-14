import XPathPage from "../page-objects/xpath";

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Assignment to constant variable')) {
        return false;
    }
    return true;
});

describe('Common website elements using Xpath locators', () => {
    const xPathPage = new XPathPage();
    const dataTransfer = new DataTransfer();

    before('Visit Website', () => {
        cy.visit('https://practice.expandtesting.com/drag-and-drop-circles')
    })

    it('Drag & Drop', () => {
        xPathPage.redCircle.trigger('dragstart', { dataTransfer });
        xPathPage.dropTarget.trigger('drop', { dataTransfer });

        xPathPage.dropTarget.within(() => {
            xPathPage.redCircle.should('exist');
        });

        xPathPage.blueCircle.trigger('dragstart', { dataTransfer });
        xPathPage.dropTarget.trigger('drop', { dataTransfer });

        xPathPage.dropTarget.within(() => {
            xPathPage.redCircle.should('exist');
            xPathPage.blueCircle.should('exist');
        });

        xPathPage.greenCircle.trigger('dragstart', { dataTransfer });
        xPathPage.dropTarget.trigger('drop', { dataTransfer });

        xPathPage.dropTarget.within(() => {
            xPathPage.redCircle.should('exist');
            xPathPage.blueCircle.should('exist');
            xPathPage.greenCircle.should('exist');
        });
    })

    it('Upload file', () => {
        cy.visit('https://practice.expandtesting.com/upload');

        xPathPage.fileInput.selectFile('cypress/fixtures/test.txt');
        xPathPage.fileSubmit.click();
    })

    it('Long wait', () => {
        cy.visit('https://practice.expandtesting.com/slow');
        cy.get('.alert', { timeout: 60000 }).should('be.visible');
    })

    it('Dropdown', () => {
        cy.visit('https://practice.expandtesting.com/dropdown');
        xPathPage.simpleDropdown
                .find('option')
                .and('contain', 'Option 1')
                .and('contain', 'Option 2');

        xPathPage.countryDropdown.select('Slovakia');
        });



})