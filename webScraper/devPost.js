import puppeteer from 'puppeteer'

async function scrapeUserProjectLinks(userName) {

    const userURI = `https://devpost.com/${userName}`;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(userURI);

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