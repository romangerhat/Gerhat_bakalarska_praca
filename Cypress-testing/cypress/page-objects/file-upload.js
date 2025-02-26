class FileUploadPage {

    get fileInput() {
        return cy.get('input[type=file]');
    }

    get fileSubmit() {
        return cy.get('#fileSubmit');
    }

    get uploadedFiles() {
        return cy.get('#uploaded-files');
    }



}

export default FileUploadPage;
