'use strict'
const User      = require('../models/User')
const respond   = require('../libs/response')

const get = (req, res) => {
  const id = req.query.id
  const query = User.findById(id).exec()
  query
    .then(user => respond(res, null, { user }, 'Search result for user'))
    .catch(err => respond(res, err, null, 'Error in searching user'))
}

// const create = (req, res) => {
//   const user = new User({ email: req.body.email })
//   user.password
// }

const update = (req, res) => {
  const updates = req.body.updates
  const query  = User.findByIdAndUpdate(req.currentUser._id, updates, {new: true}).exec()
  query
    .then(user => respond(res, null, { user }, 'Profile updated sucessfully'))
    .catch(err => respond(res, err, null, 'Error in updating user profile'))
}

const destroy = (req, res) => {
  const id = req.query.id
  const query = User.findByIdAndRemove(id).exec()
  query
    .then(user => respond(res, null, {}, 'User successfully removed from DB'))
    .catch(err => respond(res, err, null, 'Error in removing user'))
}

module.exports = { get, update, destroy}
