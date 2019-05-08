const _ = require('lodash')

const User = require('../models').User

function user(req, res, next) {
  const user = _.get(req, 'session.user')
  const roles = _.get(req, 'session.roles')
  _.set(res.locals, 'user', user)
  _.set(res.locals, 'roles', roles)
  next()
}

module.exports = {
  user
}
