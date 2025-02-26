class AutocompletePage {

    get inputField() {
        return cy.get('#country');
    }

    get submit() {
        return cy.get('.btn');
    }

    get result() {
        return cy.get('#result')
    }

}

export default AutocompletePage;
