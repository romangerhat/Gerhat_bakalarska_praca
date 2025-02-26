class DropDownPage {

    get simpleDropdown() {
        return cy.get('#dropdown');
    }

    get countryDropdown() {
        return cy.get('#country');
    }
}

export default DropDownPage;
