const express = require('express')
const router = express.Router()

const middleware = require('./middleware')
const roleRestrict = middleware.roleRestrict
const isLoggedIn = middleware.isLoggedIn

const homeController = require('../controllers/home')
const userController = require('../controllers/user')
const eventController = require('../controllers/event')

module.exports = (app) => {
  app.use(middleware.user)

  app.get('favicon.ico', (req, res) => res.status(204))

  app.get('/', homeController.home)

  app.get('/new-event',
    roleRestrict(['Organizer', 'Admin']),
    eventController.newEvent)
  app.post('/new-event',
    roleRestrict(['Organizer', 'Admin']),
    eventController.createNewEvent,
    eventController.newEvent)

  app.get('/event/:id/:name?', isLoggedIn, eventController.eventDetails)

  app.get('/signup', userController.signup)
  app.post('/signup', userController.registerUser, userController.signup)
  app.get('/login', userController.login)
  app.post('/login', userController.authenticate, userController.login)
  app.get('/logout', userController.logout)
}
