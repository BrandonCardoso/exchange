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
          event.numParticipants = 0

          _.each(event.groups, (group) => {
            event.userIsParticipating = event.userIsParticipating ||
              _.some(group.participants, (participant) => participant.user_id === activeUserId)

            event.numParticipants += group.participants.length
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
