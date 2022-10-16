const scrapeProjectInfo = require('./scrapeProjectInfo')
const scrapeUserInfo = require('./scrapeUserInfo')
const scrapeUserProjectLinks = require('./scrapeUserProjectLinks')

// IMPORTANT: THIS IS THE FUNCTION YOU WILL BE USING THAT IMPLEMENTS ALL OF THE SCRAPERS COMBINED
//            SEE 'example.js' for a test output

// @RETURN type: object
// @RETURN MEMBERS {
//      user: string
//      userLinks: object{
//          linksource: String
//      }
//      projects: array[
//          appName: String,
//          appDescription: String
//          imageLinks: Array [
//              String
//          ]
//          hackathonInfo: Object {
//              hackathonImageLink: String
//              hackathonLink: String
//              hackathonName: String
//          }
//          appDetailsText: String
//          builtWith: Array[
//              String
//          ]
//          gitHubRepo: String
//          projectLink: String
//      ]
//}

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