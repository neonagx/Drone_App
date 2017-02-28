'use strict'
const User      = require('../models/User')
const respond   = require('../libs/response')
const { authInit } = require('../libs/authentication')

const get = (req, res) => {
  // console.log('this is get')
  // res.send({})
  const user = req.query
  console.log(user)
  const query = User.find({user : req.user}).exec()
  query
    .then(user => respond(res, null, { user }, 'Search result for user'))
    .catch(err => respond(res, err, null, 'Error in searching user'))
}

const create = (req, res) => {
  const user = new User({ email: req.body.email })
  console.log(user)
  user.password = user.generateHash(req.body.password)
  const validEmail = /\S+@\S+\.\S+/
  if(validEmail.test(user.email) && user.password) {
    user.save()
      .then(user => {
          respond(res, {}, null, 'Account created')
      })
      .catch(err => {
        let message = "Error in signing up"
        if(err.code && err.code == 11000) {
          message = "An account with that email is already signed up"
        }
        respond(res, err, null, message)
      })
  } else {
    respond(res, {}, null, 'Please check that the email & password are entered in correctly')
  }
}

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

const findLocation = (req, res, next) => {
  const limit = req.query.limit || 10
  const maxDistance = req.query.distance || 8
  maxDistance = 6371
  const coords = []
  coords[0] = req.query.longitude
  coords[1] = req.query.latitude

  Location.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    }
  }).limit(limit).exec(function(err, location){
    if(err){
      return res.json(500, 'not found')
    } else {
      res.json(200, locations)
    }
  })
}

module.exports = { get, create, update, destroy, findLocation}
