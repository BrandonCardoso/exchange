'use strict'
module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define('Participant', {

  }, {
    underscored: true
  })

  participant.associate = (models) => {
      participant.belongsTo(models.Group, { foreignKey: 'group_id' })
      participant.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return participant
}
