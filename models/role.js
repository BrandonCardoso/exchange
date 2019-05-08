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
  }, {
    underscored: true,
    timestamps: false
  })

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'User_Roles',
      foreignKey: 'role_id',
      onDelete: 'CASCADE'
    })
  }

  return Role
}
