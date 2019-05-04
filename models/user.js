const _ = require('lodash')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const database = require('../app/database')

const saltRounds = 10

const UserModel = database.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  first_name: {
    type: Sequelize.TEXT('tiny'),
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  last_name: {
    type: Sequelize.TEXT('tiny'),
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  email: {
    type: Sequelize.STRING(256),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.CHAR(60),
    allowNull: false,
    validate: {
      len: [8, 72]
    }
  },
  'signup_date': {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

// hooks
UserModel.beforeCreate(encryptPasswordIfChanged)
UserModel.beforeUpdate(encryptPasswordIfChanged)


// foreign keys


// sync
UserModel.sync().then(() => console.log('User table synced.'))


// functions
function encryptPasswordIfChanged(user, options) {
  if (_.get(user, '_options.isNewRecord') || user.changed('password')) {
    return encryptPassword(_.get(user, 'password'))
      .then((success) => {
        user.password = success
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
      })
  }
}

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(hash)
      }
    })
  })
}

function create(data, options) {
  return UserModel.create(data, options)
}

function authenticate(email, password) {
  return UserModel.findOne({
    where: { email: email },
    attributes: ['user_id', 'first_name', 'password']
  }, {
    raw: true
  })
  .then((user) => {
    if (!user) {
      let err = new Error('User not found')
      err.code = 'USER_NOT_FOUND'
      throw err
    }
    return [user, bcrypt.compare(password, user.password)]
  })
  .spread((user, isSamePassword) => {
    if (!isSamePassword) {
      let err = new Error('Wrong password')
      err.code = 'WRONG_PASSWORD'
      throw err
    }
    return { userId: user.user_id, firstName: user.first_name }
  })
}

module.exports = {
  UserModel,
  create,
  authenticate
}
