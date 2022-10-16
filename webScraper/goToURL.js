const puppeteer = require('puppeteer')

// puppeteer will go to a user's devpost profile
//
// returns page for access of the page's elements
// returns browser for ability to close the browser
// returns response for ability to access the page's response code for error handling
async function goToURL(URL) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(URL);

    return [page, browser, response]
}

module.exports = goToURL;