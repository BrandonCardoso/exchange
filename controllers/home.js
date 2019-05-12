const _ = require('lodash')
const moment = require('moment')

const User = require('../models').User
const Event = require('../models').Event

function home(req, res, next) {
  Event.getAllGroupedByDay()
    .then((events) => {
      res.render('index', {
        events,
        moment
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = {
  home
}
