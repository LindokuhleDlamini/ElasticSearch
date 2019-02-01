const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

require('./routes/elastic-search.js')(app);
app.listen(PORT, () => console.info(`Server running on ${PORT}`))