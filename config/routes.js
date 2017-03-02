'use strict'
const express     = require('express')
const router      = express.Router()
const users       = require('../controllers/users')
const sessions    = require('../controllers/sessions')
const res         = require('../libs/response')
const { authInit, authCheck, forgot, reset } = require('../libs/authentication')

module.exports = () => {

  /*
  PRIMARY ROUTES
  */
  router.route('/users')
    .get(users.get)
    .post(users.create)

  router.route('/users/:id')
    .get(users.show)
    .put(users.update)
    .delete(users.destroy)

  router.route('/sessions')
    .get(sessions.getSession)
    .post(sessions.createSession)

  router.route('/sessions/:id')
    .put(sessions.updateSession)
    .delete(sessions.deleteSession)

  return router

}
