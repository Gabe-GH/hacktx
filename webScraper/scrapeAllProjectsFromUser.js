const scrapeProjectInfo = require('./scrapeProjectInfo')
const scrapeUserInfo = require('./scrapeUserInfo')
const scrapeUserProjectLinks = require('./scrapeUserProjectLinks')

async function scrapeUser(userName){
    let projects = []

    const {user, userLinks} = await scrapeUserInfo(userName)
    const projectLinksArray = await scrapeUserProjectLinks(userName)

    for(projectLink of projectLinksArray){
        const projectInfo = await scrapeProjectInfo(projectLink)

        projects.push(projectInfo)
    }

    info = {user, userLinks, projects}

    return info    
}

module.exports = scrapeUser;