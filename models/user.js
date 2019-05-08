'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        len: [8, 72]
      }
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    underscored: true,
    hooks: {
      beforeCreate: encryptPassword,
      beforeUpdate: encryptPasswordIfChanged
    }
  })

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'User_Roles',
      onDelete: 'CASCADE'
    })
  }

  // class functions
  User.authenticate = function(email, password) {
    return this.findOne({
      where: { email },
      attributes: ['user_id', 'first_name', 'password']
    }, {
      raw: true
    })
      .then((user) => {
        return [user, user.authenticate(password)]
      })
      .spread((user, authenticated) => {
        if (!authenticated) {
          let err = new Error('Wrong password.')
          err.code = 'WRONG_PASSWORD'
          throw err
        }
        return { userId: user.user_id, firstName: user.first_name }
      })
  }

  // instance functions
  User.prototype.authenticate = function(password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}

function encryptPasswordIfChanged(user, options) {
  if (_.get(user, '_options.isNewRecord') || user.changed('password')) {
    return encryptPassword(user)
  }
}

function encryptPassword(user, options) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(hash)
      }
    })
  })
    .then((success) => {
      user.password = success
    })
    .catch((err) => {
      if (err) {
        console.log(err)
      }
    })
}
