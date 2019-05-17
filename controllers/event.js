const _ = require('lodash')
const moment = require('moment')

const User = require('../models').User
const Event = require('../models').Event
const Group = require('../models').Group

function newEvent(req, res) {
  const defaultNumGroups = 2
  const maxNumGroups = 4

  res.render('new-event', {
    moment,
    numGroups: defaultNumGroups,
    maxNumGroups
  })
}

function createNewEvent(req, res, next) {
  const eventDate = _.get(req, 'body.eventDate')
  const startDateTime = moment(eventDate + ' ' + _.get(req, 'body.eventStartTime'))
  const endDateTime = moment(eventDate + ' ' + _.get(req, 'body.eventEndTime'))

  const eventLocation = JSON.parse(_.get(req, 'body.eventLocation'))
  const location = {
    room: _.get(req, 'body.eventRoom'),
    address: eventLocation.value,
    latlng: eventLocation.latlng
  }

  Event.create({
    name: _.get(req, 'body.eventName'),
    description: _.get(req, 'body.eventDescription'),
    start_time: startDateTime.format(),
    end_time: endDateTime.format(),
    location: location,
    organizer_id: _.get(res, 'locals.user.user_id')
  }, {
    raw: true
  })
  .then((event) => {
    const groupPromises = []
    const numGroups = _.get(req, 'body.eventNumGroups', 0)
    for (let i = 0; i < numGroups; i += 1) {
      groupPromises.push(Group.create({
        name: _.get(req, 'body.eventGroupName' + i),
        max_participants: _.get(req, 'body.eventGroupMaxParticipants' + i),
        event_id: event.event_id
      }))
    }

    return Promise.all(groupPromises)
  })
  .then((groups) => {
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error creating event:', err)
    next()
  })
}

function eventDetails(req, res) {
  Event.findOne({
    where: {
      'event_id': _.get(req, 'params.id'),
    },
    include: [{
      model: User,
      attributes: ['user_id', 'first_name', 'last_name']
    }, {
      model: Group,
      attributes: ['group_id', 'name', 'max_participants'],
      include: [{
        model: User,
        attributes: ['user_id', 'first_name', 'last_name'],
        through: {
          attributes: []
        }
      }]
    }]
  })
  .then((event) => {
    const userId = _.get(req, 'session.user.user_id')

    let userGroup = -1
    const userInEvent = _.chain(event)
      .get('Groups')
      .some((group) => {
        return _.some(group.Users, (user) => {
          if (user.user_id === userId) {
            userGroup = group.group_id
            return true
          } else {
            return false
          }
        })
      })
      .value()

    event.location = JSON.parse(event.location)

    res.render('event-details', {
      moment,
      event,
      userGroup,
      userInEvent
    })
  })
  .catch((err) => {
    console.error('Error getting event details:', err)
  })
}

function joinGroup(req, res) {
  const groupId = _.get(req, 'params.groupId')
  const userId = _.get(req, 'session.user.user_id')

  return Group.findOne({
    where: { 'group_id': groupId },
  })
  .then((group) => {
    return group.addUser(userId)
  })
  .then((participant) => {
    res.redirect('back')
  })
  .catch((err) => {
    console.error(err)
  })
}

function leaveGroup(req, res) {
  const groupId = _.get(req, 'params.groupId')
  const userId = _.get(req, 'session.user.user_id')

  return Group.findOne({
    where: { 'group_id': groupId },
  })
  .then((group) => {
    return group.removeUser(userId)
  })
  .then((participant) => {
    res.redirect('back')
  })
  .catch((err) => {
    console.error(err)
  })
}

module.exports = {
  newEvent,
  createNewEvent,
  eventDetails,
  joinGroup,
  leaveGroup
}
