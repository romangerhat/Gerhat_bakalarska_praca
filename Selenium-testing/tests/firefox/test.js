const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver'); // Make sure geckodriver is required

// Explicitly set the path to geckodriver (if necessary)
const pathToGeckoDriver = require('geckodriver').path;

async function runTest() {
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new (require('selenium-webdriver').firefox.Options)())
        .build();

    try {
        await driver.get('https://www.google.com');
        await driver.wait(until.titleContains('Google'), 10000);
        let title = await driver.getTitle();
        console.log('Page title: ' + title);

        if (title === 'Google') {
            console.log('Test Passed!');
        } else {
            console.log('Test Failed!');
        }
    } catch (err) {
        console.error('Error: ' + err);
    } finally {
        await driver.quit();
    }
}

runTest();
