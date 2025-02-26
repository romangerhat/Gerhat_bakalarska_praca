import XPathPage from "../page-objects/xpath";

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Assignment to constant variable')) {
        return false;  // Prevent the test from failing
    }
    return true;  // Let Cypress handle other errors
});

describe('Common website elements using Xpath locators', () => {
    const xPathPage = new XPathPage();
    const dataTransfer = new DataTransfer(); // musim pouzit datatransfer

    before('Visit Website', () => {
        cy.visit('https://practice.expandtesting.com/drag-and-drop-circles')
    })

    it('Drag & Drop', () => {
        xPathPage.redCircle.trigger('dragstart', { dataTransfer });
        xPathPage.dropTarget.trigger('drop', { dataTransfer });

        xPathPage.dropTarget.within(() => {
            xPathPage.redCircle.should('exist'); // neviem ci funguje spravne
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

    it('Autocomplete', () => {
        cy.visit('https://practice.expandtesting.com/autocomplete');
        xPathPage.inputField.type('slova');
        xPathPage.inputField.type('{downarrow}');
        xPathPage.inputField.type('{enter}');
        xPathPage.submit.click();
        xPathPage.result.should('have.text', 'You selected: Slovakia');
    })

    it('Long wait', () => {
        cy.visit('https://practice.expandtesting.com/slow');
        cy.get('.alert', { timeout: 60000 }).should('be.visible');
    })

})