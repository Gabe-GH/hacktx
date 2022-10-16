const scrapeUser = require("./webScraper/scrapeUser");

(async() => {
    const data = await scrapeUser("12trinhle")
    console.log(data.projects)
})();