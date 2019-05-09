const _ = require('lodash')

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
  Event.findAll({ raw: true })
    .then((events) => {
      _.set(res.locals, 'events', events)
      _.set(res.locals, 'userIsOrganizer', isOrganizer(res))
      res.render('index')
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = {
  home
}
