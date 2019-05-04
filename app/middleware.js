const _ = require('lodash')

const UserModel = require('../models/user').UserModel

function user(req, res, next) {
    const userId = _.get(req, 'session.user_id')
    if (userId) {
        const user = UserModel.findOne({ where: { user_id: userId }}, { raw: true })
        .then(user => {
            _.set(res.locals, 'user', user)
            next()
        })
    } else {
        next()
    }
}

module.exports = {
  user
}
