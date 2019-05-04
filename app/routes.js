const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

module.exports = (app) => {
  app.get('favicon.ico', (req, res) => res.status(204))

  app.get('/', (req, res) => { res.render('index') })

  app.get('/signup', userController.signup)
  app.post('/signup', userController.registerUser, userController.signup)
  app.get('/login', userController.login)
  app.post('/login', userController.authenticate, userController.login)
  app.get('/logout', userController.logout)
}
