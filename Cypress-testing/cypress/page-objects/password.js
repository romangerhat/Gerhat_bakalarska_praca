class PasswordPage {

    get lenghtValidator() {
        return cy.get('.length');
    }

    get lowercaseValidator() {
        return cy.get('.lowercase');
    }

    get uppercaseValidator() {
        return cy.get('.uppercase');
    }

    get specialValidator() {
        return cy.get('.special');
    }

    get passwordField() {
        return cy.get('.password');
    }
}

export default PasswordPage;
