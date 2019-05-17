const _ = require('lodash')
const moment = require('moment')

const User = require('../models').User
const Event = require('../models').Event

function home(req, res, next) {
  Event.getAllGroupedByDay()
    .then((eventsByDay) => {
      const activeUserId = _.get(req, 'session.user.user_id')

      _.each(eventsByDay, (day) => {
        _.each(day.events, (event) => {
          _.each(event.Groups, (group) => {
            event.userIsParticipating = _.some(group.participants, (participant) => {
              return participant.user_id === activeUserId
            })
          })
        })
      })

      res.render('index', {
        events: eventsByDay,
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
