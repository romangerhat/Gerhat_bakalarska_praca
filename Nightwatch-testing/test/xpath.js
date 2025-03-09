const xPathPage = require('../nightwatch/page-objects/xpath');

module.exports = {
    before: function (browser) {
        browser.url('https://practice.expandtesting.com/drag-and-drop-circles')
            .windowMaximize()
            .waitForElementVisible('body', 5000);
    },

    'Drag & Drop': function (browser) {
        function dragAndDrop(color) {
            browser.execute(function(color) {
                const element = document.querySelector(`.${color}`);
                const dropTarget = document.querySelector('#target');

                // Create DataTransfer object
                const dataTransfer = new DataTransfer();

                // Trigger dragstart event on the element
                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                element.dispatchEvent(dragStartEvent);

                // Trigger drop event on the target element
                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                dropTarget.dispatchEvent(dropEvent);
            }, [color]);

            // Verify that the element has been moved to the target
            browser.execute(function(color) {
                return document.querySelector('#target').querySelector(`.${color}`) !== null;
            }, [color], function(result) {
                browser.assert.ok(result.value, `${color} circle is inside #target`);
            });
        }

        // Perform drag and drop for each color and verify
        dragAndDrop('red');
        dragAndDrop('blue');
        dragAndDrop('green');

    },

    'Upload file': function (browser) {
        browser.url('https://practice.expandtesting.com/upload')
        browser.useXpath().setValue(xPathPage.elements.fileInput, require('path').resolve('../public/test.txt'))
        browser.useXpath().click(xPathPage.elements.fileSubmit);
    },

    /* 'Autocomplete': function (browser) {
        browser.url('https://practice.expandtesting.com/autocomplete');
        browser.pause(60000); // Wait for 60 seconds
        browser.setValue(xPathPage.elements.inputField, 'slova');
        browser.keys(browser.Keys.DOWN_ARROW);
        browser.keys(browser.Keys.ENTER);
        browser.click(xPathPage.elements.submit);
        browser.assert.containsText(xPathPage.elements.result, 'You selected: Slovakia');

    }, */

    'Long wait': function (browser) {
        browser
            .url('https://practice.expandtesting.com/slow')
            .waitForElementVisible('//*[@id="result"]/p', 60000);
    },

    /* 'Dropdown': function (browser) {
        browser.url('https://practice.expandtesting.com/dropdown');
        browser.assert.containsText(xPathPage.elements.simpleDropdown, 'Option 1');
        browser.assert.containsText(xPathPage.elements.simpleDropdown, 'Option 2');
        browser.setValue(xPathPage.elements.countryDropdown, 'Slovakia');
    }, */ // NIEJE HOTOVY ANI V CYPRESS

    after: function (browser) {
        browser.end();
    },
};
