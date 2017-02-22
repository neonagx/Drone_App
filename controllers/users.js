'use strict'
const User      = require('../models/User')

const get = (req, res) => {
  const id = req.query.id
  const query = User.findById(id).exec()
  query
    .then(user => respond(res, ))
}
