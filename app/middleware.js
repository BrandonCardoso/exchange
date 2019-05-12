const _ = require('lodash')

const User = require('../models').User

function user(req, res, next) {
  const user = _.get(req, 'session.user')
  const roles = _.get(req, 'session.roles')
  _.set(res.locals, 'user', user)
  _.set(res.locals, 'roles', roles)
  _.set(res.locals,
    'userIsOrganizer',
    _.chain(res)
      .get(['locals', 'roles'], [])
      .some((role) => {
        return role.name === 'Organizer' || role.name === 'Admin'
      })
      .value())

  next()
}


function roleRestrict(roles = []) {
  return (req, res, next) => {
    const restricted = _.chain(req)
      .get('session.roles')
      .intersectionWith(roles, (userRole, rolesVal) => {
        return rolesVal === userRole.name
      })
      .size()
      .isEqual(0)
      .value()

    if (restricted) {
      res.send(403)
    } else {
      next()
    }
  }
}

function isLoggedIn(req, res, next) {
  if (_.get(req, 'session.user')) {
    next()
  } else {
    res.redirect('/signup')
  }
}

module.exports = {
  user,
  roleRestrict,
  isLoggedIn
}
