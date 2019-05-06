const _ = require('lodash')

const User = require('../models/User')

function login(req, res) {
  res.render('login')
}

function logout(req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      res.redirect('/')
    })
  }
}

function signup(req, res) {
  res.render('signup')
}

function authenticate(req, res, next) {
  User.authenticate(_.get(req, 'body.useremail'), _.get(req, 'body.userpassword'))
    .then((userInfo) => {
      _.set(req.session, 'user_id', userInfo.userId)
      _.set(req.session, 'user_first_name', userInfo.firstName)
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      if (err.code === 'USER_NOT_FOUND') {
        _.set(res.locals, 'USER_NOT_FOUND', true)
      } else if (err.code === 'WRONG_PW') {
        _.set(res.locals, 'WRONG_PW', true)
      }
      next()
    })
}

function registerUser(req, res, next) {
  const email = _.get(req, 'body.useremail')

  User.create({
    email: _.size(email) > 0 ? email : null,
    password: _.get(req, 'body.userpassword'),
    first_name: _.get(req, 'body.userfirstname'),
    last_name: _.get(req, 'body.userlastname')
  }, {
    raw: true
  })
  .then((user) => {
    _.set(req.session, 'user_id', user.user_id)
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    _.forEach(err.errors, (error) => {
      if (error.path === 'email' && error.validatorKey === 'not_unique') {
        _.set(res.locals, 'emailInUse', true)
      } else if (error.path === 'email' && error.validatorKey == 'isEmail') {
        _.set(res.locals, 'invalidEmail', true)
      } else if (error.path === 'password' && error.validatorKey === 'len') {
        _.set(res.locals, 'passwordCheckLength', true)
      }
    })
  })
}

module.exports = {
  login,
  logout,
  signup,
  registerUser,
  authenticate
}
