const Sequelize = require('sequelize')

const database = require('../app/database')

const RoleModel = database.define('role', {
  role_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT('tiny'),
    allowNull: false
  }
})

// sync
RoleModel.sync().then(() => console.log('Role table synced.')).then(() => {
  RoleModel.BulkInsert([ { { name: 'Organizer' }, { name: 'Admin' } ])
})

module.exports = {
  RoleModel
}
