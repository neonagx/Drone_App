'use strict'
const User      = require('../models/User')
const Session   = require('../models/Session')
const respond   = require('./responder')
const jwt       = require('jsonwebtoken')
// const agenda    = require('')

const authInit = (req, res) => {
  const email = req.body.email
  console.log('this is email', email)
  const query = User.findById(id)
  console.log('user', req.body.user)
  query
    .then(user => {
      if(!user) {
        respond(res, {}, null, 'An account with that email has to yet sign up')
      } else if(!user.validPassword(req.body.password)) {
        respond(res, {}, null, 'Wrong Password')
      } else {
        user.addSession()
          .then(user => {
            const token = signToken(user)
            Session.findByUser(user._id)
              .then(session => respond(res, null, {session, token, user}, `Welcome back, ${user.firstName}`))
              .catch(err => respond(res, null, {token, user}, `Welcome back ${user.firstName}`))
          })
          .catch(err => respond(res, err, null, 'Error in updating user session'))
      }
    })
    .catch(err => respond(res, err, null, 'Something went wrong with sign-in'))
}

const authCheck = (req, res, next) => {
  if(req.route.path == '/users' && !req.body.updates) {
    next()
  } else {
    const token = req.headers['x-access-token']
      if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if(err){
            respond(res, err, null, 'Authentication token invalid')
          } else {
            req.currentUser = decoded._doc
            next()
          }
        })
      } else {
        respond(res, {}, null, 'Request missing x-access-token')
      }
  }
}

const resignToken = (user) => {
  return signToken(user)
}

const signToken = (user) => {
  const day = 3600 * 24
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: day })
}

const forgot = (req, res) => {
  User.forgotPassword(req.body)
    .then(user => {
      agenda.now('reset_password_email', {
        user: JSON.stringify({email: user.email, forgotPw: user.forgotPw})
      })
      respond(res, null, {}, 'forgotPw token Sent')
    })
    .catch(err => respond(res, {}, null, 'Problem in requesting a forgotPw token'))
}

const reset = (req, res, next) => {
  User.resetPassword(req.body)
    .then(user => {
      req.body.email = user.email
      next()
    })
    .catch(err => respond(res, {}, null, 'Problem in resetting password'))
}

module.exports = { authInit, authCheck, resignToken, forgot, reset}
