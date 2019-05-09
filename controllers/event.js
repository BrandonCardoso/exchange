const _ = require('lodash')

const User = require('../models').User
const Event = require('../models').Event

function newEvent(req, res) {
  console.log('coordinates:', JSON.parse(_.get(req, 'body.eventlocation')))

  Event.create({
    name: _.get(req, 'body.eventname'),
    description: _.get(req, 'body.eventdescription'),
    start_time: _.get(req, 'body.eventstart'),
    end_time: _.get(req, 'body.eventend'),
    location: {
      type: 'Point',
      coordinates: JSON.parse(_.get(req, 'body.eventlocation'))
    },
    organizer_id: _.get(res, 'locals.user.user_id')
  })
  .then((event) => {
    console.log(event)
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error creating event:', err)
    res.render('new-event')
  })
}

module.exports = {
  newEvent
}
