'use strict'
const express     = require('express')
const router      = express.Router()
const users       = require('./controllers/users')
const {
  handleSuccess,
  handleError
}                 = require('./libs/response')

module.exports = () => {

/*
PRIMARY ROUTES
*/
router.route('/user')
  .post(users.create)
  .put(users.update)
  .get(users.get)

}
