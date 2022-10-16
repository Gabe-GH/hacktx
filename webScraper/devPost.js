const puppeteer = require('puppeteer')

async function goToURL(userName){
    const userURI = `https://devpost.com/${userName}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(userURI);

    return [page, browser, response]
}

async function scrapeUserProjectLinks(userName) {
    
    const [page, browser, response] = await goToURL(userName)

    if(response.status() == 404){
        await browser.close()
        throw new Error({'message': 'username not found'})
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