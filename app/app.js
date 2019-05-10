const express = require('express')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')(session)
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const config = require('../config/config')

const app = express()

app.set('views', 'public/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

process.env.ENV = 'development'
const connection = mysql.createConnection(config[process.env.ENV])
const sessionStore = new MySqlStore(config[process.env.ENV])
app.use(session({
  secret: config[process.env.ENV].sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

const routes = require('./routes')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port', port))
