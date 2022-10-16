const puppeteer = require('puppeteer')

// puppeteer will go to a user's devpost profile
//
// returns page for access of the page's elements
// returns browser for ability to close the browser
// returns response for ability to access the page's response code for error handling
async function goToURL(userName) {
    const userURI = `https://devpost.com/${userName}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(userURI);

    return [page, browser, response]
}

// if a user's profile function will scrape each of the user's project links
// returns an array of strings containing links to each project
// 
// else if a user's profile isn't found will return an error
// throws an error
async function scrapeUserProjectLinks(userName) {

    const [page, browser, response] = await goToURL(userName)

    if (response.status() == 404) {
        await browser.close()
        throw new Error({ 'message': 'username not found' })
    }

    const scrapeProjects = await page.evaluate(() => {

        const softwareEntries = document.querySelectorAll(".link-to-software");
        let projects = []

        softwareEntries.forEach((project) => {
            projects.push(project.getAttribute('href'))
        })

        return projects;
    })

    await browser.close();
    return scrapeProjects;
}

module.exports = scrapeUserProjectLinks;