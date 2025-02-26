class ExamplePageObject {

    get exampleElement() {
        return cy.get('#example-long-selector-id');
    }
}

export default ExamplePageObject;
