const express = require('express')
const router = express.Router()

module.exports = (app) => {
  app.get('favicon.ico', (req, res) => res.status(204))

  app.get('/', (req, res) => { res.render('index') })
}
