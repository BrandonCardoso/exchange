const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()

app.set('views', 'public/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes')(app)

app.listen(config.express.port, () => console.log('Listening on port', config.express.port))
