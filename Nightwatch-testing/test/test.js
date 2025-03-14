module.exports = {
    'My first test': function (browser) {
        browser
            .url('https://www.example.com')
            .waitForElementVisible('body', 1000)
            .assert.titleContains('Example Domain')
            .end();
    }
};
