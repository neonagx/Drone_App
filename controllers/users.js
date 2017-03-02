'use strict'
const User      = require('../models/User')
const respond   = require('../libs/responder')
const { authInit } = require('../libs/authentication')

const get = (req, res) => {
  // console.log('this is get')
  // res.send({})
  const user = req.query
  console.log('this is user', user)
  const query = User.find({user : req.user}).exec()
  query
    .then(user => respond(res, null, { user }, 'Search result for user'))
    .catch(err => respond(res, err, null, 'Error in searching user'))
}

const show = (req, res) => {
  const id = req.params.id
  console.log('is this going to specific id?', id)
  User.findById(id, function(err, User){
    if(err) res.json({message: 'Cannot find user'})
    res.json(User)
  })
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
  const id = req.params.id
  const updates = req.body.updates
  console.log('going to updates', updates)
  const query  = User.findByIdAndUpdate(id, updates, {new: true}).exec()
  query
    .then(user => respond(res, null, { user }, 'Profile updated sucessfully'))
    .catch(err => respond(res, err, null, 'Error in updating user profile'))
}

const destroy = (req, res) => {
  const id = req.params.id
  console.log('this is delete', id)
  User.findByIdAndRemove({id: id}).exec()
  query
    .then(user => respond(res, null, { user }, 'Profile deleted'))
    .catch(err => respond(res, err, null, 'Error in deleting user'))
}

const findLocation = (req, res, next) => {
  const limit = req.query.limit || 10
  const maxDistance = 6371
  const coords = []
  coords[0] = req.query.longitude
  coords[1] = req.query.latitude

  User.find()
    .near('loc', { center: coords }, { spherical: true }, maxDistance)
    .limit(limit).exec(function(err, location){
    if(err){
      return res.json(500, 'not found')
    } else {
      res.json(200, locations)
    }
  })
}

module.exports = { get, show, create, update, destroy, findLocation}
