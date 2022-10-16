const express = require('express')
const scrapeUser = require('../webScraper/scrapeUser')
const app = express()
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:username', async (req, res) => {
    try{
        const userName = req.params.username
        const data = await scrapeUser(userName)
        res.json(data)
    }catch(e){
        res.status(404).json({
            'Error': 'user not found'
        })
    }
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})