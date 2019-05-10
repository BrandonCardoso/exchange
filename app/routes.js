const express = require('express')
const router = express.Router()

const middleware = require('./middleware')
const roleRestrict = middleware.roleRestrict

const homeController = require('../controllers/home')
const userController = require('../controllers/user')
const eventController = require('../controllers/event')

module.exports = (app) => {
  app.use(middleware.user)

  app.get('favicon.ico', (req, res) => res.status(204))

  app.get('/', homeController.home)

  app.get('/new-event',
    roleRestrict(['Organizer', 'Admin']),
    (req, res) => res.render('new-event'))
  app.post('/new-event',
    roleRestrict(['Organizer', 'Admin']),
    eventController.newEvent)

  app.get('/signup', userController.signup)
  app.post('/signup', userController.registerUser, userController.signup)
  app.get('/login', userController.login)
  app.post('/login', userController.authenticate, userController.login)
  app.get('/logout', userController.logout)
}
