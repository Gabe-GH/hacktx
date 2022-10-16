
const puppeteer = require('puppeteer')
const goToURL = require('./goToURL')

// if a user's profile exists will scrape user's name and username and personal links
// returns an object containing user's name and username along with any of their links
// 
// else if a user's profile isn't found will return an error
// throws an error
async function scrapeUserInfo(userName) {

    const userURI = `https://devpost.com/${userName}`

    const [page, browser, response] = await goToURL(userURI)

    // error check
    if (response.status() == 404) {
        await browser.close()
        throw new Error({ 'message': 'username not found' })
    }

    const userInfo = await page.evaluate(() => {

        const user = document.querySelector("#portfolio-user-name").innerText

        const userLinks = {}

        const userLinkTags = document.querySelectorAll("#portfolio-user-links li")

        // in case of a userLink with no href
        if (userLinkTags != null) {
            userLinkTags.forEach(tag => {
                try{
                    const url = tag.querySelector("a").getAttribute("href")
                    const link = tag.querySelector("a").innerText

                    userLinks[link] = url
                }
                catch(e){
                }  
            })
        }


        const info = {user, userLinks}
        return info
    })
    

    await browser.close();

    return userInfo;
}

module.exports = scrapeUserInfo;