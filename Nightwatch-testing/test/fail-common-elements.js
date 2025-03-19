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

            browser.execute(function(color) {
                return document.querySelector('#target').querySelector(`.${color}`) == null; // malo by byt !==
            }, [color], function(result) {
                browser.verify.ok(result.value, `${color} circle is inside #target`);
            });
        }

        dragAndDrop('red');
        dragAndDrop('blue');
        dragAndDrop('green');
    },

    'Upload file': function (browser) {
        browser.url('https://practice.expandtesting.com/upload')
        browser.setValue(fileUploadPage.elements.fileInput, require('path').resolve('../public/tst.txt')) // zly subor
        browser.click(fileUploadPage.elements.fileSubmit);
    },

    'Long wait': function (browser) {
        browser
            .url('https://practice.expandtesting.com/slow')
            .verify.visible('.alert', 'Checking if .alert is visible');

    },

    'Dropdown': function (browser) {
        browser
            .url('https://practice.expandtesting.com/dropdown')
            .verify.containsText(dropDownPage.elements.simpleDropdown, 'Option 1')
            .verify.containsText(dropDownPage.elements.simpleDropdown, 'Option 3') // moznost neexistuje
            .setValue(dropDownPage.elements.countryDropdown, 'Slovakia');
    },

    after: function (browser) {
        browser.end();
    },
};
