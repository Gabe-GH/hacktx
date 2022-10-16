const puppeteer = require('puppeteer')
const goToURL = require('./goToURL')

// if a user's profile function will scrape each of the user's project links
// returns an array of strings containing links to each project
// 
// else if a user's profile isn't found will return an error
// throws an error
async function scrapeUserProjectLinks(userName) {

    const userURI = `https://devpost.com/${userName}`

    const [page, browser, response] = await goToURL(userURI)

    // error check
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

(async () => {
    try {
        const data = await scrapeUserProjectLinks('12trinhle')
        console.log(data)
    }
    catch (e) {
        console.log("error")
    }

})();

module.exports = scrapeUserProjectLinks;