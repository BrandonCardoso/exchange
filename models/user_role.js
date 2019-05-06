const Sequelize = require('sequelize')

const database = require('../app/database')
const UserModel = require('./user').UserModel
const RoleModel = require('./role').RoleModel

const User_RoleModel = database.define('user_role')

// foreign keys
User_RoleModel.belongsTo(UserModel, { as: user_id })
User_RoleModel.belongsTo(RoleModel, { as: role_id })

// sync
User_RoleModel.sync().then(() => console.log('User_Role table synced.'))

module.exports = {
  User_RoleModel
}
