import ShouldBePage from "../page-objects/should-be";
import ShouldHavePage from "../page-objects/should-have";

describe('template spec', () => {
  const shouldBePage = new ShouldBePage();
  const shouldHavePage = new ShouldHavePage();
  before('Visit Website', () => {
    cy.visit('https://practice.expandtesting.com/assertions/should-be')
  })

  it('"Should BE" assertions', () => {
    shouldBePage.visibleButton.should('be.visible');
    shouldBePage.invisibleButton.should('not.be.visible');

    shouldBePage.checkedBox.should('be.checked');
    shouldBePage.uncheckedBox.should('not.be.checked');

    shouldBePage.emptyDiv.should('be.empty');
    shouldBePage.notEmptyDiv.should('not.be.empty');

    shouldBePage.enabledButton.should('be.enabled');
    shouldBePage.disabledButton.should('be.disabled');
  })

  it('"Should HAVE" assertions', () => {
    cy.visit('https://practice.expandtesting.com/assertions/should-have');

    shouldHavePage.classButton.should('have.class', 'class1');

    shouldHavePage.textButton.should('have.text', 'Button 2');

    shouldHavePage.cssDiv.should('have.css', 'color', 'rgb(0, 0, 0)')
        .should('have.css', 'background-color', 'rgb(77, 148, 255)'); // pozna iba RGB farby

    shouldHavePage.lengthUl.should('have.length', 3);

    shouldHavePage.valueInput.should('have.value', 'first name');
  })
})