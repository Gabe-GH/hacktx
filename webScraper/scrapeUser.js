const stringSimilarity = require("string-similarity");

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

    projectArray = info.projects;

    for(let i = 0; i < projectArray.length; i++){
        let maxSimilarityRatio = 0;
        for(let j = 0; j < projectArray.length; j++){
            if(i != j){
                let tempRatio = stringSimilarity.compareTwoStrings(projectArray[i].appDetailsText, projectArray[j].appDetailsText)
                if(maxSimilarityRatio < tempRatio)
                    maxSimilarityRatio = tempRatio
            }
        }

        info.projects[i].maxSimilarityRatio = maxSimilarityRatio
    }

    return info
}

module.exports = scrapeUser;