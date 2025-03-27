const shouldBePage = require('../nightwatch/page-objects/should-be');
const shouldHavePage = require('../nightwatch/page-objects/should-have');
const shouldMatchPage = require('../nightwatch/page-objects/should-match');

module.exports = {
    before: function (browser) {
        browser
            .url('https://practice.expandtesting.com/assertions/should-be')
            .windowMaximize()
            .waitForElementVisible('body', 1000);
    },

    'Should BE assertions': function (browser) {
        browser
            .assert.visible(shouldBePage.elements.visibleButton)
            .assert.not.visible(shouldBePage.elements.invisibleButton)

            .getAttribute(shouldBePage.elements.checkedBox, 'checked', function(result) {
                this.assert.equal(result.value, 'true');
            })
            .getAttribute(shouldBePage.elements.uncheckedBox, 'checked', function(result) {
                this.assert.notEqual(result.value, 'true');
            })

            .getText(shouldBePage.elements.emptyDiv, function(result) {
                this.assert.equal(result.value, '');
            })
            .getText(shouldBePage.elements.notEmptyDiv, function(result) {
                this.assert.notEqual(result.value, '');
            })

            .assert.enabled(shouldBePage.elements.enabledButton)
            .assert.attributeEquals(shouldBePage.elements.disabledButton, 'disabled', 'true');
    },

    'Should HAVE assertions': function (browser) {
        browser
            .url('https://practice.expandtesting.com/assertions/should-have')
            .waitForElementVisible('body', 1000)

            .assert.cssClassPresent(shouldHavePage.elements.classButton, 'class1')
            .assert.containsText(shouldHavePage.elements.textButton, 'Button 2')
            .assert.cssProperty(shouldHavePage.elements.cssDiv, 'color', 'rgba(0, 0, 0, 1)')
            .assert.cssProperty(shouldHavePage.elements.cssDiv, 'background-color', 'rgba(77, 148, 255, 1)') // rgba
            .assert.value(shouldHavePage.elements.valueInput, 'first name');
            browser.elements('css selector', '#ul1 li', function(result) {
            browser.assert.equal(result.value.length, 3);
        });

    },

    'Should MATCH assertions': function (browser) {
        browser
            .url('https://practice.expandtesting.com/assertions/should-match')
            .waitForElementVisible('body', 5000)

            .getText(shouldMatchPage.elements.matchInput, function (result) {
                this.assert.match(result.value, /^[A-Z][a-zA-Z0-9\s]*\.\.\.$/);
            });
    },

    after: function (browser) {
        browser.end();
    },
};
