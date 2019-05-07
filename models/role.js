'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false
    }
  }, {})

  Role.associate = (models) => {
    Role.hasMany(models.User_Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE'
    })
  }

  return Role
}
