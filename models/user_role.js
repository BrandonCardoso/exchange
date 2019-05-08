'use strict'
module.exports = (sequelize, DataTypes) => {
  const User_Role = sequelize.define('User_Role', {
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
    underscored: true
  })

  User_Role.associate = function(models) {
    User_Role.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })

    User_Role.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE'
    })
  }

  return User_Role
}
