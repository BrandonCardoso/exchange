'use strict'
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('Group', {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_participants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    underscored: true,
  })

  group.associate = function(models) {
    group.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
      allowNull: false,
      onDelete: 'CASCADE'
    })

    group.belongsToMany(models.User, {
      through: 'Participants',
      as: 'participants',
      foreignKey: 'group_id',
      onDelete: 'CASCADE'
    })
  }

  return group
}
