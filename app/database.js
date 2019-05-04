const Sequelize = require('sequelize')
const config = require('./config')

const database = new Sequelize('exchange', config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

authenticate(database)

function authenticate(database) {
  database.authenticate()
    .then(() => {
      console.log('Connection has been established successfully:', database.config.database)
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
}

module.exports = database
