const express = {
  port: process.env.EXPRESS_PORT || 3000
}

const sessionSecret = '123123123'
const sessionStore = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'session',
}

module.exports = {
  express,
  sessionStore,
  sessionSecret
}
