const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')
const userController = require('../controllers/user')
const eventController = require('../controllers/event')

module.exports = (app) => {
  app.get('favicon.ico', (req, res) => res.status(204))

  app.get('/', homeController.home)

  app.get('/new-event', (req, res) => res.render('new-event'))
  app.post('/new-event', eventController.newEvent)

  app.get('/signup', userController.signup)
  app.post('/signup', userController.registerUser, userController.signup)
  app.get('/login', userController.login)
  app.post('/login', userController.authenticate, userController.login)
  app.get('/logout', userController.logout)
}
