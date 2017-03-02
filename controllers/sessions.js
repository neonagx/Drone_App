'use strict'
const User      = require('../models/User')
const Session   = require('../models/Session')
const respond = require('../libs/response')

const getSession = (req, res) => {
  const session = req.query
  const query = Session.find({session: req.session}).exec()
  query
    .then(sessions => respond(res, null, {sessions}, 'Fetched sessions for user'))
    .catch(err => respond(res, err, null, 'Error in retrieving sessions for user'))
}

const createSession = (req, res) => {
  const param = req.body
  console.log(param)
  const session = new Session(param)
  session.save()
    .then(session => {
      respond(res, null, { session }, 'Session has been created')
      const data = { session, user: req.currentUser }
    })
    .catch(err => respond(res, err, null, 'Error in creating session'))
}

const updateSession = (req, res) => {
  const session = req.params.id
  const updates = req.body.updates
  console.log('this is session id', session)
  console.log('this is updates in session')
    const query = Session.findByIdAndUpdate(session, updates, {new: true}).exec()
    query
      .then((session) => {
        const data = { session }
        respond(res, null, data, 'Session successfully updated')
      })
      .catch(err => respond(res, err, null, 'Error in updating booking' ))
}

const deleteSession = (req, res) => {
  const query = Session.findOneAndRemove({_id: req.query._id}).exec()
  query
    .then(session => respond(res, null, { session }, 'Session deleted'))
    .catch(err => respond(res, err, null, 'Error in deleting session'))
}

module.exports = {getSession, createSession, updateSession, deleteSession}
