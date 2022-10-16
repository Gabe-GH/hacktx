const puppeteer = require('puppeteer')
const goToURL = require('./goToURL')

async function scrapeProjectInfo(projectLink){
    const [page, browser, response] = await goToURL(projectLink);

    // error check
    if (response.status() == 404) {
        await browser.close()
        throw new Error({ 'message': 'username not found' })
    }

    const projectInfo = await page.evaluate(() => {
        let imageLinks = []
        const hackathonInfo = {}

        const appName = document.querySelector("#app-title").innerText;
        const images = document.querySelectorAll(".slick-slide:not(.slick-cloned)").forEach(image => {
            let link = image.querySelector('a').getAttribute('href')

            imageLinks.push(link)
        })

        const submissionTo = document.querySelector(".software-list-with-thumbnail li")


        if(submissionTo != null){


            const hackathonLinks = submissionTo.querySelector(".challenge_avatar")

            const hackathonImageLink = hackathonLinks.querySelector("a img").getAttribute('src')
            const hackathonLink = hackathonLinks.querySelector("a").getAttribute('href')
            const hackathonText = submissionTo.querySelector(".software-list-content a").innerText

            hackathonInfo.hackathonImageLink = hackathonImageLink;
            hackathonInfo.hackathonLink = hackathonLink;
            hackathonInfo.hackathonText = hackathonText            
        }

        
        const info = {appName, imageLinks, hackathonInfo}

        return info

    })

    projectInfo.projectLink = projectLink

    await browser.close()

    return projectInfo
}

(async() => {
    const url = 'https://devpost.com/software/w-hvgn70'

   const data = await scrapeProjectInfo(url)
   console.log(data)
})();