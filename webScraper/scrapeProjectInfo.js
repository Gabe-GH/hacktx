const puppeteer = require('puppeteer')
const goToURL = require('./goToURL')

async function scrapeProjectInfo(projectLink) {
    const [page, browser, response] = await goToURL(projectLink);

    // error check
    if (response.status() == 404) {
        await browser.close()
        throw new Error({ 'message': 'username not found' })
    }

    const projectInfo = await page.evaluate(() => {

        // variables init
        let imageLinks = []
        const hackathonInfo = {}

        // app header info
        const appName = document.querySelector("#app-title").innerText
        const appDescription = document.querySelector("#software-header p").innerText

        // image links
        const images = document.querySelectorAll(".slick-slide:not(.slick-cloned)")



        if (images.length != 0) {
            images.forEach(image => {

                // in case of video
                if (image.querySelector('.flex-video')) {
                    const videoSrc = image.querySelector('.flex-video .video-embed').getAttribute("src")

                    imageLinks.push(videoSrc)
                }
                else {
                    let link = image.querySelector('a').getAttribute('href')

                    imageLinks.push(link)
                }

            })
        }

        // hackathons submitted to info
        const submissionTo = document.querySelector(".software-list-with-thumbnail li")

        if (submissionTo != null) {
            const hackathonLinks = submissionTo.querySelector(".challenge_avatar")

            const hackathonImageLink = hackathonLinks.querySelector("a img").getAttribute('src')
            const hackathonLink = hackathonLinks.querySelector("a").getAttribute('href')
            const hackathonName = submissionTo.querySelector(".software-list-content a").innerText

            hackathonInfo.hackathonImageLink = hackathonImageLink;
            hackathonInfo.hackathonLink = hackathonLink;
            hackathonInfo.hackathonName = hackathonName;
        }

        // app details info
        let appDetailsText = ''

        const appDetails = document.querySelectorAll("#app-details-left")[0].children[1].querySelectorAll("p")

        if (appDetails.length != 0) {
            appDetails.forEach(text => {
                appDetailsText += text.innerText
            })
        }

        // built with info
        const builtWith = []

        const builtWithTags = document.querySelectorAll("#built-with ul li")
        if (builtWithTags.length != 0) {
            builtWithTags.forEach(tag => {
                builtWith.push(tag.innerText);
            })
        }

        // github repo info
        const tryItOutLinks = document.querySelectorAll(".app-links ul li")
        let gitHubRepo = "";

        if (tryItOutLinks.length != 0) {
            tryItOutLinks.forEach(li_tag => {
                if (li_tag.querySelector("a span").innerText == "GitHub Repo")
                    gitHubRepo += li_tag.querySelector("a").getAttribute("href")
            })
        }

        // combine all info into an object
        const info = { appName, appDescription, imageLinks, hackathonInfo, appDetailsText, builtWith, gitHubRepo }

        return info

    })

    // add project link to overall project object
    projectInfo.projectLink = projectLink

    await browser.close()

    return projectInfo
}

module.exports = scrapeProjectInfo;