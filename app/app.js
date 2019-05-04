const express = require('express')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')(session)
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const config = require('./config')

const app = express()

app.set('views', 'public/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const connection = mysql.createConnection(config.sessionStore)
const sessionStore = new MySqlStore(config.sessionStore)
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))
app.use(middleware.user)

const routes = require('./routes')(app)

app.listen(config.express.port, () => console.log('Listening on port', config.express.port))
