const passwords = require('../../public/passwords.json');
const passwordPage = require('../nightwatch/page-objects/password');

module.exports = {
    '@tags': ['password-validator'],

    before(browser) {
        browser.url('https://practice.expandtesting.com/secure-password-checker');
    },

    'Password Validator': function (browser) {
        const passwordPage = browser.page.password();
        const passwordKeys = Object.keys(passwords);

        passwordKeys.forEach((key) => {
            const { value, validatorsActive, validatorsNonActive } = passwords[key];

            passwordPage.clearValue('@passwordField').setValue('@passwordField', value);

            validatorsActive.forEach((validator) => {
                passwordPage.expect.element(`@${validator}`).to.be.visible;
            });

            validatorsNonActive.forEach((validator) => {
                passwordPage.expect.element(`@${validator}`).to.not.be.visible;
            });
        });

        browser.end();
    }
};
