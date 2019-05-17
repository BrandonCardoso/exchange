'use strict'
const _ = require('lodash')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT(),
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false
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
    underscored: true
  })

  event.associate = (models) => {
    event.belongsTo(models.User, {
      foreignKey: 'organizer_id',
      onDelete: 'SET NULL',
    })

    event.hasMany(models.Group, {
      foreignKey: 'event_id'
    })
  }

  // class functions
  event.getAllGroupedByDay = function () {
    return event.findAll({
      order: sequelize.col('start_time'),
      include: [{
        model: sequelize.models.Group,
        attributes: ['group_id'],
        include: [{
          model: sequelize.models.User,
          as: 'participants',
          attributes: ['user_id']
        }]
      }]
    }).then((events) => {
      let day = 0
      return _.chain(events)
        .reduce((result, event, index) => {
          const eventMoment = moment(event.start_time)
          let sameDay = true
          if (index > 0) {
            sameDay = eventMoment.isSame(result[day].date, 'day')
          }

          if (!sameDay) {
            day += 1
          }

          event.location = JSON.parse(event.location)
          event.urlSafeName = getURLSafeName(event)

          if (index == 0 || !sameDay) {
            result[day] = {
              date: eventMoment,
              events: [event]
            }
          } else if (sameDay) {
            result[day].events.push(event)
          }
          return result
        }, [])
        .map((day) => {
          day.date = day.date.format('dddd, MMMM D')
          return day
        })
        .value()
    })
  }

  return event
}

function getURLSafeName(event) {
  return (event.name).replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/ /g,'-')
}
