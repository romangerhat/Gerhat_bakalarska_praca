import DragAndDropPage from "../page-objects/drag-and-drop";
import FileUploadPage from "../page-objects/file-upload";
import DropDownPage from "../page-objects/dropdown";

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Assignment to constant variable')) {
        return false;
    }
    return true;
});

describe('Common website elements', () => {
    const dragAndDropPage = new DragAndDropPage();
    const dataTransfer = new DataTransfer(); // musim pouzit datatransfer
    const fileUploadPage = new FileUploadPage();
    const dropDownPage = new DropDownPage();

    before('Visit Website', () => {
        cy.visit('https://practice.expandtesting.com/drag-and-drop-circles')
    })

    it('Drag & Drop', () => {
        dragAndDropPage.redCircle.trigger('dragstart', { dataTransfer });
        dragAndDropPage.dropTarget.trigger('drop', { dataTransfer });

        dragAndDropPage.dropTarget.within(() => {
            dragAndDropPage.redCircle.should('exist');
        });

        dragAndDropPage.blueCircle.trigger('dragstart', { dataTransfer });
        dragAndDropPage.dropTarget.trigger('drop', { dataTransfer });

        dragAndDropPage.dropTarget.within(() => {
            dragAndDropPage.redCircle.should('exist');
            dragAndDropPage.blueCircle.should('exist');
        });

        dragAndDropPage.greenCircle.trigger('dragstart', { dataTransfer });
        dragAndDropPage.dropTarget.trigger('drop', { dataTransfer });

        dragAndDropPage.dropTarget.within(() => {
            dragAndDropPage.redCircle.should('exist');
            dragAndDropPage.blueCircle.should('exist');
            dragAndDropPage.greenCircle.should('exist');
        });
    })

    it('Upload file', () => {
        cy.visit('https://practice.expandtesting.com/upload');

        fileUploadPage.fileInput.selectFile('cypress/fixtures/test.txt');
        fileUploadPage.fileSubmit.click();
    })

    it('Long wait', () => {
        cy.visit('https://practice.expandtesting.com/slow');
        cy.get('.alert', { timeout: 60000 }).should('be.visible');
    })

    it('Dropdown', () => {
        cy.visit('https://practice.expandtesting.com/dropdown');
        dropDownPage.simpleDropdown
            .find('option')
            .and('contain', 'Option 1')
            .and('contain', 'Option 2');
        dropDownPage.countryDropdown.select('Slovakia');
    })
})