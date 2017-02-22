'use strict'
const express     = require('express')
const router      = express.Router()
const users       = require('./controllers/users')
const res         = require('../libs/response')
const { authInit, authCheck, forgot, reset } = require('../libs/authentication')

module.exports = () => {

  /*
  PRIMARY ROUTES
  */
  router.route('/users')
    .post(users.create)
    .put(users.update)
    .get(users.get);

  router.route('/sessions')
    .get(authCheck, sessions.get)
    .post(authCheck, sessions.create)
    .put(authCheck, sessions.update)

  return router

}
