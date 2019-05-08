'use strict'
const User = require('../models').User

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      { role_id: 1, name: 'Organizer' },
      { role_id: 2, name: 'Admin' }
    ])
    .then(() => {
      return User.bulkCreate([
        {
          user_id: 1,
          email: 'admin@testaccount.com',
          first_name: 'Admin',
          last_name: 'Account',
          password: 'test1234'
        },
        {
          user_id: 2,
          email: 'organizer@testaccount.com',
          first_name: 'Organizer',
          last_name: 'Account',
          password: 'test1234'
        },
        {
          user_id: 3,
          email: 'user@testaccount.com',
          first_name: 'User',
          last_name: 'Account',
          password: 'test1234'
        }
      ], {
        individualHooks: true
      })
    })
    .then(() => {
      return queryInterface.bulkInsert('User_Roles', [
        { // admin account
          user_id: 1,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        { // organizer account
          user_id: 2,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
      .then(() => {
        return queryInterface.bulkDelete('Users', null, {})
      })
      .then(() => {
        return queryInterface.bulkDelete('User_Roles', null, {})
      })
  }
}
