const dragAndDropPage = require('../nightwatch/page-objects/drag-and-drop');
const fileUploadPage = require('../nightwatch/page-objects/file-upload');
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

                const dataTransfer = new DataTransfer();

                const dragStartEvent = new DragEvent('dragstart', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                element.dispatchEvent(dragStartEvent);

                const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer: dataTransfer
                });
                dropTarget.dispatchEvent(dropEvent);
            }, [color]);
        }

        dragAndDrop('red');
        dragAndDrop('blue');
        dragAndDrop('green');
        browser.execute(function() {
            const element = document.querySelector('.red');
            const dropTarget = document.querySelector('#target');
            const dataTransfer = new DataTransfer();

            element.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer }));
            dropTarget.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer }));
        });

    },

    'Upload file': function (browser) {
        browser.url('https://practice.expandtesting.com/upload')
        browser.setValue(fileUploadPage.elements.fileInput, require('path').resolve('test-files/test.txt'))
        browser.click(fileUploadPage.elements.fileSubmit);
    },

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
