describe('Common website elements', function () {
    let passwordPage;
    const passwords = require('../../public/passwords.json');

    before(browser => {
        passwordPage = browser.page.password();
        browser.url('https://practice.expandtesting.com/secure-password-checker');
    });

    it('Password validator', function (browser) {
        const passwordKeys = Object.keys(passwords);

        passwordKeys.forEach(key => {
            const { value, validatorsActive, validatorsNonActive } = passwords[key];

            passwordPage.clearValue('@passwordField').setValue('@passwordField', value);

            validatorsActive.forEach(validator => {
                passwordPage.expect.element(`@${validator}`).to.be.visible;
            });

            validatorsNonActive.forEach(validator => {
                passwordPage.expect.element(`@${validator}`).to.not.be.visible;
            });
        });

        browser.end();
    });
});
