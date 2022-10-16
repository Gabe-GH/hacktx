const scrapeUser = require("./webScraper/scrapeAllProjectsFromUser");

(async() => {
    const data = await scrapeUser("hoaihdinh")
    console.log(data.projects)
})();
