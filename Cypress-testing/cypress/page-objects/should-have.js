class ShouldHavePage {

    get classButton() {
        return cy.get('#btn1');
    }

    get textButton() {
        return cy.get('#btn2');
    }

    get cssDiv() {
        return cy.get('#div1');
    }

    get lengthUl() {
        return cy.get('#ul1');
    }

    get valueInput() {
        return cy.get('#input1');
    }

}

export default ShouldHavePage;
