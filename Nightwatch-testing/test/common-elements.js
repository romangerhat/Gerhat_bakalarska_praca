const dragAndDropPage = require('../nightwatch/page-objects/drag-and-drop');
const fileUploadPage = require('../nightwatch/page-objects/file-upload');
const autoCompletePage = require('../nightwatch/page-objects/autocomplete');
const dropDownPage = require('../nightwatch/page-objects/dropdown');

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

    /* 'Drag & Drop': function (browser) {
        browser
            .execute(function() {
                const redCircle = document.querySelector('.red'); // nefunguje s page objectom lol :D
                const dropTarget = document.querySelector('#target');

                // Create DataTransfer object
                const dataTransfer = new DataTransfer();

                // Trigger dragstart event on red circle
                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                redCircle.dispatchEvent(dragStartEvent);

                // Trigger drop event on target element
                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                dropTarget.dispatchEvent(dropEvent);

            })
            .execute(function() {
                const redCircle = document.querySelector('.blue');
                const dropTarget = document.querySelector('#target');

                // Create DataTransfer object
                const dataTransfer = new DataTransfer();

                // Trigger dragstart event on red circle
                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                redCircle.dispatchEvent(dragStartEvent);

                // Trigger drop event on target element
                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                dropTarget.dispatchEvent(dropEvent);
            })
            .execute(function() {
                const redCircle = document.querySelector('.green');
                const dropTarget = document.querySelector('#target');

                // Create DataTransfer object
                const dataTransfer = new DataTransfer();

                // Trigger dragstart event on red circle
                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                redCircle.dispatchEvent(dragStartEvent);

                // Trigger drop event on target element
                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                dropTarget.dispatchEvent(dropEvent);
            })
    }, */

    'Upload file': function (browser) {
        browser.url('https://practice.expandtesting.com/upload')
        browser.setValue(fileUploadPage.elements.fileInput, require('path').resolve('../public/test.txt'))
        browser.click(fileUploadPage.elements.fileSubmit);
    },

    /* 'Autocomplete': function (browser) {
        browser
            .url('https://practice.expandtesting.com/autocomplete')
            .setValue(autoCompletePage.elements.inputField, 'slova')
            .keys(browser.Keys.DOWN_ARROW)
            .keys(browser.Keys.ENTER)
            .click(autoCompletePage.elements.submit)
            .assert.containsText(autoCompletePage.elements.result, 'You selected: Slovakia');
    }, */

    'Long wait': function (browser) {
        browser
            .url('https://practice.expandtesting.com/slow')
            .waitForElementVisible('.alert', 60000);
    },

    'Dropdown': function (browser) {
        browser
            .url('https://practice.expandtesting.com/dropdown')
            .assert.containsText(dropDownPage.elements.simpleDropdown, 'Option 1')
            .assert.containsText(dropDownPage.elements.simpleDropdown, 'Option 2')
            .setValue(dropDownPage.elements.countryDropdown, 'Slovakia');
    },

    after: function (browser) {
        browser.end();
    },
};
