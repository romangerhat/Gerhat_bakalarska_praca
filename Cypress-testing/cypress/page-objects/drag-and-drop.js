class DragAndDropPage {

    get redCircle() {
        return cy.get('.red');
    }

    get blueCircle() {
        return cy.get('.blue');
    }

    get greenCircle() {
        return cy.get('.green');
    }

    get dropTarget() {
        return cy.get('#target');
    }

}

export default DragAndDropPage;
