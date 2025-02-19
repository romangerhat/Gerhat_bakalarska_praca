class ShouldBePage {

    get visibleButton() {
        return cy.get('#btn1');
    }

    get invisibleButton() {
        return cy.get('#btn2');
    }

    get checkedBox() {
        return cy.get('#cb1');
    }

    get uncheckedBox() {
        return cy.get('#cb2');
    }

    get emptyDiv() {
        return cy.get('#div1');
    }

    get notEmptyDiv() {
        return cy.get('#div2');
    }

    get visibleButton() {
        return cy.get('#btn1');
    }

    get invisibleButton() {
        return cy.get('#btn2');
    }

    get enabledButton() {
        return cy.get('#btn3');
    }

    get disabledButton() {
        return cy.get('#btn4');
    }
}

export default ShouldBePage;
