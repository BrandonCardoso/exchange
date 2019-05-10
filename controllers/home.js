const _ = require('lodash')
const moment = require('moment')

const User = require('../models').User
const Event = require('../models').Event

function isOrganizer(res) {
  return _.chain(res)
      .get(['locals', 'roles'], [])
      .some((role) => {
        return role.name === 'Organizer' || role.name === 'Admin'
      })
      .value()
}

function home(req, res, next) {
  Event.getAllGroupedByDay()
    .then((events) => {
      res.render('index', {
        events,
        userIsOrganizer: isOrganizer(res),
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
